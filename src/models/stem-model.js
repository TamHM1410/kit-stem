const mongoose = require("mongoose"); // Erase if already required
const { default: slugify } = require("slugify");

var stemSchema = new mongoose.Schema(
  {
    stem_name: {
      type: String,
      unique: true,  // Đảm bảo giá trị stem_name là duy nhất
    },
    stem_description: { type: String },
    stem_image: {
      type: Array,
      default: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePykPxV7hbiMoufhNrCVlkEh94nvJQIMDeA&s",
      ],
    },
    stem_slug: { type: String },
    stock: {
      type: Number,
      default: 100,
    },
    status: {
      type: Number,
      default: 0,
    },
    stem_category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    stem_price: {
      type: Number,
      default: 0,
    },
    thumb_image: {
      type: String,
      default:
        "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
    },
  },
  {
    collection: "Stems",
    timestamps: true,
  }
);

// Chạy slugify trong pre-save hook
stemSchema.pre("save", function (next) {
  if (this.stem_name) {
    this.stem_slug = slugify(this.stem_name, { lower: true });
  } else {
    // Nếu stem_name không có giá trị, tạo slug mặc định hoặc giữ nguyên
    this.stem_slug = slugify('default', { lower: true });
  }
  next();
});

module.exports = mongoose.model("Stems", stemSchema);
