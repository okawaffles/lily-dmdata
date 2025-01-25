import { Classification, DataTypeCode, WebSocketEvent, WebSocketRegion } from './types';
export declare class DMDataWebSocket {
    ApplicationName: string;
    is_active: boolean;
    socket_id: number;
    private API_KEY_HEADER;
    private SOCKET;
    private debug;
    private logger;
    constructor(api_key: string, application_name?: string, debug?: boolean);
    private fetchTicket;
    private handlePing;
    private handleMessage;
    private handleStart;
    private emitter;
    on(event_name: WebSocketEvent, listener: (...args: any[]) => void): void;
    off(event_name: WebSocketEvent, listener: (...args: any[]) => void): void;
    emit(event_name: WebSocketEvent, ...args: any[]): void;
    /**
     * Open the WebSocket and listen. Pings will automatically be handled by the class.
     * @param options classifications, data_types (optional), and region (optional) to supply. also can supply whether tests should be included.
     */
    OpenSocket(options: {
        classifications: Array<Classification>;
        data_types?: Array<DataTypeCode>;
        include_tests?: boolean;
        region?: WebSocketRegion;
    }): Promise<void>;
}
