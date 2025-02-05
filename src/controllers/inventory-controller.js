const asyncHandler=require('express-async-handler')
const inven_service=require('../services/inventory-service')
const { Success } = require('../core/success.response')
class InventoryController{
    static findAllInventory=asyncHandler(async(req,res)=>{
      
        new Success(undefined,await inven_service.findAll).send(res)

    })
    static findInventoryById=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await inven_service.findById(id)).send(res)

    })
    static updateInventoryById=asyncHandler(async(req,res)=>{
        let id=req.params.id
        let data=req.body
        new Success(undefined,await inven_service.update(data,id)).send(res)
    })
    static createNewInventory=asyncHandler(async(req,res)=>{
        let data=req.body
        new Success(undefined,await inven_service.createNew(data)).send(res)
    })
    static deleteInventoryById=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await inven_service.delete(id)).send(res)

    })

}
module.exports=InventoryController