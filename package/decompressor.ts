import { gunzipSync } from "node:zlib";
import { SchemaType } from "./types";
import { DefaultComponent } from "./component";


interface DecompressionReturnType extends DefaultComponent {
    [key: string]: any
}

/**
 * Decompress and decode the body of the telegram info, generally in gzip and base64.
 * @param data_in_base64 the body (which is generally in base64) of the telegram info
 * @returns the decoded body, generally in XML or JSON
 */
export function DecompressData(data_in_base64: string): DecompressionReturnType {
    const decoded_buffer = Buffer.from(data_in_base64, 'base64');
    const unzipped = gunzipSync(decoded_buffer);
    return JSON.parse(unzipped.toString('utf-8'));
}