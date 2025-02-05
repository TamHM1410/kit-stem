const ship_service = require("../services/ship-service");

const { Success } = require("../core/success.response");

const asyncHandler = require("express-async-handler");

class ShippingController {
  static shipper_get_list_work = asyncHandler(async (req, res) => {
    let user_id = req.user;

    new Success(
      "ok",
      await ship_service.list_shipping_by_shipper(user_id)
    ).send(res);
  });

  static update_shipping_status = asyncHandler(async (req, res) => {
    let id = req.params.id;
    let status = req.body.status;
    new Success("Cap nhat thanh cong", await ship_service.update_shipping(id, status)).send(res);
  });
}

module.exports = ShippingController;
