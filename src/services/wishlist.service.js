const pusher = require("@/configs/pusher");
const { Wishlist, Room, User } = require("@/models");

class WishlistService {
  async getUserWishlist(userId) {
    const wishlists = await Wishlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Room,
          as: "room",
          include: [
            {
              model: User,
              as: "host",
            },
          ],
        },
      ],
    });

    return wishlists;
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
