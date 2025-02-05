const {
    findAllSubCate,
    findCateById,
    createSubCate,
    updateSubCate,
    deleteById
}=require('../Repository/sub-category-repo')
const asyncHandler=require('express-async-handler')
class SubCateService{
    static findAll=asyncHandler(async()=>{
        return await findAllSubCate()
    })
    static findById=asyncHandler(async(id)=>{
        return await findCateById(id)

    })
    static createNew=asyncHandler(async(data)=>{
        return await createSubCate(data)
    })
    static updateById=asyncHandler(async(data,id)=>{
        return await updateSubCate(data,id)
    })
    static delete=asyncHandler(async(id)=>{
        return await deleteById(id)

    })
    

}

module.exports=SubCateService