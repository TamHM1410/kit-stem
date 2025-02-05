const message_model = require("../models/messages-model");

const newMessage = async ({ message, sender, conversationId }) => {
  try {
    let new_message = await message_model.create({
      message,
      sender,
      conversationId,
    });
    return new_message
  } catch (error) {}
};

module.exports = {
  newMessage,
};
