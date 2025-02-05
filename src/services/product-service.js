const { BadRequestError } = require("../core/error.response");
const { products, clothes, electric } = require("../models/product-model");
const {
  removeUndefinedObject,
  updateNestedObjectParser,
} = require("../utils/index");
const {
  findAllDraft,
  searchProduct,
  findAllProduct,
  updateProductQuery,
} = require("../models/Repository/product.repo");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");

class ProductService {
  static createProduct = asyncHandler(async (type, payload) => {
    switch (type) {
      case "Clothes":
        console.log(payload, "payload");
        // for (let i=0; i<10000;i++){

        //     let clone =_.clone(payload);
        //     clone['product_name']=`${payload.product_name} ${i}`
        //     new Clothes(clone).create()
        // }
        return new Clothes(payload).create();
    }
  });
  static findAllProductDraft = asyncHandler(async (limit = 50, skip = 0) => {
    const query = { isDraft: true };
    return findAllDraft({ query, limit, skip });
  });
  static searchProductByName = asyncHandler(async (data) => {
    return searchProduct({ data });
  });
  static getAllProduct = asyncHandler(async (limit, skip, sort) => {
    return findAllProduct({ limit, skip, sort });
  });

  static update_product = asyncHandler(async (type, product_id, payload) => {
    console.log('payload',payload)

    new Clothes().update_product(product_id,payload);
  });
}

class Product {
  constructor({
    product_name,
    product_description,
    product_price,
    product_image,
    product_type,
    product_attribute,
    product_ratingAverage,
    product_variation,
  }) {
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_image = product_image;
    this.product_price = product_price;
    this.product_type = product_type;
    this.product_attribute = product_attribute;
    this.product_ratingAverage = product_ratingAverage;
    this.product_variation = product_variation;
  }
  create_product = asyncHandler(async () => {
    return await products.create(this);
  });

  update_product = asyncHandler(async () => {
    // console.log('payload',payload)
    let objParser = removeUndefinedObject(this);
    if (objParser.product_attribute) {
      let a = updateNestedObjectParser(objParser);
      let query = updateProductQuery(a);
    }
  });
}

class Clothes extends Product {
  create = asyncHandler(async () => {
    let newClothes = await clothes.create(this.product_attribute);

    if (!newClothes) throw new BadRequestError();
    let newProduct = await this.create_product();
    console.log('this is new product',newProduct)

 

    return newProduct;
  });
  updateClothes = asyncHandler(async (product_id, payload) => {
    let existing_clothes = await clothes.findById(product_id);
    if (!existing_clothes) return new BadRequestError();
    let updateClothe = await clothes.findByIdAndUpdate(product_id, payload);
    return updateClothe;
  });
}
module.exports = ProductService;
