const asyncHandler = require("express-async-handler");
const OrderDetailService = require("../services/order-detail-service");
const { SuccessResponse, Success } = require("../core/success.response");
const PaymentService = require("../services/payment-service");
const OrderService = require("../services/order-detail-service");
const CartService = require("../services/cart-service");

class PaymentController {
  static createOrder = asyncHandler(async (req, res) => {
    req.body["user_id"] = req.user;

    let response = await OrderDetailService.create_order_detail(req.body);
    // console.log(req.user, "respones");

    let payment_method = req.body.payment_method;
    await CartService.update_cart([], req.body.user_id);

    switch (payment_method) {
      case "VNPAY":
        {
          if (response) {
            const payload = {
              user_id: req.body.user_id,

              order_id: response._id.toString(),
              total: response.total,
            };

            new Success(
              "ok nha",
              await PaymentService.create_vpn_url(req, payload)
            ).send(res);
          }
        }
        break;
      case "ZALOPAY": {
        let amount = response.total;
        let id = response._id;
        let user_id = req.user;
        let fakeData = { amount, user_id, id };

        let rs = await PaymentService.create_zalo(fakeData);

        new Success("ok nha", rs).send(res);
      }
      case "CASH":
        new Success("Thanh cong", response).send(res);

      default:
        new Success("Thanh cong", response).send(res);
    }
  });

  static zalo_call_back = asyncHandler(async (req, body) => {
    const { data, mac } = req.body;
    let item = JSON.parse(data);
    const parsedData = JSON.parse(item?.item);
    let payload = {
      user_id: parsedData[0]?.user_id,
      status: 2,
    };

    const res = await OrderService.update_order_status(
      parsedData[0]?.id,
      payload
    );

    console.log(res, "res");
  });
}

module.exports = PaymentController;
