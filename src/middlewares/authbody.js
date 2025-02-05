const { body, query } = require("express-validator");

const validatedRegister = [
  body("userName").isLength({ min: 6 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];
const validateLogin = [
  body("userName").optional().isLength({ min: 6 }),
  body("email").optional().isLength({ min: 6 }),

  body("password").isLength({ min: 6 }),
];

const checkQuery = [
  query("search").isString(),
  query("page").optional().isInt().toInt(),
];

module.exports = { validatedRegister, validateLogin, checkQuery };
