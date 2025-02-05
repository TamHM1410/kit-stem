const mongoose=require('mongoose')

const commentShcema=new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    },
    comment_description:{
        type:String
    }
    
},{
    timestamps:true,
    collection:'Comments'
})

module.exports=mongoose.Schema('Comments',commentShcema)