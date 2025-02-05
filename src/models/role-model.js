const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roleSchema = new mongoose.Schema({
    role_name:{
        type:String,
        required:true,
      
    },
    role_id:{
        type:Number,
        required:true,
        unique:true,
    },
    role_permission:{
        type:Array,
        default:[]
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
    collection:'Roles'
});

//Export the model
module.exports = mongoose.model('Role', roleSchema);