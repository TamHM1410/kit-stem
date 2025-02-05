const sub_category_model=require('../models/sub-category-model')

const findAllSubCate=async()=>{
    return await sub_category_model.find().lean().exec()
}

const findCateById=async(id)=>{
    return await sub_category_model.findById(id)
}
const createSubCate=async(data)=>{
    return await sub_category_model.create(data)
}

const updateSubCate=async(data,id)=>{
    return await sub_category_model.findByIdAndUpdate(id,data)
}

const deleteById=async(id)=>{
    return await sub_category_model.findByIdAndDelete(id)
}

module.exports={
    findAllSubCate,
    findCateById,
    createSubCate,
    updateSubCate,
    deleteById
}