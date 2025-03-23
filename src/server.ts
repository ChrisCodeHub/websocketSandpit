import { WebSocket, WebSocketServer } from "ws";

interface ImyComms {
    myWss : WebSocketServer    
    ws : any
    isConnected : boolean
    errorCount : number
}

let myComms : ImyComms = {
    myWss : new WebSocketServer({ port: 8080 }),    
    ws : null,
    isConnected : false,
    errorCount : 0,
}

console.log("WebSocket server started on ws://localhost:8080");

myComms.myWss.on('connection', (ws : WebSocket) => {
    myComms.isConnected = true;
    console.log("Client connected");
    myComms.ws  = ws
    
    // Send a welcome message to the client in JSON format
    if (myComms.isConnected == true) {
        myComms.ws.send(JSON.stringify({ type: "welcome", message: "Welcome to the WebSocket server!" }));
    }

    myComms.ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            console.log("Received:", data);

            // Send a response back
            myComms.ws.send(JSON.stringify({ reply: `Hello, ${data.name}!` }));
        }
        catch (error){
            myComms.ws.send(JSON.stringify({ reply: `server did not like your message` }));
        }
    });

    myComms.ws.on('close', () => {
        myComms.isConnected = false;
        console.log("Client disconnected");
        
    });

    myComms.ws.on('error', (error) => {
        myComms.isConnected = false;
        console.log(` web socket went into ERROR ${error}`);
        
    }); 
})

interface IMessage {
    name : string
    age : number
    index : number
}

async function main(){

    let messageTemplate : IMessage = {
        "name" : "billy",
        "age"  : 51,
        "index" : 1,
    }

    let loopForever = () =>{
        setTimeout( ()=>{ 
            console.log(` sending next message to the client`);
            messageTemplate.index++;
            if (myComms.isConnected == true) {
                myComms.ws.send(JSON.stringify(messageTemplate));
            }
            loopForever();
        }, 1000)
    }

    loopForever();
    
}

main()


