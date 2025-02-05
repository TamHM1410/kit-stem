const express = require("express");
const {paths}=require('../config/route')
const conversationController=require('../controllers/conversation-controller')


const conversationRouter=express.Router()

conversationRouter.post(paths.CONVERSATION.POST,conversationController.created)

conversationRouter.post(paths.CONVERSATION.GETUSERCONVERSATION,conversationController.findListConversationById)

conversationRouter.post(paths.CONVERSATION.GETMESSAGEINCONVERSATION,conversationController.getMessageInconversation)


module.exports=conversationRouter