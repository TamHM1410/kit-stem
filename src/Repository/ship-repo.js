const ship_model = require("../models/ship-model");
const order_model = require("../models/order-model");
const user_model = require("../models/user-model");
const mongoose = require("mongoose");

const shipper_get_shipping_list = async (id) => {
  try {
    const list = await ship_model
      .find({
        user_id: new mongoose.Types.ObjectId(id),
      })
      .populate({
        path: "order_id",
        select: "ship_address phone total",
      })
      .populate({
        path: "user_id",
        select: "name",
      })
      .select("user_id  order_id status ")
      .sort({ createdAt: -1 }) // Sắp xếp giảm dần (từ mới nhất đến cũ nhất)
      .exec();

    return list;
  } catch (error) {
    console.log(error, "err");
  }
};

const update_shipping_status = async (id, status) => {
  try {
    const updated = await ship_model.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      {
        new: true,
      }
    );
    // / cap nhat trang thai cua shipper khi giao hang du thanh cong hay that bai

    await user_model.findByIdAndUpdate(updated.user_id, {
      status: 1,
    });

    console.log("status", status);
    if (status === 0) {
      //// cap nhat trang thai ship && or giao hang  that bai status ==0,cap nhat trang thai cua

      await order_model.findByIdAndUpdate(updated.order_id, {
        status: 4,
      });

      return updated;
    }

    await order_model.findByIdAndUpdate(updated.order_id, {
      status: 3,
    });

    return updated;
  } catch (error) {
    console.log(error, "err");
  }
};

module.exports = {
  shipper_get_shipping_list,
  update_shipping_status,
};
