"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var rxjs_1 = require("rxjs");
var ws = new ws_1.WebSocket('ws://localhost:8080');
var initial = {
    name: "none",
    age: 0,
    index: 0,
};
var stuffHappened$ = new rxjs_1.BehaviorSubject(initial);
ws.on('open', function () {
    console.log("Connected to server");
    // Send a JSON message
    var message = { name: "Alice", message: "Hello Server!" };
    ws.send(JSON.stringify(message));
});
ws.on('message', function (data) {
    var messageJSON = JSON.parse(data.toString());
    console.log("Received from server:", messageJSON);
    stuffHappened$.next(messageJSON);
});
ws.on('close', function () {
    console.log("Disconnected from server");
});
ws.on('error', function (error) {
    console.log(" websocket raised error ".concat(error));
});
// Example: React to updates in BehaviorSubject
stuffHappened$.subscribe(function (data) {
    console.log("Current state from stuffHappened:", data);
    console.log(stuffHappened$.getValue());
});
