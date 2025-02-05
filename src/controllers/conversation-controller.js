const asyncHandler = require("express-async-handler");
const conversation_service = require("../services/conversation-service");
const { Success } = require("../core/success.response");
class ConversationController {
  static created = asyncHandler(async (req, res) => {
    let userIdA = req.body.sender;
    let userIdB = req.body.receiver;
    new Success(
      "success",
      await conversation_service.createdConversation({ userIdA, userIdB })
    ).send(res);
  });
  static findListConversationById = asyncHandler(async (req, res) => {
    let userId = req.body.userId;

    new Success(
      "Success",
      await conversation_service.getAllContact(userId)
    ).send(res);
  });
  static getMessageInconversation = asyncHandler(async (req, res) => {
    let conversationId = req.body.conversationId;

    new Success(
      "success",
      await conversation_service.getMessByConversation(conversationId)
    ).send(res);
  });
}

module.exports = ConversationController;
