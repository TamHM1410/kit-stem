const express = require("express");
// const AccessController = require("../controllers/access-controller");
// const { validatedRegister, validateLogin } = require("../middlewares/authbody");
const  passwordRouter = express.Router();
const {paths}=require('../config/route')
const PasswordController=require("../controllers/password-controller")


passwordRouter.patch(paths.PASSWORD.CHANGEPASSWORD,PasswordController.updatePassword)



module.exports=passwordRouter