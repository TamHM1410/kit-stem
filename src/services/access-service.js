const { ConflictRequestError } = require("../core/error.response");
const { Created, Success } = require("../core/success.response");
const MailService=require('./mail-service')
const bcrypt = require("bcryptjs");
const users = require("../models/user-model");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { createToken } = require("../auths/createToken");
const {checkPassword}=require("../utils/index")
class Access {
  static register = asyncHandler(async (req, res) => {
    const checkExist = await users.findOne({
      $or: [{ username: req.body?.username }, { email: req.body?.email }],
    });
    console.log(checkExist,'check exitsx  ');
    if (checkExist) {
      return new ConflictRequestError(
        "Existing email or user name",
        undefined,
        checkExist
      ).send(res);
    }

    const hashpassword = bcrypt.hashSync(req.body.password, 6);
    console.log('re',req.body)

    const newData = await users.create({
      name: req.body?.name,
      email: req.body?.email,
      username: req.body?.username,
      password: hashpassword,
    });
    if(newData){
      await MailService.send_register_mail(req.body?.email)
    }
    return new Created("Đăng ký thành công", newData).send(res);
  });

  //////Login
  static login = asyncHandler(async (req, res) => {
    const user = await users.findOne({
      $or: [{ username: req.body?.username }, { email: req.body?.email }],
    });
    
    if (!user)
      return new ConflictRequestError("Không tìm thấy người dùng", 404, undefined).send(
        res
      );
      
    return await checkPassword(req.body?.password,user?.password) === true
    ? new Success("Đăng nhập thành công", await createToken({ user })).send(res)
    : new ConflictRequestError("Sai password").send(res);
   
  });
}

module.exports = Access;
