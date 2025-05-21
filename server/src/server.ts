import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const players: string[] = [];

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: Buffer) => {
        const playerName = message.toString();
        players.push(playerName);
        console.log(players)
        ws.send(players.join());

    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');