const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },

    ship_address: {
      type: String,
    },
    description: {
      type: String,
    },
    order_detail: [
      {
        type: mongoose.Types.ObjectId,
        ref: "OrderDetails", // Tham chiếu đến bảng OrderDetails
      },
    ],
    total_orders: {
      type: Number,
      default: 0, // Tổng số lượng đơn hàng
    },
    total: {
      type: Number,
      default: 0, // Tổng số tiền
    },
    phone: {
      type: Number,
      default: 0, // Tổng số tiền
    },
    status: {
      default: 1,
      type: Number,
    },
    payment_method: {
      type: String,
      enum: ["VNPAY", "CASH", "BANK","ZALOPAY"],
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "Orders",
  }
);

// Middleware tính toán `total` và `total_orders` trước khi lưu
orderSchema.pre("save", async function (next) {
  if (this.order_detail.length > 0) {
    // Lấy tất cả các OrderDetails theo order_detail array
    const orderDetails = await mongoose
      .model("OrderDetails")
      .find({ _id: { $in: this.order_detail } });

    // Tính toán tổng số tiền `total`
    this.total = orderDetails.reduce(
      (sum, detail) => sum + (detail.total || 0),
      0
    );

    // Tính tổng số lượng đơn hàng `total_orders`
    this.total_orders = orderDetails.reduce(
      (sum, detail) => sum + (detail.quantity || 0),
      0
    );
  }

  next();
});

module.exports = mongoose.model("Orders", orderSchema);
