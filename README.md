![Build](https://github.com/okawaffles/lily-dmdata/actions/workflows/build.yml/badge.svg)
# Lily-DMData
LilyDMData is an easy way for english-speaking developers (or anyone, really!) to interface with the [DMData](https://dmdata.jp) API.
**This library currently only supports earthquake-based connections.**

This is EXTREMELY early development! It is NOT ready for reliable use!s

Install with `npm i lily-dmdata`

## Examples

```ts
import { DMDataWebSocket, WebSocketEvent, Classification, EarthquakeInformationSchema } from 'lily-dmdata';

// Create a new socket
const SOCKET = new DMDataWebSocket('<your API key here>', 'application-name');

// Register some event listeners
SOCKET.on(WebSocketEvent.START, () => {
    console.log(`Websocket opened! The socket ID is ${SOCKET.socket_id}`);
});

SOCKET.on(WebSocketEvent.EARTHQUAKE_REPORT, (data: EarthquakeInformationSchema) => {
    console.log(`A new earthquake has been reported! It's maximum intensity was ${data.maxInt}.`);
});

// Open the socket and start listening.
// lily-dmdata will handle ping-pong requests automatically.
SOCKET.OpenSocket({
    classifications: [
        Classification.EEW_FORECAST,
        Classification.EEW_WARNING,
        Classification.TELEGRAM_EARTHQUAKE
    ]
});
```