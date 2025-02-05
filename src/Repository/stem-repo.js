const { BadRequestError, InternalError } = require("../core/error.response");
const stem_model = require("../models/stem-model");
const course_model=require("../models/course-model")

const create_new_stem = async (data) => {
  try {
    const existStemName = await stem_model.findOne({ stem_name: data?.stem_name });
    console.log(existStemName, 'exis');

    if (existStemName) {
      // Ném lỗi khi tên sản phẩm đã tồn tại
      throw new BadRequestError('Tên tồn tại', 409); // Ném lỗi để middleware xử lý
    }

    const newStem = await stem_model.create(data);
    console.log(newStem, 'new stem');

    return newStem;
  } catch (error) {
    // Ném lỗi khi có vấn đề khác
    throw new BadRequestError(error.message, 400); // Ném lỗi để middleware xử lý
  }
};

const find_all_stems = async ({ limit, skip }) => {
  return await stem_model.find().select("stem_name stem_description stock stem_price thumb_image stem_slug").skip(skip).limit(limit).lean().exec();
};

const updateStem = async (id,payload) => {
  return await stem_model.findByIdAndUpdate(id, payload,{new:true});
};

const deleteStem = async (payload) => {
   await course_model.findOneAndDelete({
    stem_id:payload
   })
  
  return await stem_model.findByIdAndDelete(payload);
};
const find_stem_by_id=async(id)=>{
  return await stem_model.findById(id).populate("stem_category")
}

module.exports = {
  create_new_stem,
  find_all_stems,
  updateStem,
  deleteStem,
  find_stem_by_id
};
