const {
    createInventory,
    getAllInventory,
    deleteInventory,
    updateInventory,
    getInventoryById
} =require('../Repository/inventory-repo')
const asyncHandler = require("express-async-handler");

class InventoryService{
    static createNew=asyncHandler(async(data)=>{
        return await createInventory(data)

    })
    static findAll=asyncHandler(async()=>{
        return await getAllInventory(id)
    })
    static update=asyncHandler(async(data,id)=>{
        return await  updateInventory(data,id)
    })
    static delete=asyncHandler(async(id)=>{
        return await deleteInventory(id)

    })
    static findById=asyncHandler(async(id)=>{
        return  await getInventoryById(id)
    })

}
module.exports=InventoryService