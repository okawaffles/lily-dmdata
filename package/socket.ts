import { Logger } from 'okayulogger';
import { EventEmitter } from 'events';
import { Classification, DataMessage, DataTypeCode, EEW_TYPE, SchemaType, StartData, WebSocketEvent, WebSocketRegion, WSTicket } from './types';
import { WebSocket } from 'ws';
import { DecompressData } from './decompressor';
import { EarthquakeInformationSchemaBody, EEWInformationSchemaBody } from './schema';

export class DMDataWebSocket {
    public ApplicationName: string;
    public is_active = false;
    public socket_id = -1;

    private API_KEY_HEADER: string;
    private SOCKET!: WebSocket;
    private debug: boolean;
    private logger: Logger;
    private emitter = new EventEmitter();

    /**
     * A Project DM-D.S.S WebSocket handler/wrapper
     * @param api_key Your Project DM-D.S.S API key
     * @param application_name The application name you would like to use
     * @param debug Whether debug information should be logged.
     */
    constructor(api_key: string, application_name: string = 'dmdata-application', debug: boolean = false) {
        this.API_KEY_HEADER = `Basic ${btoa(api_key)}`;
        this.ApplicationName = application_name;
        this.debug = debug;
        this.logger = new Logger(`dmdata (${application_name})`);
    }

    private async fetchTicket(classifications: Array<Classification>, data_types: Array<DataTypeCode>, include_tests: boolean): Promise<WSTicket | undefined> {
        if (this.API_KEY_HEADER == `Basic dW5kZWZpbmVk`) return this.logger.fatal('You have passed an undefined API Key. Please double-check your code/env variables.') as undefined;

        const result = await fetch('https://api.dmdata.jp/v2/socket', {
            method: 'POST',
            headers: {
                'Authorization': this.API_KEY_HEADER
            },
            body: JSON.stringify({
                classifications,
                types: data_types.length==0?undefined:data_types,
                appName: this.ApplicationName,
                test: include_tests ? 'including' : 'no',
                formatMode: 'json'
            })
        });

        const result_data: WSTicket = await result.json();

        if (result_data.status != 'ok') {
            this.logger.fatal(`(fetchTicket) failed to get websocket ticket: error ${result_data.error.code}: ${result_data.error.message}`);
            return;
        }

        return result_data;
    }

    private handlePing(identifier: string) {
        this.SOCKET.send(JSON.stringify({
            type: 'pong',
            pingId: identifier
        }));
        this.emit(WebSocketEvent.PING, identifier);
    }

    private handleMessage(message: string) {
        if (this.debug) this.logger.debug('new message: ' + message);
        
        const data = JSON.parse(message);
        if (data.type == 'ping') return this.handlePing(data.pingId);
        if (data.type == 'start') return this.handleStart(data);
        if (data.type == 'data') return this.handleData(data);
    }

    private handleStart(data: StartData) {
        this.is_active = true;
        if (this.debug) this.logger.debug('websocket opened successfully!');
        
        this.socket_id = data.socketId;

        this.emit(WebSocketEvent.START);
    }

    private handleData(data: DataMessage) {
        // must decode body first
        const decoded_body = DecompressData(data.body);

        this.logger.debug('body decompressed to -> ' + JSON.stringify(decoded_body));

        // final report of an earthquake (jquake says the line)
        if (decoded_body._schema.type == SchemaType.EARTHQUAKE_INFORMATION) 
            this.emitter.emit(WebSocketEvent.EARTHQUAKE_REPORT, decoded_body.body as EarthquakeInformationSchemaBody);

        // eew-information is issued, can be either warning or forecast
        if (decoded_body._schema.type == SchemaType.EEW_INFORMATION) {
            const eew_body = decoded_body.body;
            eew_body.eventId = decoded_body.eventId; // pass the event id along as well for tracking
            // must determine whether it's a forecast or warning to emit the proper event
            if (decoded_body.type == EEW_TYPE.FORECAST) this.emitter.emit(WebSocketEvent.EEW_FORECAST, eew_body);
            if (decoded_body.type == EEW_TYPE.WARNING) this.emitter.emit(WebSocketEvent.EEW_WARNING, eew_body); // decoded_body IS NOT WORKING AND I DONT KNOW WHY!!!!
        }
    }

    // -- emitter -- //

    on(event_name: WebSocketEvent, listener: (...args: any[]) => void): void {
        this.emitter.on(event_name, listener);
    }

    off(event_name: WebSocketEvent, listener: (...args: any[]) => void): void {
        this.emitter.off(event_name, listener);
    }

    emit(event_name: WebSocketEvent, ...args: any[]): void {
        if (this.debug) this.logger.debug(`firing event ${event_name}`);
        this.emitter.emit(event_name, ...args);
    }


    // -- public methods -- //

    /**
     * Open the WebSocket and listen. Pings will automatically be handled by the class.
     * @param options classifications, data_types (optional), and region (optional) to supply. also can supply whether tests should be included.
     */
    public async OpenSocket(options: {
        classifications: Array<Classification>,
        data_types?: Array<DataTypeCode>,
        include_tests?: boolean,
        region?: WebSocketRegion
    }) {
        const ticket = await this.fetchTicket(options.classifications, options.data_types || [], options.include_tests || false);
        if (ticket == undefined) return this.logger.error('Unable to open the websocket due to an invalid or missing ticket.');

        if (this.debug) this.logger.debug(`connecting websocket to 'wss://${options.region || WebSocketRegion.AUTOMATIC}.api.dmdata.jp/v2/websocket?ticket=${ticket?.ticket.substring(0,6)}###' ...`);

        this.SOCKET = new WebSocket(`wss://${options.region || WebSocketRegion.AUTOMATIC}.api.dmdata.jp/v2/websocket?ticket=${ticket?.ticket}`);

        this.SOCKET.on('message', (msg) => this.handleMessage(msg.toString()));
        this.SOCKET.on('close', () => { 
            if (!this.is_active) return;
            this.emitter.emit(WebSocketEvent.CLOSED);
            this.is_active = false; 
        });

        this.emit(WebSocketEvent.OPENED);
    }

    public async CloseSocket() {
        if (!this.is_active) return this.logger.warn('CloseSocket() was called, but no socket is currently active.');

        this.SOCKET.close();
    }

    /**
     * Manually send a message to the internal message handler. Useful for testing purposes.
     * @param message The message to be passed to the handler
     */
    public EmulateMessageInternally(message: string) {
        if (this.debug) this.logger.debug('emulating a message by passing directly to handleMessage()');
        this.handleMessage(message);
    }
}