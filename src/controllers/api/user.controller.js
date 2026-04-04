const usersService = require("@/services/user.service");
const { success, error } = require("@/utils/response");

exports.index = async (req, res) => {
  try {
    const users = await usersService.getAll();
    success(res, 200, users);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.show = async (req, res) => {
  try {
    success(res, 200, req.user);
  } catch (err) {
    error(res, 500, err.message);
  }
};

// exports.create = async (req, res) => {
//   const user = await usersService.create(req.body);
//   success(res, 201, user);
// };

exports.update = async (req, res) => {
  try {
    const user = await usersService.updateUser(req.user.id, req.body);
    success(res, 200, user);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await usersService.deleteUser(req.user.id);
    success(res, 200, "Xóa người dùng thành công.");
  } catch (err) {
    error(res, 500, "Xóa người dùng thất bại.");
  }
};
