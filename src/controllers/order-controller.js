const asyncHandler = require("express-async-handler");
const OrderService = require("../services/order-detail-service");

const { Success } = require("../core/success.response");

class OrderController {
  static getUserOrder = asyncHandler(async (req, res) => {
    let user_id = req.user;
    let payment_method = req.query.payment_method;
    if (user_id) {
      new Success(
        "Ok",
        await OrderService.get_user_orders(user_id, undefined)
      ).send(res);

      return;
    }
    new Success(
      "ok",
      await OrderService.get_orders(undefined, payment_method)
    ).send(res);
  });

  static update_order = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success(
      "Cập nhật thành công",
      await OrderService.update_order_status(id, req.body)
    ).send(res);
  });
  static get_order_detail = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success("ok", await OrderService.get_order_by_id(id)).send(res);
  });
}

module.exports = OrderController;
