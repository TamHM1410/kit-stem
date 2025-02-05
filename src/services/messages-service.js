const asyncHandler=require('express-async-handler')
const {newMessage}=require('../Repository/messages-repo')
class MessagesService{
    static createdNewMessage=asyncHandler(async({message,sender,conversationId})=>{
         return await newMessage({message,sender,conversationId})


    })


}

module.exports=MessagesService