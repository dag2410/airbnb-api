const usersModel = require("@/models/users.model");
class UsersService {
  async getAll() {
    const users = await usersModel.findAll();
    return users;
  }

  async getById(id) {
    const user = await usersModel.findById(id);
    return user;
  }

  async getByEmailAndPassword(email, password) {
    const user = await usersModel.findByEmailAndPassword(email, password);
    return user;
  }
  async getCountNewUser() {
    const count = await usersModel.countNewUser();
    return count;
  }

  async getByEmail(email) {
    const user = await usersModel.findByEmail(email);
    return user;
  }

  async create(data) {
    const user = await usersModel.create(data);
    return user;
  }

  async update(id, data) {
    const user = await usersModel.update(id, data);
    return user;
  }

  async remove(id) {
    const user = await usersModel.remove(id);
    return user;
  }
  async count() {
    const total = await usersModel.count();
    return total;
  }
}

module.exports = new UsersService();
