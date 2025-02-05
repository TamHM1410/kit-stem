const mongoose = require("mongoose");
require("dotenv").config();

///dev
const url = process.env.MONGO_URL_DEV;

///production

const instance = () => {
  mongoose
    .connect(url, {
      maxPoolSize: 50,
    })
    .then(() => console.log("Connect database success"));
};

module.exports = instance;
