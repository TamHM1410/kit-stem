const mongoose=require('mongoose')

const inventorySchema=new mongoose.Schema({
    inven_stock:{
        type:Number,
        min:[0,"Minimum quantity is 0"],
        max:[100,"Max ximum"],
        default:10
    },
    stem_id:{
        type:mongoose.Types.ObjectId,
        ref:'Stems',
        default:null
    },
  
    status:{
        type:Number
    }
},
{
    timestamps:true,
    collection:"Inventories"
})

module.exports=mongoose.model('Inventories',inventorySchema)