const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type:String,
    default:null
  },
  email: {
    type: String,
    default:null

  },
  password: {
    type: String,
    required: true,
    
  },
  role: {
    type: String,
    enum:['USER','ADMIN','SHIPPER','STAFF'],
    default: 'USER'
  },
  status: {
    type: Number,
    default: 1,
  },
  address:{
    type:String,
    default:null
  },
 
  avatar:{
    type:String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiIGUqALmA-nBL1P8nrOfdKyCWiqjXb5CoQA&s'
  }
},{
  timestamps:true,
  collection:'Users'
  
});

//Export the model
module.exports = mongoose.model("Users", userSchema);
