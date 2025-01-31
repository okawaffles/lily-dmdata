"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecompressData = void 0;
const node_zlib_1 = require("node:zlib");
/**
 * Decompress and decode the body of the telegram info, generally in gzip and base64.
 * @param data_in_base64 the body (which is generally in base64) of the telegram info
 * @returns the decoded body, generally in XML or JSON
 */
function DecompressData(data_in_base64) {
    const decoded_buffer = Buffer.from(data_in_base64, 'base64');
    const unzipped = (0, node_zlib_1.gunzipSync)(decoded_buffer);
    return JSON.parse(unzipped.toString('utf-8'));
}
exports.DecompressData = DecompressData;
