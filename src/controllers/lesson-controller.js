const asyncHandler = require("express-async-handler");
const UploadFileService=require('../services/upload-service')
const LessonService=require('../services/lesson-service');
const { Success } = require("../core/success.response");

class LessonController{
    static create=asyncHandler(async(req,res)=>{
   
        console.log(req.files,'res',req.body.course_id)

        const result=await UploadFileService.uploadLessonFile(req.files,req.body.title)

        if(result){
            req.body["lesson_material"]=result[0]?.file_url
            console.log('response',req.body.data)
            new Success('Tạo khóa học thành công',LessonService.create_lesson({
                title:req.body.title,
                lesson_videoUrl:req.body.lesson_videoUrl,
                lesson_material:result[0]?.file_url,
                course_id:req.body.course_id
            },req.body.course_id)).send(res)

        }
       


    })

    static get_by_id=asyncHandler(async(req,res)=>{
        let id =req.params.id
        new Success('ok',await LessonService.get_lesson(id)).send(res)
    })

}

module.exports=LessonController