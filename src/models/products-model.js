const mongoose = require("mongoose"); // Erase if already required
const { default: slugify } = require("slugify");
var productsSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
    },
    product_description: { type: String },
    product_image: {
      type: Array,
      default: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePykPxV7hbiMoufhNrCVlkEh94nvJQIMDeA&s"],
    },
    product_slug: { type: String },
    product_stock: {
      type: mongoose.Types.ObjectId,
      ref: "Inventories",
    },
    product_status: {
      type: Number,
      default: 0,
    },
    product_category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    product_sub_category: {
      type: mongoose.Types.ObjectId,
      ref: "Sub_categories",
    },
    product_technical_specification: {
      type: mongoose.Schema.Types.Mixed,
    },
    product_rating: [
      {
        type: mongoose.Schema.Types.Mixed,
        ref: "Ratings",
        default: null,
      },
    ],
    product_comment: [
      {
        type: mongoose.Schema.Types.Mixed,
        ref: "Comments",
        default: null,
      },

    ],
    pruduct_warranty:{
        type:String
    },
    product_manufacter:{
        type:String
    },
    product_price:{
         type:Number,
         default:0
    },
    isSale:{
      type:String
    }
  },
  {
    collection: "Products",
    timestamps: true,
  }
);
/////document run bf
productsSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

module.exports=mongoose.model('Products',productsSchema)
