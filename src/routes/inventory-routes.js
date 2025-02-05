const express=require('express')
const {paths}=require('../config/route')
const InventoryController=require('../controllers/inventory-controller')
const invenRouter=express.Router()

invenRouter.get(paths.INVENTORY.GET,InventoryController.findAllInventory)
invenRouter.get(paths.INVENTORY.GETBYID,InventoryController.findInventoryById)
invenRouter.post(paths.INVENTORY.CREATE,InventoryController.createNewInventory)
invenRouter.patch(paths.INVENTORY.UPDATE,InventoryController.updateInventoryById)
invenRouter.delete(paths.INVENTORY.DELETE,InventoryController.deleteInventoryById)
module.exports=invenRouter

