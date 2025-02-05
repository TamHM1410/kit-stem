const express=require('express')

const {paths}=require('../config/route')

const productController=require('../controllers/products-controller')


const productRouter=express.Router()

productRouter.post(paths.PRODUCTS.POST,productController.create)

productRouter.get(paths.PRODUCTS.GET,productController.getAllProduct)

productRouter.patch(paths.PRODUCTS.UPDATE,productController.updateProduct)

productRouter.get(paths.PRODUCTS.GETBYID,productController.findProductById)

productRouter.get(paths.PRODUCTS.GETBYSLUG,productController.findBySlug)





module.exports=productRouter