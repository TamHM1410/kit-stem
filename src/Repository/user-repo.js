const user = require("../models/user-model");

const getAllUser = async ({ limit, skip, sort, query }) => {
  if (query) {
    const res = await user
      .find({
        role: query.toUpperCase(),
      })
      .select("name role email phoneNumber ")
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    return res;
  }
  const res = await user
    .find()
    .select("name role email phoneNumber ")
    .limit(limit)
    .skip(skip)
    .lean()
    .exec();
  return res;
};
const findUserById = async (id) => {
  console.log(id);
  return await user.findById(id);
};
const updateUserById = async (id, data) => {
  return user.findByIdAndUpdate(id, data, { new: true });
};


module.exports = {
  getAllUser,
  findUserById,
  updateUserById,
};
