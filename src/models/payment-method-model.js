const mongoose = require("mongoose"); // Erase if already required

var paymentMethodSchema =new mongoose.Schema({
    payment_method_name: {
        type:String,
        enum:['BANKING','CASH'],
        default:'CASH'
    },
    status :{
        type:Number,
        default:0
    }



},{
    timestamps:true,
    collection:'PaymentMethods'
})

module.exports=mongoose.model('PaymentMethods',paymentMethodSchema)