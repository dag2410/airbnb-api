const { compare } = require("bcrypt");
const { User, Role } = require("@/models");
const { ADMIN_ROLE_ID } = require("@/constants/roles");

class AdminAuthService {
  /**
   * Admin login: bcrypt + role_id = admin.
   */
  async login(email, password) {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
    });

    if (!user || !user.password) {
      throw new Error("Email hoặc mật khẩu không đúng.");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Email hoặc mật khẩu không đúng.");
    }

    if (user.role_id !== ADMIN_ROLE_ID) {
      throw new Error("Bạn không có quyền truy cập khu vực quản trị.");
    }

    await user.update({ last_login: new Date() });

    return user;
  }
}

module.exports = new AdminAuthService();
