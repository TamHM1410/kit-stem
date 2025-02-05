const mongoose = require("mongoose");

const mainboardSchema = new mongoose.Schema({
  product_id:{
    type: mongoose.Types.ObjectId,
    ref:'Products',
    

  },
  cpu_support: {
    type: String,
  },
  chip_set: { type: String },
  hard_drive_support: { type: String },
  internal_connection_port: { type: String },
  external_connection_port: { type: String },
  lan: { type: String },
  size: {
    type: String,
    min: 0,
  },
},{
    collection:'Mainboards',
    timestamps:true
});

module.exports = mongoose.model("Mainboards", mainboardSchema);
