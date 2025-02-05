const { products, clothes, electric } = require("../product-model");
const { onSelect, unSelect } = require("../../utils/index");
const { BadRequestError } = require("../../core/error.response");

const findAllProduct = async ({ limit, skip, sort }) => {
  return await products
    .find()
    .sort({ updatedAt: sort })
    .limit(limit)
    .skip(skip)
    .lean()
    .exec();
};

const findAllDraft = async ({ query}) => {
  
  return products.find(query);
};
const searchProduct = async ({ data }) => {
  const { skip, limit, sort, selectOption, search } = data;

  let regexSearch = new RegExp(search);

  return await products
    .find({ $or: [{ $text: { $search: regexSearch } }] })
    .sort({ updatedAt: sort })
    .limit(limit)
    .skip(skip)
    .select(onSelect(selectOption.select))
    .select(unSelect(selectOption.unSelect));
};
const updateProductQuery =async ({product_id,payload})=>{
   let checkExistProduct =await products.findById(product_id)
   if(!checkExistProduct) return new BadRequestError('Bad request')
   let updateProduct =await products.findByIdAndUpdate(product_id,payload)
   return updateProduct
}

module.exports = { findAllDraft, searchProduct, findAllProduct,updateProductQuery };
