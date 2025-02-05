const inventoryModel=require('../models/inventory-model')
const createInventory=async (data)=>{
    return await inventoryModel.create(data)


}

const getAllInventory=async()=>{
    return await inventoryModel.find().exec().lean()
}

const deleteInventory=async(id)=>{
    return await inventoryModel.findByIdAndDelete(id)
}
const updateInventory=async(data,id)=>{
    return await inventoryModel.findByIdAndUpdate(id,data,{
        new:true
    })
}

const getInventoryById=async(id)=>{
    return await inventoryModel.findById(id)
}
module.exports={
    createInventory,
    getAllInventory,
    deleteInventory,
    updateInventory,
    getInventoryById
}