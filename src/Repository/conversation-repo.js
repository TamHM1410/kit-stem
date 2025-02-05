const { BadRequestError } = require("../core/error.response");
const conversation_model = require("../models/conversation-model");
const mess_model=require("../models/messages-model")

const created_new_conversation = async ({ userIdA, userIdB }) => {
  try {
    let isExistConversation = await conversation_model.findOne({
      participants: { $all: [userIdA, userIdB] },
    });

    if (!isExistConversation) {
      let newConversation = await conversation_model.create({
        participants: [userIdA, userIdB],
      });
      return newConversation;
    }
  } catch (error) {
    return new BadRequestError();
  }
};

const findAllConversationById = async (userId) => {
  try {
    let listConversation = await conversation_model
      .find({
        participants: userId,
      })
      .populate({
        path: "participants",
        select: "name userName email",
      });

    console.log(userId, "list", listConversation);
    return listConversation;
  } catch (error) {
    console.log(error);
    return new BadRequestError();
  }
};

const findMessage = async (conversationId) => {
  try {
    let messageInConversation =await  mess_model.find({
        conversationId:conversationId
    })

    return messageInConversation
  } catch (error) {
    console.log(error);
    return new BadRequestError();
  }
};

module.exports = {
  created_new_conversation,
  findAllConversationById,
  findMessage
};
