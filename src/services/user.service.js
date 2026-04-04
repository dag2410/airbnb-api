const { User } = require("@/models");

class UserService {
  async getAll() {
    return await User.findAll();
  }

  async getById(id) {
    return await User.findByPk(id);
  }

  // async create(data) {
  //   const user = await User.create(data);
  //   return user;
  // }

  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    await user.destroy();
  }
}

module.exports = new UserService();
