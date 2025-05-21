import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: Buffer) => {
        const text = message.toString();
        console.log('Received:', text);
        ws.send(`Echo: ${text}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');