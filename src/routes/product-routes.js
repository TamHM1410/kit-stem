const express = require("express");
const product =require('../controllers/product-controller')
const {paths}=require('../config/route')
const { checkQuery } = require("../middlewares/authbody");

const productrRouter =express.Router()


productrRouter.post(paths.PRODUCT,product.create_new)
productrRouter.get(`${paths.PRODUCT}/drafts`,product.getAllProductDraft)
productrRouter.get(paths.PRODUCT,checkQuery,product.findAllProduct)

productrRouter.patch(paths.PRODUCT,product.updateProduct)


// productrRouter.get(`${paths.PRODUCT}`,product.searchProduct)




module.exports=productrRouter