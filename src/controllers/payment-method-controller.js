const { Success } = require('../core/success.response')
const methodService=require('../services/payment-method-service')
const asyncHandler=require('express-async-handler')

class PaymentMethodController{
   
    static findAll=asyncHandler(async(req,res)=>{
        new Success(undefined,await methodService.findALl()).send(res)
    })

    static findById=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await methodService.findById(id)).send(res)
    })

    static updateById=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await methodService.update(id)).send(res)
    })

    static create=asyncHandler(async(req,res)=>{
        let data=req.body
        new Success(undefined,await methodService.createNew(data)).send(res)
    })
    static delete=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await methodService.delete(id)).send(res)
    })

}

module.exports=PaymentMethodController