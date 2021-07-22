const app = require('express')();
// setting up server for websockets
const options = {
    cors : {
      origin :   ["http://localhost:7000"],
    }
 };

const httpServer = require("http").createServer(app);
const {Server} = require("socket.io"); 
const io = new Server(httpServer, options);

// server-side

const rooms=io.of("/room");
rooms.on("connection", (socket) => {
    // socket.emit("hello", "world");
    console.log("New Connection", "S-ID : ", socket.id);
});




httpServer.listen(3000, ()=>{
    console.log("Chat Server Live!")
});