const lesson_model = require("../models/lesson-model");
const course_model = require("../models/course-model");
const mongoose = require("mongoose");

const create_new_lesson = async (payload, course_id) => {
  try {
    const newLesson = await lesson_model.create(payload);
    if (newLesson) {
      await course_model.findByIdAndUpdate(course_id, {
        $push: { lesson_id: newLesson._id },
      });
    }
    return newLesson;
  } catch (error) {}
};
const get_lesson_by_id = async (id) => {
  try {
    const get_lesson = await lesson_model
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
      })
      .sort({
        createdAt: -1, // Sắp xếp theo `createdAt` giảm dần
      });
    return get_lesson;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create_new_lesson,
  get_lesson_by_id,
};
