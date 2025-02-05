const { shipper_get_shipping_list ,update_shipping_status} = require("../Repository/ship-repo");
const asyncHandler = require("express-async-handler");

class ShipService {
  static list_shipping_by_shipper = asyncHandler(async (id) => {
    return await shipper_get_shipping_list(id);
  });


  static update_shipping=asyncHandler(async(id,status)=>{
    return await  update_shipping_status(id,status)
  })
}

module.exports = ShipService;
