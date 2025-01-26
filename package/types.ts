export enum Classification {
    TELEGRAM_WEATHER = 'telegram.weather',
    TELEGRAM_EARTHQUAKE = 'telegram.earthquake',
    EEW_WARNING = 'eew.warning',
    EEW_FORECAST = 'eew.forecast',
}

/**
 * Data Type Codes (supplied in a WSTicket).
 * EEW_FORECAST is deprecated, use `DataTypeCode.EEW_EARLY_MOTION_FORECAST` instead.
 */
export enum DataTypeCode {
    EEW_FORECAST = 'VXSE44',
    EEW_EARLY_MOTION_FORECAST = 'VXSE45', // Early Earthquake Warning (early motion forecast)
    EEW_TEST = 'VXSE42',
    EEW_WARNING = 'VXSE43',
    REAL_TIME_SEISMIC_INTENSITY = 'VXSE47',
    EARTHQUAKE_INTENSITY_REPORT = 'VXSE51',
    EARTHQUAKE_INFORMATION_EPICENTER = 'VXSE52',
    EARTHQUAKE_INFORMATION_EPICENTER_INTENSITY = 'VXSE53',
    EARTHQUAKE_INFORMATION_ACTIVITY = 'VXSE56',
    EARTHQUAKE_INFORMATION_COUNT = 'VXSE60',
    EARTHQUAKE_INFORMATION_NOTABLE_UPDATES = 'VXSE61',
    EARTHQUAKE_LONG_MOTION_OBSERVATION = 'VXSE62',
    EARTHQUAKE_DATA_INTENSITY_DISTRIBUTION = 'IXAC41',
    NANKAI_TROUGH_EMERGENCY = 'VYSE50',
    NANKAI_TROUGH_EXPLANATORY_NO_PERIODIC = 'VYSE51',
    NANKAI_TROUGH_EXPLANATORY_REGULAR = 'VYSE52',
    HOKKAIDO_SANRIKU_OFFSHORE_EARTHQUAKE_WARNING = 'VYSE60',
    TSUNAMI_ALERTS = 'VTSE41',
    TSUNAMI_INFORMATION = 'VTSE51',
    TSUNAMI_INFORMATION_OFFSHORE = 'VTSE52',
    TSUNAMI_INTERNATIONAL_DOMESTIC = 'WEPA60',
    EARTHQUAKE_AND_TSUNAMI_INFORMATION = 'VZSE40',
}

/**
 * All the events that the DMDataWebSocket can emit
 */
export enum WebSocketEvent {
    OPENED = 'open',
    CLOSED = 'close',
    START = 'start',
    PING = 'ping',
    EARTHQUAKE_REPORT = 'earthquake_report',
    EEW_FORECAST = 'earthquake_forecast',
    EEW_WARNING = 'earthquake_warning',
    EEW_CANCEL = 'earthquake_cancel'
}

/**
 * A ticket generated to log into the websocket
 */
export interface WSTicket {
    responseId: string,
    responseTime: string,
    status: 'ok' | 'error',
    ticket: string,
    websocket: {
        id: number,
        url: string,
        protocol: Array<string>,
        expiration: 300
    },
    classifications: Array<Classification>,
    test: 'no' | 'including',
    types: Array<DataTypeCode>,
    formats: Array<'xml' | 'a/n' | 'binary'>,
    appName: string,
    error: {
        message: string,
        code: number
    }
}


export interface StartData {
    type: 'start',
    socketId: number,
    classifications: Array<Classification>,
    types: Array<DataTypeCode>,
    test: 'no' | 'include',
    formats: Array<'xml' | 'a/n' | 'binary'>,
    appName: string,
    time: string
}


/**
 * API Regions prefixes for the WebSocket. \<region\>.api.dmdata.jp/v2/websocket
 */
export enum WebSocketRegion {
    ANY = 'ws',
    AUTOMATIC = 'ws',
    TOKYO_AND_OSAKA = 'ws',

    TOKYO = 'ws-tokyo',
    TOKYO_AWS_001 = 'ws001',
    TOKYO_AWS_002 = 'ws002',

    OSAKA = 'ws-osaka',
    OSAKA_AWS_003 = 'ws003',
    OSAKA_AWS_004 = 'ws004'
}

export interface DataMessage {
    "type":'data',
    "version":string,
    "id":string,
    "originalId":string,
    "classification":Classification,
    "passing":Array<{name:string,time:string}>,
    "head":{
        "type":DataTypeCode,
        "author":string,
        "time":string,
        "designation":unknown,
        "test":boolean
    },
    "xmlReport":{
        "control":{
            "title":string,
            "dateTime":string,
            "status":string,
            "editorialOffice":string,
            "publishingOffice":string
        },
        "head":{
            "title":string,
            "reportDateTime":string,
            "targetDateTime":string,
            "eventId":string,
            "serial":string,
            "infoType":string,
            "infoKind":string,
            "infoKindVersion":string,
            "headline":string
        }
    },
    "format":'json',
    "schema":{
        "type":string,
        "version":string
    },
    "compression": 'gzip',
    "encoding": 'base64',
    "body": string
}