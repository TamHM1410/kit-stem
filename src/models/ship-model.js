const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var shipSchema = new mongoose.Schema({
    order_id:{

        type: mongoose.Types.ObjectId,
        ref:'Orders',
        required:true,
      
    },
    user_id:{

        type: mongoose.Types.ObjectId,
        ref:'Users',
        required:true,
        
    },
    status:{

        type:Number,
        default:1
    }
},{
    timestamps:true,
    collection:'Ships'
});

//Export the model
module.exports = mongoose.model('Ships', shipSchema);