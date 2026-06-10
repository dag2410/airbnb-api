const pusher = require("@/configs/pusher");
const { Wishlist, Room, User, RoomImage } = require("@/models");
const { districts } = require("vietnam-provinces");

class WishlistService {
  async getUserWishlist(userId, page = 1, limit = 10) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const offsetNum = (pageNum - 1) * limitNum;

    const { rows, count } = await Wishlist.findAndCountAll({
      distinct: true,

      where: {
        user_id: userId,
      },
      limit: limitNum,
      offset: offsetNum,
      include: [
        {
          model: Room,
          as: "room",
          required: true,
          include: [
            {
              model: User,
              as: "host",
              required: true,
            },
            {
              model: RoomImage,
              as: "images",
              required: true,
            },
          ],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    return {
      rows,
      pagination: {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPage: Math.ceil(count / limitNum),
      },
    };
  }

  async toggleLike(userId, roomId) {
    const existsRoom = await Room.findByPk(roomId);
    if (!existsRoom) throw new Error("Phòng không tồn tại.");

    const [wishlist, created] = await Wishlist.findOrCreate({
      where: { user_id: userId, room_id: roomId },
    });

    if (!created) {
      await wishlist.destroy();

      // pusher.trigger(`user-wishlist-${userId}`, "wishlist-updated", {
      //   roomId: roomId,
      //   action: "unlike",
      // });

      return { like: false, message: "Đã bỏ yêu thích." };
    }

    // pusher.trigger(`user-wishlist-${userId}`, "wishlist-updated", {
    //   roomId: roomId,
    //   action: "like",
    //   roomData: existsRoom,
    // });

    return { like: true, message: "Đã thêm vào yêu thích." };
  }

  async clearWishlist(userId) {
    return await Wishlist.destroy({
      where: { user_id: userId },
    });
  }
}

module.exports = new WishlistService();
