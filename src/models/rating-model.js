const mongoose = require("mongoose");

const ratingShema = new mongoose.Schema({
  rating_average: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be above 5.0"],
    ///set
    set: (val) => Math.round(val * 10) / 10,
  },
  rating_total: {
    type: Number,
    default:0,
    min:0
  },
  status:{
    type:Number
  }
 
},{
    timestamps:true,
    collection:'Ratings'
});

module.exports=mongoose.model('Ratings',ratingShema)