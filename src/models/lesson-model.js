const mongoose=require('mongoose')

const lessonSchema=new mongoose.Schema({
   title:{
    type:String,
    unique:true,
    require:true
   },
   lesson_material:{
    type:String,
    default:null
   },
   lesson_videoUrl:{
    type:String,
    default:null
   },
   course_id:{
    type: mongoose.Types.ObjectId, ref: "Lessons" ,
    require:true


   }
},
{
    timestamps:true,
    collection:"Lessons"
})

module.exports=mongoose.model('Lessons',lessonSchema)