const express=require('express')
const multer  = require('multer')

const upload = multer({ storage: multer.memoryStorage() });
const UploadController=require('../controllers/uploadfile-controller')

const uploadRouter=express.Router()


uploadRouter.post('/upload/product/image', upload.any(),UploadController.upload)

module.exports=uploadRouter