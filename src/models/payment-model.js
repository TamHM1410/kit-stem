const mongoose =require('mongoose')

var paymentSchema =new mongoose.Schema({
    payment_method:{
        type:mongoose.Types.ObjectId,
        ref:'PaymentMethod'
    },
    payment_total:{
        type:String,
    },
    status:{
        type:number
    }
},{
    timestamps:true,
    collection:'Payments'
})

module.exports=mongoose.model('Payments',paymentSchema)