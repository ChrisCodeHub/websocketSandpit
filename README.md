This sandpit aims to look at websockets in NodeJS/

Webscokets allow you to connect 2 servers and send message's bi-directionally
In true NodeStyle, it all gets callbacks so you can just hook the code up and it runs when stuff happens, no polling

Code is has server.ts  and client.ts

server.ts is the thing that is the source of the data
client.ts connects to the server and sends / receives messages
Since its typescript... messages are JSON since that is quite typical


to setup the project

`cd ./websockets`
`npm init -y`
`npm install typescript @types/node --save-dev`
`npm install --save-dev typescript @types/node @types/ws`
`npx tsc --init`
# `npm install ws`  install websockets

`tsc ./src/server.ts`
`tsc ./src/client.ts`

# open 2 windows
`node ./src/server.js`    in window 1
`node ./src/client.js`    in window 2
