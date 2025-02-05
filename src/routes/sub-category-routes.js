const express=require('express')
const subController=require('../controllers/sub-category-controller')
const {paths}=require('../config/route')


const subcateRouter=express.Router()

subcateRouter.get(paths.SUBCATEGORY.GET,subController.findAll)

subcateRouter.get(paths.SUBCATEGORY.GETBYID,subController.findById)


subcateRouter.post(paths.SUBCATEGORY.CREATE,subController.create)

subcateRouter.patch(paths.SUBCATEGORY.UPDATE,subController.update)


subcateRouter.delete(paths.SUBCATEGORY.DELETE,subController.delete)





module.exports=subcateRouter