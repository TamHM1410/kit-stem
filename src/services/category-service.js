const asyncHandler=require('express-async-handler')
const {    createNewCategory,getAllCategory,updateCategory,deleteCategory,    findOneById}=require('../Repository/category-repo')


class CategoryService{
    static createNewCategory=asyncHandler(async(data)=>{
        return await createNewCategory(data)
     })

    static getAllCategory=asyncHandler(async()=>{
        return await getAllCategory()

    })
    static update= asyncHandler(async(data,id)=>{
        return await updateCategory(data,id)

    })
    static  delete=asyncHandler(async(id)=>{
        return await deleteCategory(id)
    })
    static findCategory =asyncHandler(async (id)=>{
        return await findOneById(id)
    })



}

module.exports=CategoryService