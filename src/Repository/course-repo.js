const { BadRequestError } = require("../core/error.response");

const mongoose = require("mongoose");

const course_model = require("../models/course-model");

const stem_model = require("../models/stem-model");

const enroll_model = require("../models/enroll_course-model");

const lesson_model = require("../models/lesson-model");

const create_new_course = async (payload) => {
  try {
    const isExistCourse = await course_model.findOne({
      stem_id: payload.stem_id,
    });

    if (isExistCourse) {
      throw BadRequestError("Đã có khoa học cho sản phẩm này");
    }

    const newCourses = await course_model.create(payload);
    return newCourses;
  } catch (error) {
    throw BadRequestError(error.message, 409);
  }
};
const find_all_courses = async () => {
  try {
    const list_course = await course_model
      .find()
      .populate("stem_id", "stem_name")
      .select("title description stem_id")
      .lean();
    const list = list_course.map((item) => ({
      ...item,
      stem_id: item.stem_id.stem_name,
    }));

    return list;
  } catch (error) {
    throw BadRequestError(error.message, 409);
  }
};

const get_course_cate = async () => {
  try {
    const list_course = await course_model
      .find()
      .select("stem_id")
      .lean()
      .exec();

    // Tạo một mảng các stem_id trong các Courses
    const existingStemIds = list_course.flatMap((course) =>
      course.stem_id.toString()
    );
    // Tạo một mảng các stem_id trong các Courses
    const stem_list = await stem_model.find().select("_id stem_name").exec();

    console.log("stemlist", existingStemIds);
    // Tìm các stem_id trong Stems chưa tồn tại trong Courses
    const missingStems = stem_list.filter(
      (stem) => !existingStemIds.includes(stem._id.toString())
    );
    return missingStems;
  } catch (error) {
    console.log(error, "error");
    throw new BadRequestError();
  }
};

const update_course_by_id = async (payload, id) => {
  try {
    // Check if lesson_id is an array and not empty
    if (Array.isArray(payload?.lesson_id) && payload?.lesson_id.length > 0) {
      // Find new lessons that don't have an _id (not yet created)
      const newLessons = payload.lesson_id.filter((item) => !item._id);

      if (newLessons.length > 0) {
        // Create new lessons
        const createdLessons = await Promise.all(
          newLessons.map(async (item) => {
            const newLesson = await lesson_model.create(item);
            return newLesson;
          })
        );

        // Update payload.lesson_id with the newly created lesson IDs
        payload.lesson_id = payload.lesson_id.map((lesson) =>
          lesson._id
            ? lesson._id
            : createdLessons.find((created) => created.title === lesson.title)
                ._id
        );
      }
    }

    // Update the course with the modified payload
    const updatedCourse = await course_model.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
};
const get_course_detail = async (id) => {
  const res = await course_model
    .findById(id)
    .populate("lesson_id")
    .populate("stem_id");
  return res;
};

//// get user course
const get_user_course = async (payload) => {
  const course = await enroll_model
    .find({
      user_id: new mongoose.Types.ObjectId(payload),
    })
    .populate({
      path: "course_id",
      populate: {
        path: "lesson_id",
      },
      populate: {
        path: "stem_id",
      },
    });

  return course;
};

const delete_course = async (id) => {
  try {
    const del_course = await course_model.findByIdAndDelete(id);
    if (del_course) {
      await lesson_model.deleteMany({
        course_id: del_course._id,
      });
      await enroll_model.deleteMany({
        course_id: del_course._id,
      });
    }
    return del_course;
  } catch (error) {
    throw new BadRequestError("Not exist", 404);
  }
};
module.exports = {
  create_new_course,
  find_all_courses,
  get_course_cate,
  update_course_by_id,
  get_user_course,
  get_course_detail,
  delete_course,
};
