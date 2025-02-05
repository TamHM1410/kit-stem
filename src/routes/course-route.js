const express = require("express");
const courseController = require("../controllers/course-controller");

const { checkLogin } = require("../middlewares/check-login");

const courseRouter = express.Router();

courseRouter.get("/courses", courseController.get_courses);

courseRouter.get("/courses/products", courseController.get_course_cate);

courseRouter.get("/courses/:id", courseController.get_course_detail);

courseRouter.post("/courses", courseController.create_new_course);

courseRouter.patch("/courses/:id", courseController.update);

courseRouter.delete("/courses/:id", courseController.delete_course);



courseRouter.get(
  "/users/courses/robe",
  checkLogin,
  courseController.get_users_courses
);

module.exports = courseRouter;
