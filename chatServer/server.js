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
const socketRoom =  {};
const socketUser =  {};

// server-side


const room = io.of('/room');

room.on("connection", (socket) => {
  
  console.log("New Connection", "S-ID : ", socket.id);

  socket.on('disconnect', ()=>{
    socket.broadcast.to(socketRoom[socket.id]).emit("user-left", `${socketUser[socket.id]} left!`);
    delete socketRoom[socket.id];
    delete socketUser[socket.id];
    console.log("User Disconnected", "S-ID : ", socket.id, " ");
  })

  socket.on('user-joined', (data) =>{
    socketRoom[socket.id] = data.roomName;
    socketUser[socket.id] = data.user;
    socket.join(data.roomName);
    socket.broadcast.to(data.roomName).emit("user-joined", `${data.user} joined!`);
  })

  socket.on("new-message", (msg)=>{
    socket.broadcast.to(socketRoom[socket.id]).emit("new-message", {
      from : socketUser[socket.id],
      text : msg
    });
  })

});




httpServer.listen(3000, ()=>{
    console.log("Chat Server Live!")
});