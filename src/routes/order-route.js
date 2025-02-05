const express = require("express");
const { checkLogin } = require("../middlewares/check-login");
const OrderController = require("../controllers/order-controller");

const orderRouter = express.Router();

orderRouter.get("/orders/users", checkLogin, OrderController.getUserOrder);

orderRouter.get("/orders", OrderController.getUserOrder);

orderRouter.patch("/orders/:id", OrderController.update_order);

orderRouter.get("/orders/:id", OrderController.get_order_detail);

module.exports = orderRouter;
