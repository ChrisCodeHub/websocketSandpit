"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var ws = new ws_1.WebSocket('ws://localhost:8080');
ws.on('open', function () {
    console.log("Connected to server");
    // Send a JSON message
    var message = { name: "Alice", message: "Hello Server!" };
    ws.send(JSON.stringify(message));
});
ws.on('message', function (data) {
    console.log("Received from server:", JSON.parse(data.toString()));
});
ws.on('close', function () {
    console.log("Disconnected from server");
});
ws.on('error', function (error) {
    console.log(" websocket raised error ".concat(error));
});
