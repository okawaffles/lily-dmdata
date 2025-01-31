"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decompressor_1 = require("../decompressor");
const data = { "type": "data", "version": "2.0", "id": "44a7b424f0512f53edd94b66c4f5bedee8a490dae1d8cbdf154bc3d14609062b4c69f3d833dde73c7a95c752399e6d5d", "originalId": "7bae091f882328dd8064f29e62d444402f779a46e4dc06c8f964a52da61e4d04bc53f1317a777256b9ba1a02fe6e46ac", "classification": "eew.forecast", "passing": [{ "name": "socket-03", "time": "2025-01-25T23:12:12.976Z" }, { "name": "ires-13", "time": "2025-01-25T23:12:12.978Z" }, { "name": "json-03", "time": "2025-01-25T23:12:12.982Z" }, { "name": "ires-13", "time": "2025-01-25T23:12:12.984Z" }, { "name": "websocket-02", "time": "2025-01-25T23:12:13.002Z" }], "head": { "type": "VXSE44", "author": "JPOS", "time": "2025-01-25T23:12:00.000Z", "designation": null, "test": false }, "xmlReport": { "control": { "title": "緊急地震速報（予報）", "dateTime": "2025-01-25T23:12:12Z", "status": "通常", "editorialOffice": "大阪管区気象台", "publishingOffice": "気象庁" }, "head": { "title": "緊急地震速報（予報）", "reportDateTime": "2025-01-26T08:12:12+09:00", "targetDateTime": "2025-01-26T08:12:12+09:00", "eventId": "20250126081132", "serial": "4", "infoType": "発表", "infoKind": "緊急地震速報", "infoKindVersion": "1.0_0", "headline": null } }, "format": "json", "schema": { "type": "eew-information", "version": "1.0.0" }, "compression": "gzip", "encoding": "base64", "body": "H4sIAAAAAAAAAI1UzW7bRhB+F15rC8slRZG6OjkYqWOgMVqgRWCMdofkJtRSXS5dG4EAO0LbpA3QU5HYcH8MxEiQpoXdHmK4eYM8hiI5OvUVurtWYrZwgAg6LGa+b36+meEdb71UIhMSimXudb1OD5AkfhrHNKAx5zGJwpQmGFEemh+haaeTQBhhyBmJWJwmUQhtyiHyjYmEPdYOUj/wO9DpdGg76iU98MHQ0FAiYN6Ct16xHPvgde94emuAJiniV4tCpqXqgxalNJgNVJV9dT2/RVrEGy68xZ69+G66fTjZP5rtfzvb/mXy6/E/L++9Pr3nHvcNVQtdfBCw0qDryiBn23uTkxNjsTWszdPsnr45eGpsyIU2CkGxmqaCWdfk8ZPZo2dnfxxMHpxOjx6+OT6Y/HBkkIO6V4gqFzJ7C/3Cm/tPd7ybBqCwqq6AxjXRt4Eooe1F4i/S9hoNuj41/89NHIWDUunLcNEaic9xH5GkS4jtFlSGHwrGDZTajdmiiE8jEvt+QK0YaHu8XhpfOFfimpD8Uh0b/k+bc1q3OXIEXghpSpF1USx4vZJv2VGL6mOo9LLheV2tajQxqiWQDAs0WVIoKmf6DJQ0Cr6zICidf1nDbbRBzlf18k79Lo3fdQpKiQ0o3ocMLjTJtwYlM7KgsglYyS0hDK0mEhx79tPu5M+Ds/0Hr09+n43sTrCyVNycjHZFFWZpdc3dW+OmNpQgbCWv9q7bRYaixrmFELfIRSmz/xP8IG7RV3tXGwxnmlNyFFmuGxcz++3ReOdHg66lsPx+g7gYkDktQ9OOFuzGVqWxb1zTh4fT/efTk+dmnGd//W0xHAc6b0Sevjj+T+TbzdCBC6uQ1wwbciWUkkv0cs2C5KvqBoI9nG++nu3aOwPGagXM7QUOxLn8lb0Xu3uJvZV5Wc7Qh0w6wZagYHVx/o3oem2bsu73UK2mK++DDIcNfqPN8ejn8d2j8ej78WhnPDocj16OR/ebnbY6Fxqs3HJxhClTVkK7us3XCpnZ6BXYXJZuNKkqrcZ2c3TpHoYDgwFKLjYtoO+gSznIzKYgrrUL0ycIlat6LnJmerCi3BwOh/8CAHo/6acFAAA=" };
const decompressed_body = (0, decompressor_1.DecompressData)(data.body);
console.log(decompressed_body.body);
