import { WebSocket } from "ws";

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log("Connected to server");

    // Send a JSON message
    const message = { name: "Alice", message: "Hello Server!" };
    ws.send(JSON.stringify(message));
});

ws.on('message', (data) => {
    console.log("Received from server:", JSON.parse(data.toString()));
});

ws.on('close', () => {
    console.log("Disconnected from server");
});

ws.on('error', (error) => {
    console.log(` websocket raised error ${error}`);
});