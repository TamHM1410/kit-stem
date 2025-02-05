const { Success } = require('../core/success.response')
const subCateService=require('../services/sub-cate-service')
const asyncHandler=require('express-async-handler')
class SubCateController{
    static findAll=asyncHandler(async(req,res)=>{
        new Success('Success',await subCateService.findAll).send(res)
    })
    static findById=asyncHandler(async(req,res)=>
    {
        let id=req.params.id
        new Success('Success',await subCateService.findById(id)).sed(res)

    })

    static create=asyncHandler(async(req,res)=>{
        let data=req.body
        new Success(undefined,await subCateService.createNew(data)).send(res)
    })

    static update=asyncHandler(async(req,res)=>{
        let id=req.params.id
        let data=req.body
        new Success(undefined,await subCateService.updateById(data,id)).send(res)
    })
    static delete=asyncHandler(async(req,res)=>{
        let id=req.params.id
        new Success(undefined,await subCateService.delete(id)).send(res)
    })

}

module.exports=SubCateController