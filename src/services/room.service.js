const { Op, fn, col, literal, where } = require("sequelize");
const { Room, Wishlist, User } = require("@/models");
const { default: slugify } = require("slugify");
const generateUniqueSLug = require("@/utils/generateUniqueSlug");

class RoomService {
  async getAll({ limit = 20, offset = 0 }) {
    return await Room.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
  }

  async getBySlug(slug) {
    return await Room.findOne({
      where: { slug },
    });
  }

  async createRoom(data, userId) {
    await User.update({ role_id: 2 }, { where: { id: userId, role_id: 3 } });
    return await Room.create({
      ...data,
      user_id: userId,
      slug: await generateUniqueSLug(data.title),
      published_at: new Date(),
    });
  }

  async updateRoom(slug, data, userId) {
    const room = await Room.findOne({ where: { slug } });

    if (!room) return null;

    // chỉ host sở hữu mới sửa được
    if (room.user_id !== userId) {
      throw new Error("FORBIDDEN");
    }

    await room.update(data);
    return room;
  }

  async deleteRoom(slug, userId) {
    const room = await Room.findOne({ where: { slug } });

    if (!room) return null;

    await room.destroy();
    return true;
  }

  async getLatest(limit = 10) {
    return await Room.findAll({
      order: [["createdAt", "DESC"]],
      limit: limit,
    });
  }

  async getTrending(limit = 10) {
    return await Room.findAll({
      attributes: {
        include: [
          [
            literal(`(
            SELECT COUNT(*)
            FROM wishlists AS wishlist
            WHERE wishlist.room_id = Room.id
          )`),
            "wishlist_count",
          ],
        ],
      },
      order: [[literal("wishlist_count"), "DESC"]],
      limit: limit,
    });
  }

  async getTopRated(limit = 10) {
    return await Room.findAll({
      where: {
        rating: { [Op.gte]: 4.5 },
      },
      order: [["rating", "DESC"]],
      limit,
    });
  }
}

module.exports = new RoomService();
