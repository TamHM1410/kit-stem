const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "hunhminhtam@gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "hunhminhtam@gmail.com",
    pass: "vtdg imfi lcgs bpzy",
  },
});


module.exports={
    transporter
}