const { Success } = require('../core/success.response')
const product_service=require('../services/products-service')
const asyncHandler=require('express-async-handler')
class ProductController{
    static create=asyncHandler(async(req,res)=>{
        let type=req.body.type
        let payload=req.body
        new Success(undefined,await product_service.create_new_product(type,payload)).send(res)
    })
    static getAllProduct=asyncHandler(async(req,res)=>{
        
        let skip=req.query.page -1  || 0

        console.log(skip,'page')
       
        let limit=req.query.limit || 6

        new Success(undefined,await product_service.findAllProduct(skip,limit)).send(res)
    })
    static updateProduct=asyncHandler(async(req,res)=>{
        let payload=req.body
        new Success(undefined,await product_service.updateProductById(payload)).send(res)

    })
    static findProductById=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await product_service.findProductById(id)).send(res)

    })
    // static getProductBySlug=asyncHandler(async(req,res)=>{
        // let slug=req.params.slug
        // new Success(undefined,await product_service.getProductSlug(slug)).send(res)
    // })
    static findBySlug=asyncHandler(async(req,res)=>{
        let slug=req.params.slug
        new Success(undefined,await product_service.getProductSlug(slug)).send(res)

    })

}

module.exports=ProductController