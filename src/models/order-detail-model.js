const mongoose = require("mongoose");

var orderDetailSchema = new mongoose.Schema(
  {
    stem_id: {
      type: mongoose.Types.ObjectId,
      ref: "Stems",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    status: { 
      type: Number ,
      default:0
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "OrderDetails",
  }
);

// Middleware để tính tổng trước khi lưu
orderDetailSchema.pre("save", async function (next) {
  if (this.isModified("quantity") || this.isNew) {
    const stem = await mongoose.model("Stems").findById(this.stem_id);
    if (stem) {
      this.total = stem.stem_price * this.quantity;
    }
  }
  next();
});

module.exports = mongoose.model("OrderDetails", orderDetailSchema);
