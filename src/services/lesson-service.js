const asyncHandler = require("express-async-handler");
const { create_new_lesson, get_lesson_by_id } = require("../Repository/lesson-repo");

class LessonService {
  static create_lesson = asyncHandler(async (payload, course_id) => {
    return await create_new_lesson(payload, course_id);
  });
  static get_lesson=asyncHandler(async(id)=>{
    return await get_lesson_by_id(id)
  })
}

module.exports = LessonService;
