const expressAsyncHandler = require("express-async-handler");
const productService =require('../services/product-service');
const { SuccessResponse ,Success} = require("../core/success.response");
const { validationResult } = require("express-validator");


class ProductController {
  static create_new =expressAsyncHandler(async(req,res)=>{
   
    new Success(undefined,await productService.createProduct(req.body.thumb_type,req.body)).send(res) })

  static getAllProductDraft=expressAsyncHandler(async(req,res)=>{

    new Success(undefined,await productService.findAllProductDraft()).send(res)
  })


  static findAllProduct =expressAsyncHandler(async (req,res)=>{
    const validate = validationResult(req);
    let skip=req.query.page -1 ||0
    let limit =req.query.limit ||50
    let sort=req.query.sort==='asc'|"ASC" ? 1 : -1
    let selectOption=req.body.selectOption
    let search =req.query.search
    const data ={skip,limit,sort,selectOption ,search}
    // console.log(c)
    if(!validate.isEmpty()){
     
     return  new Success(undefined,await productService.getAllProduct(limit,skip,sort)).send(res)
    }
    
    new Success(undefined,await productService.searchProductByName(data)).send(res)
  })



  static searchProduct =expressAsyncHandler(async(req,res)=>{
    console.log(req.query)
    let sort =req.query.sort ==='asc'
    let limit=50
    let page=req.query.page -1 || 0
    new Success(undefined,await productService.searchProductByName(req.query.search,req.body.selectOption ,limit,page,sort)).send(res)
  })

  static updateProduct =expressAsyncHandler(async(req,res)=>{
    await productService.update_product('update','asdsapd',req.body)
  })
}
module.exports=ProductController