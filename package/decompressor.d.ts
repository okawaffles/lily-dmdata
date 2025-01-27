import { SchemaType } from "./types";
/**
 * Decompress and decode the body of the telegram info, generally in gzip and base64.
 * @param data_in_base64 the body (which is generally in base64) of the telegram info
 * @returns the decoded body, generally in XML or JSON
 */
export declare function DecompressData(data_in_base64: string): {
    _schema: {
        type: SchemaType;
        version: string;
    };
    [key: string]: any;
};
