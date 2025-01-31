"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaType = exports.ShindoValue = exports.WebSocketRegion = exports.WebSocketEvent = exports.DataTypeCode = exports.Classification = void 0;
var Classification;
(function (Classification) {
    Classification["TELEGRAM_WEATHER"] = "telegram.weather";
    Classification["TELEGRAM_EARTHQUAKE"] = "telegram.earthquake";
    Classification["EEW_WARNING"] = "eew.warning";
    Classification["EEW_FORECAST"] = "eew.forecast";
})(Classification || (exports.Classification = Classification = {}));
/**
 * Data Type Codes (supplied in a WSTicket).
 * EEW_FORECAST is deprecated, use `DataTypeCode.EEW_EARLY_MOTION_FORECAST` instead.
 */
var DataTypeCode;
(function (DataTypeCode) {
    DataTypeCode["EEW_FORECAST"] = "VXSE44";
    DataTypeCode["EEW_EARLY_MOTION_FORECAST"] = "VXSE45";
    DataTypeCode["EEW_TEST"] = "VXSE42";
    DataTypeCode["EEW_WARNING"] = "VXSE43";
    DataTypeCode["REAL_TIME_SEISMIC_INTENSITY"] = "VXSE47";
    DataTypeCode["EARTHQUAKE_INTENSITY_REPORT"] = "VXSE51";
    DataTypeCode["EARTHQUAKE_INFORMATION_EPICENTER"] = "VXSE52";
    DataTypeCode["EARTHQUAKE_INFORMATION_EPICENTER_INTENSITY"] = "VXSE53";
    DataTypeCode["EARTHQUAKE_INFORMATION_ACTIVITY"] = "VXSE56";
    DataTypeCode["EARTHQUAKE_INFORMATION_COUNT"] = "VXSE60";
    DataTypeCode["EARTHQUAKE_INFORMATION_NOTABLE_UPDATES"] = "VXSE61";
    DataTypeCode["EARTHQUAKE_LONG_MOTION_OBSERVATION"] = "VXSE62";
    DataTypeCode["EARTHQUAKE_DATA_INTENSITY_DISTRIBUTION"] = "IXAC41";
    DataTypeCode["NANKAI_TROUGH_EMERGENCY"] = "VYSE50";
    DataTypeCode["NANKAI_TROUGH_EXPLANATORY_NO_PERIODIC"] = "VYSE51";
    DataTypeCode["NANKAI_TROUGH_EXPLANATORY_REGULAR"] = "VYSE52";
    DataTypeCode["HOKKAIDO_SANRIKU_OFFSHORE_EARTHQUAKE_WARNING"] = "VYSE60";
    DataTypeCode["TSUNAMI_ALERTS"] = "VTSE41";
    DataTypeCode["TSUNAMI_INFORMATION"] = "VTSE51";
    DataTypeCode["TSUNAMI_INFORMATION_OFFSHORE"] = "VTSE52";
    DataTypeCode["TSUNAMI_INTERNATIONAL_DOMESTIC"] = "WEPA60";
    DataTypeCode["EARTHQUAKE_AND_TSUNAMI_INFORMATION"] = "VZSE40";
})(DataTypeCode || (exports.DataTypeCode = DataTypeCode = {}));
/**
 * All the events that the DMDataWebSocket can emit
 */
var WebSocketEvent;
(function (WebSocketEvent) {
    WebSocketEvent["OPENED"] = "open";
    WebSocketEvent["CLOSED"] = "close";
    WebSocketEvent["START"] = "start";
    WebSocketEvent["PING"] = "ping";
    WebSocketEvent["EARTHQUAKE_REPORT"] = "earthquake_report";
    WebSocketEvent["EEW_FORECAST"] = "earthquake_forecast";
    WebSocketEvent["EEW_WARNING"] = "earthquake_warning";
    WebSocketEvent["EEW_CANCEL"] = "earthquake_cancel";
})(WebSocketEvent || (exports.WebSocketEvent = WebSocketEvent = {}));
/**
 * API Regions prefixes for the WebSocket. \<region\>.api.dmdata.jp/v2/websocket
 */
var WebSocketRegion;
(function (WebSocketRegion) {
    WebSocketRegion["ANY"] = "ws";
    WebSocketRegion["AUTOMATIC"] = "ws";
    WebSocketRegion["TOKYO_AND_OSAKA"] = "ws";
    WebSocketRegion["TOKYO"] = "ws-tokyo";
    WebSocketRegion["TOKYO_AWS_001"] = "ws001";
    WebSocketRegion["TOKYO_AWS_002"] = "ws002";
    WebSocketRegion["OSAKA"] = "ws-osaka";
    WebSocketRegion["OSAKA_AWS_003"] = "ws003";
    WebSocketRegion["OSAKA_AWS_004"] = "ws004";
})(WebSocketRegion || (exports.WebSocketRegion = WebSocketRegion = {}));
var ShindoValue;
(function (ShindoValue) {
    ShindoValue["ZERO"] = "0";
    ShindoValue["ONE"] = "1";
    ShindoValue["TWO"] = "2";
    ShindoValue["THREE"] = "3";
    ShindoValue["FOUR"] = "4";
    ShindoValue["FIVE_LOWER"] = "5-";
    ShindoValue["FIVE_UPPER"] = "5+";
    ShindoValue["SIX_LOWER"] = "6-";
    ShindoValue["SIX_UPPER"] = "6+";
    ShindoValue["SEVEN"] = "7";
})(ShindoValue || (exports.ShindoValue = ShindoValue = {}));
var SchemaType;
(function (SchemaType) {
    SchemaType["EARTHQUAKE_INFORMATION"] = "earthquake-information";
})(SchemaType || (exports.SchemaType = SchemaType = {}));
