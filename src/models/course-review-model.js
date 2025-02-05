const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
   rating:{
    type:Number,
    default:4.5,
    min:[1,"Rating must be above 1.0"],
    max:[5,"Rating must be above 5.0"],
    ///set
    set:(val)=> Math.round(val*10)/10


   },
   course_id:{
    type: mongoose.Types.ObjectId,
    ref:'Courses'

   }

},
{
    timestamps:true,
    collection:"CoursesReview"
})

module.exports=mongoose.model('CoursesReview',courseSchema)