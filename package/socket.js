"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMDataWebSocket = void 0;
const okayulogger_1 = require("okayulogger");
const events_1 = require("events");
const types_1 = require("./types");
const ws_1 = require("ws");
class DMDataWebSocket {
    /**
     * A Project DM-D.S.S WebSocket handler/wrapper
     * @param api_key Your Project DM-D.S.S API key
     * @param application_name The application name you would like to use
     * @param debug Whether debug information should be logged.
     */
    constructor(api_key, application_name = 'dmdata-application', debug = false) {
        this.is_active = false;
        this.socket_id = -1;
        // -- emitter -- //
        this.emitter = new events_1.EventEmitter();
        this.API_KEY_HEADER = `Basic ${btoa(api_key)}`;
        this.ApplicationName = application_name;
        this.debug = debug;
        this.logger = new okayulogger_1.Logger(`dmdata (${application_name})`);
    }
    fetchTicket(classifications, data_types, include_tests) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch('https://api.dmdata.jp/v2/socket', {
                method: 'POST',
                headers: {
                    'Authorization': this.API_KEY_HEADER
                },
                body: JSON.stringify({
                    classifications,
                    types: data_types.length == 0 ? undefined : data_types,
                    appName: this.ApplicationName,
                    test: include_tests ? 'including' : 'no',
                    formatMode: 'json'
                })
            });
            const result_data = yield result.json();
            if (result_data.status != 'ok') {
                if (this.debug)
                    this.logger.debug(`(fetchTicket) failed to get websocket ticket: error ${result_data.error.code}: ${result_data.error.message}`);
                return;
            }
            return result_data;
        });
    }
    handlePing(identifier) {
        this.SOCKET.send(JSON.stringify({
            type: 'pong',
            pingId: identifier
        }));
        this.emit(types_1.WebSocketEvent.PING, identifier);
    }
    handleMessage(message) {
        if (this.debug)
            this.logger.debug('new message: ' + message);
        const data = JSON.parse(message);
        if (data.type == 'ping')
            return this.handlePing(data.pingId);
        if (data.type == 'start')
            return this.handleStart(data);
    }
    handleStart(data) {
        this.is_active = true;
        if (this.debug)
            this.logger.debug('websocket opened successfully!');
        this.socket_id = data.socketId;
        this.emit(types_1.WebSocketEvent.START);
    }
    on(event_name, listener) {
        this.emitter.on(event_name, listener);
    }
    off(event_name, listener) {
        this.emitter.off(event_name, listener);
    }
    emit(event_name, ...args) {
        if (this.debug)
            this.logger.debug(`firing event ${event_name}`);
        this.emitter.emit(event_name, ...args);
    }
    // -- public methods -- //
    /**
     * Open the WebSocket and listen. Pings will automatically be handled by the class.
     * @param options classifications, data_types (optional), and region (optional) to supply. also can supply whether tests should be included.
     */
    OpenSocket(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.fetchTicket(options.classifications, options.data_types || [], options.include_tests || false);
            if (this.debug)
                this.logger.debug(`connecting websocket to 'wss://${options.region || types_1.WebSocketRegion.AUTOMATIC}.api.dmdata.jp/v2/websocket?ticket=${ticket === null || ticket === void 0 ? void 0 : ticket.ticket.substring(0, 6)}###' ...`);
            this.SOCKET = new ws_1.WebSocket(`wss://${options.region || types_1.WebSocketRegion.AUTOMATIC}.api.dmdata.jp/v2/websocket?ticket=${ticket === null || ticket === void 0 ? void 0 : ticket.ticket}`);
            this.SOCKET.on('message', (msg) => this.handleMessage(msg.toString()));
            this.emit(types_1.WebSocketEvent.OPENED);
        });
    }
}
exports.DMDataWebSocket = DMDataWebSocket;
