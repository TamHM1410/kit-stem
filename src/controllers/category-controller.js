const asyncHandler = require("express-async-handler");
const cateService = require("../services/category-service");
const { Success } = require("../core/success.response");
const { BadRequestError } = require("../core/error.response");
class CategoryController {
  static createNewCate = asyncHandler(async (req, res) => {
    const data = req.body;
    const result = await cateService.createNewCategory(data);

    new Success("Created", result).send(res);
  });
  static findAllCate = asyncHandler(async (req, res) => {
    new Success("Success", await cateService.getAllCategory()).send(res);
  });
  static updateCate = asyncHandler(async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    new Success("Success", await cateService.update(data, id)).send(res);
  });
  static deleteCate = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success("Success", await cateService.delete(id)).send(res);
  });
  static findOneCategory = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success("Success", await cateService.findCategory(id));
  });
}

module.exports = CategoryController;
