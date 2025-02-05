const products_model = require("../models/products-model");

const mainboard_model = require("../models/mainboard-model");

const inventory_model=require("../models/inventory-model")

const {  removeUndefinedObject,
  updateNestedObjectParser,} =require('../utils/index');
const { BadRequestError } = require("../core/error.response");

///products
const createNewProduct = async (payload) => {
  let newProduct =await products_model.create(payload)
  let newInventory=await inventory_model.create({
    product_id:newProduct._id,
    inven_stock:payload.quantity

  })
  await newProduct.updateOne({product_stock:newInventory._id},{new:true})
  return newProduct ;
};

const findProducts = async (skip, limit) => {
  const totalProducts = await products_model.countDocuments();

 const products =await products_model.find().skip(skip).limit(limit).lean().exec();
 return {
   totalProducts:totalProducts,
   products:products
 }
};

const getProductById=async(id)=>{
  return await products_model.findById(id)
}

const updateProduct=async(payload)=>{
  let obj=removeUndefinedObject(payload)
  if(obj.product_technical_specification){
    let a = updateNestedObjectParser(obj);
    return await products_model.findByIdAndUpdate(obj._id,a,{new:true})

  }

}
const getProductBySlug=async(slug)=>{
  let product= await products_model.findOne({
    product_slug:slug
  })
  if(!product){
    return  new BadRequestError('Not found',404)
  }
  return product

}
////mainboard
const createMainBoard = async (payload) => {
  return await mainboard_model.create(payload);
};

module.exports = {
  createNewProduct,
  findProducts ,
  createMainBoard,
  getProductById,
  updateProduct,
  getProductBySlug
};
