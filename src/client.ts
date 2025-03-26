import { WebSocket } from "ws";
import { BehaviorSubject } from "rxjs";

const ws = new WebSocket('ws://localhost:8080');

interface IstoreStuff{
    name : string
    age : number
    index : number
}

let initial : IstoreStuff = {
    name : "none",
    age : 0,
    index : 0,
}

const stuffHappened$ = new BehaviorSubject <IstoreStuff> (initial)

ws.on('open', () => {
    console.log("Connected to server");

    // Send a JSON message
    const message = { name: "Alice", message: "Hello Server!" };
    ws.send(JSON.stringify(message));
});

ws.on('message', (data) => {
    let messageJSON = JSON.parse(data.toString())
    console.log("Received from server:", messageJSON);
    stuffHappened$.next(messageJSON);  
});

ws.on('close', () => {
    console.log("Disconnected from server");
});

ws.on('error', (error) => {
    console.log(` websocket raised error ${error}`);
});


// Example: React to updates in BehaviorSubject
stuffHappened$.subscribe((data) => {
    console.log("Current state from stuffHappened:", data);
    console.log(stuffHappened$.getValue());
  });