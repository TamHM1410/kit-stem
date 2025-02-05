const { Success } = require("../core/success.response");
const CartService = require("../services/cart-service");
const asyncHandler = require("express-async-handler");

class CartController {
  static findCart = asyncHandler(async (req, res) => {
    let user_id = req.user;
    console.log(user_id, "userId");
    new Success("Success", await CartService.find_user_cart(user_id)).send(res);
  });

  static updatedCart = asyncHandler(async (req, res) => {
    let quantity = req.query.update_quantity;

    if (quantity && quantity == "true") {
      const { cart_id, stem_id, quantity } = req.body;

      new Success(
        "Ok",
        await CartService.update_cart_quantity({
          cart_id,
          stem_id,
          quantity,
        })
      ).send(res);
    }
    let user_id = req.user;
    console.log(req.body.cart_product.cart,'body')
    new Success(
      "Success",
      await CartService.update_cart(req.body.cart_product, user_id)
    ).send(res);
  });
}

module.exports = CartController;
