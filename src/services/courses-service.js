const asyncHandler = require("express-async-handler");

const {
  create_new_course,
  find_all_courses,
  get_course_cate,
  update_course_by_id,
  get_user_course,
  get_course_detail,
  delete_course,
} = require("../Repository/course-repo");

class CourseService {
  static create_course = asyncHandler(async (payload) => {
    return await create_new_course(payload);
  });
  static get_all_courses = asyncHandler(async () => {
    const res = await find_all_courses();

    return res;
  });

  static get_course_categories = asyncHandler(async () => {
    const res = await get_course_cate();
    return res;
  });

  static update_course = asyncHandler(async (payload, id) => {
    const res = await update_course_by_id(payload, id);
    return res;
  });

  static get_all_user_courses = asyncHandler(async (payload) => {
    return await get_user_course(payload);
  });

  static get_course_by_id = asyncHandler(async (id) => {
    return await get_course_detail(id);
  });
  static delete_specific_course = asyncHandler(async (id) => {
    return await delete_course(id);
  });
}

module.exports = CourseService;
