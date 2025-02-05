const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const webApi = require("./routes/index");
const instance = require("./config/instance");
const error_handler = require("./middlewares/Errorhandle");
const cors = require("cors");
const { method } = require("lodash");
const { psqlConnection } = require("../src/config/psqlconnection");
require("dotenv").config();

const app = express();

///dependencies

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "ws://127.0.0.1:58202/Y0K-wQ8gR60=/ws",
      "https://booking-tour-zeta.vercel.app",
      "https://localhost:3000",
      "https://hella-booking-ant.vercel.app",
      "http://localhost:8081",
      "http://localhost:5173",
      "https://e446-2405-4802-8015-93a0-4da9-f4b4-5e36-7c1c.ngrok-free.app",
    ],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello User this is your be",
    statusCode: 200,
  });
});

////routes
webApi(app);

///db
instance();
// psqlConnection()
// Error handling middleware
app.use(error_handler);

module.exports = app;
