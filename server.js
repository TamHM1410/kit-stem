require("dotenv").config();


const app = require("./src/app");



const PORT = process.env.PORT;




const httpServer = require('http').createServer(app)


const socketController=require('./src/controllers/socket-controller')
////socket
const io = require('socket.io')(httpServer, {
  cors: {
   origin: "*",
   method:['GET','POST']
},
});
io.on("connection",(socket)=>socketController(socket,io));



httpServer.listen(PORT, (req,res) => {
  console.log(`Server running on port ${PORT}`)
 
});