const express = require("express");
const { paths } = require('../config/route');
const userController = require('../controllers/user-controller');
const { checkLogin } = require('../middlewares/check-login');
const userRouter = express.Router();

// Lấy tất cả người dùng
userRouter.get(paths.USER.GETALL, userController.getAllUser);

// Lấy thông tin người dùng theo ID
userRouter.get('/users/:id', userController.getUserById);

userRouter.get('/analysis', userController.overView);

userRouter.patch('/users/:id', userController.update_user);



// Cập nhật thông tin người dùng (cần đăng nhập)
userRouter.patch(paths.USER.UPDATE, checkLogin, userController.updateUser);

module.exports = userRouter;
