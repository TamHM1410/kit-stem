const mongoose = require('mongoose');

var messagesSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    collection:'Messeages',
    timestamps:true
}

);

module.exports = mongoose.model('Messages', messagesSchema);
