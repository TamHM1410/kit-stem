const express = require("express");
const {paths}=require('../config/route')
const cateController=require('../controllers/category-controller')
const cateRouter=express.Router()

cateRouter.get(paths.CATEGORY.GET,cateController.findAllCate)

cateRouter.get(paths.CATEGORY.GETBYID,cateController.findOneCategory)

cateRouter.post(paths.CATEGORY.CREATE,cateController.createNewCate)

cateRouter.patch(paths.CATEGORY.UPDATE,cateController.updateCate)


cateRouter.delete(paths.CATEGORY.DELETE,cateController.deleteCate)






module.exports=cateRouter


