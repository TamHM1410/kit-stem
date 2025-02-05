const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    lesson_id: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Lessons" }],
      default: [],
    },

    description: {
      type: String,
      default: null,
    },
    stem_id: {
      type: mongoose.Types.ObjectId,
      ref: "Stems",
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "Courses",
  }
);

module.exports = mongoose.model("Courses", courseSchema);
