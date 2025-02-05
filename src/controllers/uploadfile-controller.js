const { BadRequestError } = require("../core/error.response");
const { Success } = require("../core/success.response");
const uploadfile_service = require("../services/upload-service");
const asyncHandler = require("express-async-handler");

class UploadController {
  static upload = asyncHandler(async (req, res) => {
    console.log(req.files,'re.boy')

    const files=req.files
    const stem_name=req.body.stem_name


    if(!files){
       new BadRequestError('Missing file',409).send(res)
    }
    new Success(undefined, await uploadfile_service.uploadFile(files,stem_name)).send(res);
  });
}

module.exports = UploadController;
