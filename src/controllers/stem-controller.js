const StemService = require("../services/stem-service");
const { Success } = require("../core/success.response");

const asyncHandler = require("express-async-handler");
const { BadRequestError } = require("../core/error.response");

class StemController {
  static create_stem = asyncHandler(async (req, res) => {
    const result =await StemService.createNewStem(req.body)
    // if(result.hasOwnProperty(error)){
    //   console.log('res')
    //   new BadRequestError(409,result).send(res)
    // }
    new Success("Success", result).send(res);
  });
  static find_all_stem = asyncHandler(async (req, res) => {
    let limit = req.query.limit || 50;
    let skip = req.query.skip || 0;
    new Success("Success", await StemService.get_stem({ limit, skip })).send(
      res
    );
  });
  static delete_stem = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success("Success", await StemService.delete_stem(id)).send(res);
  });
  static update_stem = asyncHandler(async (req, res) => {
    const id=req.params.id
    new Success("Cập nhật thành công", await StemService.update_stem(id,req.body)).send(res);
  });
  static findById =asyncHandler (async (req,res)=>{
    let id =req.params.id
    new Success("success",await StemService.findStemById(id)).send(res)
  })
}

module.exports = StemController;
