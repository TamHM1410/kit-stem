const mongoose = require("mongoose"); // Erase if already required

var cartSchema = new mongoose.Schema(
  {
    cart_product: {
      type: [
        {
          stem_id: {
            type: mongoose.Types.ObjectId,
            ref: "Stems",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: [],
    },
    cart_count_product: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "Carts",
  }
);

module.exports = mongoose.model("Carts", cartSchema);
