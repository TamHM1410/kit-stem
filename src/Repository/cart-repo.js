const cart_model = require("../models/cart");
const mongoose=require('mongoose')

const create_cart = async (user_id) => {
  try {
    const newCart = await cart_model.create({
      user_id: user_id,
    });

    return newCart;
  } catch (error) {}
};

const get_cart = async (user_id) => {
  try {
    const user_cart = await cart_model
      .findOne({
        user_id: user_id,
      })
      .populate({
        path: "cart_product.stem_id",
        model: "Stems",
      });

    if (!user_cart) {
      const newCart = await create_cart(user_id);
      return newCart;
    }
    return user_cart;
  } catch (error) {
    console.log(error, "err");
  }
};

const update_product_in_cart = async (cart_product, user_id) => {
  try {
    const updatedCart = await cart_model.findOneAndUpdate(
      {
        user_id: user_id,
      },
      {
        cart_product: cart_product,
        cart_count_product:
          (Array.isArray(cart_product) && cart_product.length) || 0,
      },
      {
        new: true,
      }
    );
    return updatedCart;
  } catch (error) {
    console.log(error);
  }
};

const update_product_quantity_in_cart = async (cart_id, stem_id, quantity) => {
  try {
    // Use new to create ObjectId
    const objectStemId = new mongoose.Types.ObjectId(stem_id);

    // First, check if the cart and specific product exist
    const cart = await cart_model.findOne({
      _id: cart_id,
      "cart_product": { 
        $elemMatch: { 
          stem_id: objectStemId 
        } 
      }
    });


    if (!cart) {
      console.error("Cart or product not found");
      return null;
    }

    // Update the specific product in the cart
    const result = await cart_model.updateOne(
      { 
        _id: cart_id, 
        "cart_product.stem_id": objectStemId 
      },
      { 
        $set: { 
          "cart_product.$.quantity": quantity 
        } 
      }
    );

    console.log("Update result:", result);

    if (result.modifiedCount > 0) {
      // Fetch the updated cart with the specific product
      const updatedCart = await cart_model.findOne(
        { _id: cart_id },
        { 
          "cart_product": { 
            $elemMatch: { stem_id: objectStemId } 
          } 
        }
      );

      console.log("Updated cart:", updatedCart);

      return updatedCart.cart_product[0];
    }

    return null;
  } catch (error) {
    console.error("Error updating cart product:", error);
    return null;
  }
};

module.exports = {
  get_cart,
  update_product_in_cart,
  update_product_quantity_in_cart,
};
