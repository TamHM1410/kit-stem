const express = require("express");
const AccessController = require("../controllers/access-controller");
const { validatedRegister, validateLogin } = require("../middlewares/authbody");
const authRouter = express.Router();
const {paths}=require('../config/route')

authRouter.post(paths.ACCESS.REGISTER, AccessController.register);

authRouter.post(paths.ACCESS.LOGIN, AccessController.login);

authRouter.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ ok: "ok" });
});

module.exports = authRouter;
