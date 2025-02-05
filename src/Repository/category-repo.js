const { BadRequestError } = require("../core/error.response");
const categoryModel = require("../models/category-model");
const createNewCategory = async (data) => {
  try{
    let findExistName= await categoryModel.findOne({
      category_name:data.category_name.toUpperCase()
    })
    if(findExistName){
      throw new BadRequestError('Tên đã tồn tại',409)
    }
    
    return await categoryModel.create({
      category_description:data.category_description,
      category_name:data.category_name.toUpperCase()
    });

  }catch(error){
    throw new BadRequestError(error.message, 409); // Ném lỗi để middleware xử lý


  }
};
const getAllCategory = async (limit, skip) => {
  return await categoryModel
    .find()
    .select("category_name category_description")
    .lean();
};
const updateCategory = async (data, id) => {
  const dataNew = await categoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (data.length == 0) {
    new BadRequestError("Not found");
  }
  return dataNew;
};
const deleteCategory = async (id) => {
  return await categoryModel.findByIdAndDelete(id);
};
const findOneById = async (id) => {
  return await categoryModel.findById(id);
};

module.exports = {
  createNewCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  findOneById,
};
