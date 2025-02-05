const { Success } = require("../core/success.response");
const course_service = require("../services/courses-service");
const asyncHandler = require("express-async-handler");

class CourseController {
  static create_new_course = asyncHandler(async (req, res) => {
    new Success(
      "Tạo khóa học thành công",
      await course_service.create_course(req.body)
    ).send(res);
  });

  static get_courses = asyncHandler(async (req, res) => {
    new Success("ok", await course_service.get_all_courses()).send(res);
  });

  static get_course_cate = asyncHandler(async (req, res) => {
    console.log("missing");

    new Success("ok", await course_service.get_course_categories()).send(res);
  });

  static update = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success(
      "Cập nhật thành công",
      await course_service.update_course(req.body, id)
    ).send(res);
  });

  static get_users_courses = asyncHandler(async (req, res) => {
    let user_id = req.user;

    new Success("ok", await course_service.get_all_user_courses(user_id)).send(
      res
    );
  });
  static get_course_detail = asyncHandler(async (req, res) => {
    let id = req.params.id;
    new Success("ok", await course_service.get_course_by_id(id)).send(res);
  });

  static delete_course = asyncHandler(async (req, res) => {
    let id = req.params.id;

    new Success("ok", await course_service.delete_specific_course(id)).send(
      res
    );
  });
}

module.exports = CourseController;
