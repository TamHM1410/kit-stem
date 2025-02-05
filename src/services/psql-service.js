const { client, psqlConnection } = require("../config/psqlconnection");
const asyncHandler = require("express-async-handler");

class PsqlService {
  static getMsgByUserId = asyncHandler(
    asyncHandler(async (user_id) => {
      psqlConnection();

      let sender_id = user_id;

      let result = await client.query(
        `SELECT messages.receiver_id, messages.sender_id, 
                    MAX(messages.message) AS message, 
                    users.username, 
                    users.url_avatar 
             FROM messages 
             JOIN users ON messages.receiver_id = users.id  or messages.sender_id=users.id
             WHERE receiver_id = $1  or sender_id=$1
             GROUP BY messages.receiver_id, messages.sender_id, users.username, users.url_avatar`,
        [sender_id]
      );
      if(result.rows&&Array.isArray(result.rows)){
        const uniqueData = result.rows.filter((item, index, self) =>
          index === self.findIndex((t) => t.username === item.username)
      );
      return uniqueData
    }
       
      
      return result.rows;
    })
  );
  static getDetailMsg = asyncHandler(async (sender_id, receiver_id) => {
    psqlConnection();
   console.log(sender_id,receiver_id,'ccc')
    let result = await client.query(
      `select m.id, m.message ,u.url_avatar,m.created_at ,u.username,u.id from messages m join 
users u on (m.receiver_id=u.id ) where (sender_id=27 and receiver_id=1) 
or ( receiver_id=$1 and sender_id=$2) order by m.created_at ASC`,
      [sender_id, receiver_id]
    );
    console.log(result.rows,'jojo')
    return result.rows;
  });
  static createMsg = asyncHandler(
    async (sender_id, receiver_id, message, message_type) => {
      console.log(message,'message')
      psqlConnection();

      let result = await client.query(
        `INSERT INTO messages (sender_id,receiver_id,message,message_type)
VALUES ($1,$2,$3,$4)`,
        [sender_id, receiver_id, message, message_type]
      );

      
      return result.rows;
    }
  );
}

module.exports = PsqlService;
