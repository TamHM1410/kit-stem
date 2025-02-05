const mongoose=require('mongoose')

var subCategorySchema=new mongoose.Schema({
    category_name: {type:String},
    category_description:{type:String},
    status:{type:Number,
        default:0
    }
},
{
    timestamps:true,
    collection:'Sub_Categories'
})

module.exports=mongoose.model('Sub_Categories',subCategorySchema)