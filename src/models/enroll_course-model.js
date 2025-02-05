const mongoose = require("mongoose");

const enrollCourseShcema = new mongoose.Schema(
  {
  
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Courses",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
    collection: "EnrollCourses",
  }
);

module.exports = mongoose.model("EnrollCourses", enrollCourseShcema);
