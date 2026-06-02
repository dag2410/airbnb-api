const { Op } = require("sequelize");
const { Room, User } = require("@/models");
const generateUniqueSlug = require("@/utils/generateUniqueSlug");
const { parsePagination, buildPaginationMeta } = require("@/utils/pagination");

class AdminRoomService {
  async paginate(filters = {}) {
    const { page, limit, offset } = parsePagination(filters);
    const where = {};

    if (filters.search) {
      where.title = { [Op.like]: `%${String(filters.search).trim()}%` };
    }

    const { rows, count } = await Room.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "host",
          attributes: ["id", "email", "first_name", "last_name"],
        },
      ],
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
    return Room.findByPk(id, {
      include: [
        {
          model: User,
          as: "host",
          attributes: ["id", "email", "first_name", "last_name"],
        },
      ],
    });
  }

  async create(data) {
    const slug = data.slug || (await generateUniqueSlug(data.title));
    return Room.create({ ...data, slug });
  }

  async update(id, data) {
    const room = await Room.findByPk(id);
    if (!room) return null;
    await room.update(data);
    return room;
  }

  async remove(id) {
    const room = await Room.findByPk(id);
    if (!room) return false;
    await room.destroy();
    return true;
  }
}

module.exports = new AdminRoomService();
