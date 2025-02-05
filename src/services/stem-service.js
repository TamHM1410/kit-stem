const asyncHandler = require("express-async-handler");
const {
  create_new_stem,
  find_all_stems,
  updateStem,
  deleteStem,
  find_stem_by_id

} = require("../Repository/stem-repo");

class StemService {
  static createNewStem = asyncHandler(async (data) => {
    return await create_new_stem(data);
  });
  static get_stem = asyncHandler(async ({ limit = 50, skip = 0 }) => {
    return await find_all_stems({ limit, skip });
  });
  static update_stem = asyncHandler(async (id,payload) => {
    return await updateStem(id,payload);
  });
  static delete_stem = asyncHandler(async (payload) => {
    return await deleteStem(payload);
  });
  static findStemById=asyncHandler(async(payload)=>{
    return await   find_stem_by_id(payload)
  })
}

module.exports = StemService;
