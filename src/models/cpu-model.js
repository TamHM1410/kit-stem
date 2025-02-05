const mongoose = require("mongoose");

const cpuSchema = new mongoose.Schema({
  product_id:{
    type: mongoose.Types.ObjectId,
    ref:'Products',
    

  },
  processor: {
    type: String,
  },
  cache: {
    type: String,
  },

  socket: {
    type: String,
  },
  speed: {
    type: String,
  },
  maximum_turbo_speed: {
    type: String,
  },
  cores: {
    type: String,
  },
  threads: {
    type: String,
  },
  tdp: {
    type: String,
  },
  ram_support: {
    type: String,
  },
});

module.exports = mongoose.model("CPUs", cpuSchema);
