import { WebSocket, WebSocketServer } from "ws";


interface IMessage {
    name : string
    age : number
    index : number
}
interface ImyComms {
    myWss : WebSocketServer    
    ws : any
    isConnected : boolean
    errorCount : number
}

// let myComms : ImyComms = {
//     myWss : new WebSocketServer({ port: 8080 }),    
//     ws : null,
//     isConnected : false,
//     errorCount : 0,
// }

class commsWebSocketServer implements ImyComms{

    myWss : WebSocketServer
    ws : WebSocket
    isConnected : boolean
    errorCount : number

    constructor( portToUse : number){
        this.myWss = new WebSocketServer({ port: portToUse });
        this.isConnected = false
        this.errorCount = 0
        console.log(`WebSocket server started on ws://localhost:${portToUse}`);
        this.myWss.on('connection', (ws : WebSocket) => {
            this.isConnected = true;            
            this.ws  = ws
            console.log("Client connected");
        
        this.ws.on('close', () => {
                this.isConnected = false;
                console.log("Client disconnected");            
            });
    
        this.ws.on('error', (error : any) => {
                this.isConnected = false;
                console.log(` web socket went into ERROR ${error}`);    
            })      
        }); 
    }

    sendMessage(message : IMessage) : void
    {
        if (this.isConnected == true) {
            this.ws.send(JSON.stringify(message));        
        }
        else {
            console.log(" web socket not connected cannot send messages ")
        }
    }

    sendInitialMessage() : void
    {
        const initialMessage = { type: "welcome", message: "Welcome to the WebSocket server!" }
        if (this.isConnected == true) {
            this.ws.send(JSON.stringify(initialMessage));
        }
        else {
            console.log(" web socket not connected cannot send messages ")
        }
    }
}


// console.log("WebSocket server started on ws://localhost:8080");

// myComms.myWss.on('connection', (ws : WebSocket) => {
//     myComms.isConnected = true;
//     console.log("Client connected");
//     myComms.ws  = ws
    
//     // Send a welcome message to the client in JSON format
//     if (myComms.isConnected == true) {
//         myComms.ws.send(JSON.stringify({ type: "welcome", message: "Welcome to the WebSocket server!" }));
//     }

//     myComms.ws.on('message', (message : any) => {
//         try {
//             const data = JSON.parse(message.toString());
//             console.log("Received:", data);

//             // Send a response back
//             myComms.ws.send(JSON.stringify({ reply: `Hello, ${data.name}!` }));
//         }
//         catch (error){
//             myComms.ws.send(JSON.stringify({ reply: `server did not like your message` }));
//         }
//     });

//     myComms.ws.on('close', () => {
//         myComms.isConnected = false;
//         console.log("Client disconnected");
        
//     });

//     myComms.ws.on('error', (error : any) => {
//         myComms.isConnected = false;
//         console.log(` web socket went into ERROR ${error}`);
        
//     }); 
// })



async function main(){

    let messageTemplate : IMessage = {
        "name" : "billy",
        "age"  : 51,
        "index" : 1,
    }

    let talk : commsWebSocketServer = new commsWebSocketServer(8080);
    talk.sendInitialMessage();

    let loopForever = () =>{
        setTimeout( ()=>{ 
            console.log(` sending next message to the client`);
            messageTemplate.index++;
            talk.sendMessage(messageTemplate);
            loopForever();
        }, 1000)
    }

    loopForever();
    
}

main()


