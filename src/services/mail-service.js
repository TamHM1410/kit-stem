const transporter = require('../config/mail');

class MailService {
  static send_register_mail = async (email) => {
    const mailOptions = {
      from: "hunhminhtam@gmail.com",
      to: email,
      subject: "Test Email",
      text: `Name: register success`,
    };

    try {
      const info = await transporter.sendMail(mailOptions); // Dùng await để đợi kết quả
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
}

module.exports = MailService;
