const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        unique:true
    },
    category_description:{
        type:String
    },
    status:{
        type:Number,
        default:2
    }
},{
    timestamps:true,
    collection:'Categories'
})
module.exports=mongoose.model('Categories',categorySchema)