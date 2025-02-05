const mongoose = require("mongoose");
const order_detail_model = require("../models/order-detail-model");
const order_model = require("../models/order-model");
const enroll_course_model = require("../models/enroll_course-model");
const course_model = require("../models/course-model");
const user_model = require("../models/user-model");
const ship_model = require("../models/ship-model");
const { BadRequestError } = require("../core/error.response");

const create_new_order_details = async (payload = []) => {
  try {
    const newOrders = await Promise.all(
      payload.cart_product.map(async (item) => {
        return order_detail_model.create(item); // Không cần await ở đây, Promise.all xử lý
      })
    );

    if (newOrders) {
      payload["order_detail"] = newOrders;
      const new_order = await order_model.create(payload);
      return new_order;
    }
  } catch (error) {
    console.log(error, "err");
  }
};

const findAllOrdered = async (payload, query) => {
  console.log(payload, "payload", "query:", query);
  try {
    if (payload) {
      const listOrder = await order_model
        .find({
          user_id: payload,
        })
        .select(
          "ship_address description _id total_orders total phone  status"
        );
      if (listOrder.length > 0) {
        for (const [index, item] of listOrder.entries()) {
          const res = await ship_model
            .findOne({
              order_id: new mongoose.Types.ObjectId(item._id), // Dùng _id để truy cập chính xác
            })
            .populate({
              path: "user_id",
              select: "name phoneNumber",
            });

          if (res) {
            listOrder[index] = {
              ...item.toObject(), // Đảm bảo có thể thêm field mới
              shipper: res?.user_id, // Gán giá trị shipper
            };
            console.log(listOrder[index], "list"); // Debug
          }
        }
      }

      return listOrder;
    } else if (query) {
      const listOrder = await order_model
        .find({
          payment_method: query.toUpperCase(),
        })
        .populate("user_id", "name")
        .select(
          "user_id total_orders total description status createdAt payment_method"
        ) // Chỉ lấy các trường này
        .lean();

      const updatedListOrder = await listOrder.map((order) => ({
        ...order,
        user_id: order.user_id?.name || "N/A", // Thêm `user_name`
      }));
      return updatedListOrder;
    } else {
      const listOrder = await order_model
        .find()
        .populate("user_id", "_id name")
        .select(
          "user_id total_orders total description status createdAt payment_method"
        ) // Chỉ lấy các trường này
        .lean();

      const updatedListOrder = await listOrder.map((order) => ({
        ...order,
        user_id: order.user_id || "N/A", // Thêm `user_name`
      }));
      return updatedListOrder;
    }
  } catch (error) {
    console.log(error);
  }
};

const update_order = async (id, payload) => {
  try {
    ///
    const find_order = await order_model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    // Assign shipper if available
    const findExistingShipper = await user_model.findOneAndUpdate(
      {
        role: "SHIPPER",
        status: { $in: [0, 1] }, // Tìm status là 0 hoặc 1
      },
      {
        status: 2,
      }
    );



     ///////
    if (!findExistingShipper) {
      if(find_order?.status==5){
        throw new BadRequestError("Hiện tại không có shipper", 409);


      }
      payload["status"] = 5;
    }

    const update = await order_model.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (findExistingShipper) {
      await ship_model.create({
        user_id: findExistingShipper._id,
        order_id: find_order._id,
      });
    }

    if (payload.user_id && update.status === 2) {
      // Get unique stem IDs from order details
      const uniqueStemIds = [
        ...new Set(
          await Promise.all(
            update.order_detail.map(
              async (item) =>
                (
                  await order_detail_model
                    .findById({
                      _id: new mongoose.Types.ObjectId(item),
                    })
                    .select("stem_id")
                ).stem_id
            )
          )
        ),
      ];

      // Find corresponding unique course IDs
      const uniqueCourseIds = (
        await Promise.all(
          uniqueStemIds.map(
            async (stemId) =>
              await course_model.findOne({ stem_id: stemId }).select("_id")
          )
        )
      ).filter(Boolean);

      // Enroll user in unique courses only
      await Promise.all(
        uniqueCourseIds.map(async (courseId) => {
          const existingEnroll = await enroll_course_model.findOne({
            course_id: courseId,
            user_id: new mongoose.Types.ObjectId(payload.user_id),
          });

          if (!existingEnroll) {
            await enroll_course_model.create({
              course_id: courseId,
              user_id: new mongoose.Types.ObjectId(payload.user_id),
            });
          }
        })
      );
    }

    return update;
  } catch (error) {
    throw new BadRequestError("Hiện tại không có shipper", 409);
  }
};

const get_oder_detail = async (id) => {
  try {
    const order = await order_model
      .findById(id)
      .populate({
        path: "order_detail",
        populate: "stem_id",
        select: "stem_id quantity total",
      })
      .populate("user_id", "name");

    return order;
  } catch (error) {
    throw new BadRequestError(400, "Bad");
  }
};

// const update_order

module.exports = {
  create_new_order_details,
  update_order,
  findAllOrdered,
  get_oder_detail,
};
