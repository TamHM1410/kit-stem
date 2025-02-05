const mongoose=require('mongoose')
const conversationSchema =new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true
    }],
    lastMessage:{
        type:mongoose.Types.ObjectId,
        ref:'Messages'
    }
},{ timestamps: true ,collection:'Conversations'})


const Conversation=mongoose.model('Conversations',conversationSchema)


module.exports=Conversation