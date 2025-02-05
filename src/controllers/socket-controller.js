const userSocketMap = {};
const message_service = require("../services/messages-service");

const psqlService = require("../services/psql-service");
const { client, psqlConnection } = require("../config/psqlconnection");

const create_msg = async (msg) => {
  psqlConnection();
  let { sender_id, receiver_id, message, message_type } = msg;

  let result = await client.query(
    `INSERT INTO messages (sender_id, receiver_id, message, message_type)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [sender_id, receiver_id, message, message_type]
  );

  return result.rows[0];
};

const socketController = (socket, io) => {
  socket.on("user_connected", (msg) => {
    // userSocketMap[msg.id] = socket.id;
    console.log(`User with ID: ${msg} is mapped to Socket ID: ${socket.id}`);
  });

  socket.on("user_typing", (msg) => {
    socket.emit("liten", msg);
  });
  socket.on("join_conservation", async (data) => {
    const { user_id } = data;

    socket.join(user_id);
    let listConversation = await psqlService.getMsgByUserId(user_id);
    io.to(user_id).emit("list_conversation", listConversation);
  });
  
  socket.on("send_message", async (data) => {
    let { message, sender, conversationId } = data;

    let newMess = await message_service.createdNewMessage({
      message,
      sender,
      conversationId,
    });
   
  });
  socket.on("send_msg",async (data)=>{
    const {sender_id, receiver_id, message, message_type}=data
    console.log(data,'data')
    let newMess =await psqlService.createMsg(sender_id, receiver_id, message, message_type)
    let detail_msg = await psqlService.getDetailMsg(sender_id, receiver_id);
    io.to(sender_id).emit("detail_message", detail_msg);
    io.to(receiver_id).emit("detail_message", detail_msg);

    io.to(sender_id).emit("new_mess", newMess);


  })

  socket.on("get_detail_message", async (data) => {
    const { sender_id, receiver_id } = data;
    let detail_msg = await psqlService.getDetailMsg(sender_id, receiver_id);
    io.to(sender_id).emit("detail_message", detail_msg);
  });
};

module.exports = socketController;
