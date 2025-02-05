const asyncHandler = require("express-async-handler");
const { created_new_conversation ,findAllConversationById,findMessage} = require("../Repository/conversation-repo");
class ConversationService {
  static createdConversation = asyncHandler(async ({ userIdA, userIdB }) => {
    return await created_new_conversation({ userIdA, userIdB });
  });
  static getAllContact =asyncHandler(async(userId)=>{
   
    return await findAllConversationById(userId)
    

  })
  static getMessByConversation =asyncHandler(async(conversationId)=>{
     return await findMessage(conversationId)
  })
}

module.exports = ConversationService;
