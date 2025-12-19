const { User } = require("@/models");
const { error } = require("@/utils/response");
const jwtService = require("@/services/jwt.service");

async function checkAuth(req, res, next) {
  try {
    const token = req?.headers?.authorization?.replace("Bearer ", "");
    if (!token) error(res, 401, "Token không được cung cấp.");
    const payload = jwtService.verifyAccessToken(token);
    const user = await User.findByPk(payload.userId);
    if (!user) error(res, 401, "User không tồn tại.");
    req.user = user;
    next();
  } catch (err) {
    error(res, 401, "Token không hợp lệ hoặc hết hạn sử dụng.");
  }
}

module.exports = checkAuth;
