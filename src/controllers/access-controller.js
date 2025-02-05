const access = require("../services/access-service");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { ConflictRequestError } = require("../core/error.response");

class AccessController {
  ////////Register

  static register = asyncHandler(async (req, res) => {
    console.log(req.body,'re.bod')
    // const validate = validationResult(req);
    // if (!validate.isEmpty()) {
    //   return new ConflictRequestError(
    //     "Validation error",
    //     undefined,
    //     validate.array()
    //   ).send(res);
    // }

    await access.register(req, res);
  });

  ////login

  static login = asyncHandler(async (req, res) => {
  
    const validate = validationResult(req);
    // if (!validate.isEmpty()) {
    //   return new ConflictRequestError(
    //     "Validation error",
    //     undefined,
    //     validate.array()
    //   ).send(res);
    // }

    await access.login(req, res);
  });
}

module.exports = AccessController;
