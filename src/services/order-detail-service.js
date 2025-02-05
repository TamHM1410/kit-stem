const asyncHandler = require("express-async-handler");
const {
  create_new_order_details,
  findAllOrdered,
  update_order,
  get_oder_detail
} = require("../Repository/order-detail-repo");

class OrderDetailServiceClass {
  static create_order_detail = asyncHandler(async (payload) => {
    return await create_new_order_details(payload);
  });
  static get_user_orders = asyncHandler(async (payload,query) => {
    console.log(payload,'paylod')
    return await findAllOrdered(payload,query);
  });
  static get_orders=asyncHandler(async(payload,query)=>{
    return await findAllOrdered(payload,query)
  })

  static update_order_status=asyncHandler(async(id,payload)=>{
    return await update_order(id,payload)
  })

  static get_order_by_id=asyncHandler(async(id)=>{
    return await get_oder_detail(id)
  })


}

module.exports = OrderDetailServiceClass;
