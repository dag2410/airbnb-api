const { User } = require("@/models");
const { compare, hash } = require("bcrypt");

class SettingService {
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    return { message: "Password updated successfully" };
  }

  async toggleTwoFactor(userId, enabled) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.two_factor_enabled = enabled ? true : false;
    await user.save();

    return {
      message: "Two-factor authentication updated",
    };
  }
}

module.exports = new SettingService();
