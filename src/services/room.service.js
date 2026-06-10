const { Op, fn, col, literal, where } = require("sequelize");
const { Room, RoomImage, Review, User, Booking } = require("@/models");
const { default: slugify } = require("slugify");
const generateUniqueSLug = require("@/utils/generateUniqueSlug");

class RoomService {
  async getAll() {
    const [latestRooms, topRatedRooms, hanoiRooms, ninhbinhRooms, budgetRooms] =
      await Promise.all([
        Room.findAll({
          order: [["created_at", "DESC"]],
          limit: 10,
          include: [
            {
              model: RoomImage,
              as: "images",
            },
          ],
        }),

        Room.findAll({
          order: [["rating", "DESC"]],
          limit: 10,
          include: [
            {
              model: RoomImage,
              as: "images",
            },
          ],
        }),

        Room.findAll({
          where: {
            room_city: "Hà Nội",
          },
          limit: 10,
          include: [
            {
              model: RoomImage,
              as: "images",
            },
          ],
        }),

        Room.findAll({
          where: {
            room_city: "Ninh Bình",
          },
          limit: 10,
          include: [
            {
              model: RoomImage,
              as: "images",
            },
          ],
        }),

        Room.findAll({
          order: [["price_per_night", "ASC"]],

          limit: 10,
          include: [
            {
              model: RoomImage,
              as: "images",
            },
          ],
        }),
      ]);

    return {
      latestRooms,
      topRatedRooms,
      hanoiRooms,
      ninhbinhRooms,
      budgetRooms,
    };
  }

  async getRoomsByHost(userId, page = 1, limit = 10) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const offset = (page - 1) * limit;

    const { rows, count } = await Room.findAndCountAll({
      where: {
        user_id: userId,
      },
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    return {
      rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getBySlug(slug) {
    return await Room.findOne({
      where: { slug },
      include: {
        model: Review,
        as: "reviews",
      },
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
    const room = await Room.findOne({ where: { slug, user_id: userId } });

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

  async getBookedDates(slug) {
    const room = await Room.findOne({
      where: {
        slug: slug,
      },
    });
    const booking = await Booking.findAll({
      where: {
        room_id: room.id,
        [Op.or]: [
          {
            status: "pending",
            expired_at: {
              [Op.gt]: new Date(),
            },
          },
          {
            status: {
              [Op.in]: ["confirmed", "staying"],
            },
          },
        ],
      },
      attributes: ["check_in_date", "check_out_date"],
    });

    const bookingDateFormat = booking.map((b) => ({
      check_in_date: b.check_in_date.toISOString().split("T")[0],
      check_out_date: b.check_out_date.toISOString().split("T")[0],
    }));

    return bookingDateFormat;
  }
}

module.exports = new RoomService();
