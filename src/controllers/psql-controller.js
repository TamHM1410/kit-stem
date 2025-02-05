const { client, psqlConnection } = require("../config/psqlconnection");
const asyncHandler = require("express-async-handler");

class PsqlController {
  static getListMsg = asyncHandler(async (req, res) => {
    psqlConnection();
    console.log('res.',req.body)
    let userId = req.body.userId;
    let result = await client.query(`select*from groups where host_id = $1`, [
      userId,
    ]);
    console.log("userid", userId, result);
    return res.json({
      msg: "success",
      statusCode: 200,
      result: result.rows,
    });
  });
  static createGroupChat = asyncHandler(async (req, res) => {
    let host_id = req.body.host_id;
    let name = req.body.name;
    let result = await client.query(
      `INSERT INTO groups (name,host_id)
VALUES ($1,$2)`,
      [host_id, name]
    );
    return res.json({
      msg: "success",
      statusCode: 200,
      result: result.rows,
    });
  });
  static createMsg = asyncHandler(async (req, res) => {
    psqlConnection();
    console.log(req.body, "log");

    let sender_id = req.body.sender_id;
    let receiver_id = req.body.receiver_id;
    let message = req.body.message;
    let message_type = req.body.message_type;
  
    let result = await client.query(
      `INSERT INTO messages (sender_id,receiver_id,message,message_type)
VALUES ($1,$2,$3,$4)`,
      [sender_id, receiver_id, message, message_type]
    );

    return res.json({
      msg: "success",
      result: result.rows,
    });
  });
  static getDetailMsg =asyncHandler(async(req,res)=>{
    psqlConnection();
    let sender_id=req.body.sender_id
    let receiver_id=req.body.receiver_id
    let result=await client.query(`SELECT m.id, m.message ,u.url_avatar ,u.username,u.id FROM messages m  
        JOIN users u ON (m.receiver_id = u.id OR m.sender_id = u.id) WHERE (m.sender_id = $1 AND m.receiver_id = $2) 
        OR (m.sender_id = $2 AND m.receiver_id = $1)
   ORDER BY m.created_at ASC `,[sender_id,receiver_id])

    return res.json({
        status:200,
        msg:'success',
        result:result.rows
    })
  })
  static getMsgByUserId = asyncHandler(
    asyncHandler(async (req, res) => {
      console.log('body c,liebnt')
      psqlConnection();

      let sender_id = req.body.user_id;


      let result = await client.query(
        `SELECT messages.receiver_id, messages.sender_id, 
                MAX(messages.message) AS message, 
                users.username, 
                users.url_avatar 
         FROM messages 
         JOIN users ON messages.receiver_id = users.id  or messages.sender_id=users.id
         WHERE receiver_id = $1 
         GROUP BY messages.receiver_id, messages.sender_id, users.username, users.url_avatar`,
        [sender_id]
      );
      

      if(result.rows&&Array.isArray(result.rows)){
        const uniqueData = result.rows.filter((item, index, self) =>
          index === self.findIndex((t) => t.username === item.username)
      );
      return  res.json({
        status: 200,        
        msg: "success",
        result: uniqueData,
      });

      }

      return res.json({
        status: 200,        
        msg: "success",
        result: result.rows,
      });
    })
  );
}

module.exports = PsqlController;
