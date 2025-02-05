require("dotenv").config();
const { ForbiddenError } = require("../core/error.response");
const jwt = require("jsonwebtoken");

const secretKey = process.env.DEV_KEY;

const checkLogin = async (req, res, next) => {
  const token = req.headers.token;

  
  // Kiểm tra xem có token trong headers không
  if (!token) {
    return new ForbiddenError("Không có quyền" ).send(res);
  }

  try {
    // Xác minh token
    const check = await jwt.verify(token, secretKey);
    
    // Kiểm tra nếu token đã hết hạn
    if (Date.now() >= check?.exp * 1000) {
      return new ForbiddenError("Token expired").send(res);
    }

    // Gán thông tin user vào request
    req["user"] = check.user._id;
    
    next();
  } catch (err) {
    return new ForbiddenError("Invalid token").send(res);
  }
};

module.exports = { checkLogin };
