const { hash } = require("bcrypt");
const { Op } = require("sequelize");
const { User, Role } = require("@/models");
const { parsePagination, buildPaginationMeta } = require("@/utils/pagination");

const includes = [{ model: Role, as: "role", attributes: ["id", "name"] }];

class AdminUserService {
  async paginate(filters = {}) {
    const { page, limit, offset } = parsePagination(filters);
    const where = {};

    if (filters.search) {
      const term = `%${String(filters.search).trim()}%`;
      where[Op.or] = [
        { email: { [Op.like]: term } },
        { username: { [Op.like]: term } },
        { first_name: { [Op.like]: term } },
        { last_name: { [Op.like]: term } },
      ];
    }
    if (filters.role_id) where.role_id = filters.role_id;

    const { rows, count } = await User.findAndCountAll({
      where,
      include: includes,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      distinct: true,
    });

    return {
      data: rows,
      pagination: buildPaginationMeta({ total: count, page, limit }),
      filters,
    };
  }

  async getById(id) {
    return User.findByPk(id, { include: includes });
  }

  async listRoles() {
    return Role.findAll({ order: [["id", "ASC"]] });
  }

  async create(data) {
    const payload = { ...data };
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }
    return User.create(payload);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const payload = { ...data };
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    } else {
      delete payload.password;
    }

    await user.update(payload);
    return this.getById(id);
  }

  async remove(id) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async getByEmail(email) {
    return User.findOne({ where: { email } });
  }
}

module.exports = new AdminUserService();
