const express=require('express')
const LessonController=require('../controllers/lesson-controller')
const multer  = require('multer')

const upload = multer({ storage: multer.memoryStorage() });

const lessonRouter=express.Router()

lessonRouter.post('/lessons',upload.any(),LessonController.create)

lessonRouter.get('/lessons/:id',LessonController.get_by_id)




module.exports=lessonRouter