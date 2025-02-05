const { InternalError, BadRequestError } = require("../core/error.response");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof InternalError) {
    return err.send(res); // Gửi lỗi chi tiết từ InternalError
  }

  if (err instanceof BadRequestError) {
    return err.send(res); // Gửi lỗi chi tiết từ BadRequestError
  }

  // Nếu lỗi không phải là một lỗi tùy chỉnh
  let message = new InternalError();
  return res
    .status(message.statusCode || 500)
    .json({ message: message.message, statusCode: 500, error: err.message });
};

module.exports = ErrorHandler;
