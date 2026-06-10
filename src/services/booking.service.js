const { Booking, Room, RoomImage, sequelize } = require("@/models");
const { Op } = require("sequelize");

class BookingService {
  async getAll(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { rows, count } = await Booking.findAndCountAll({
      where: {
        user_id: userId,
      },
      distinct: true,
      limit,
      offset,
      include: [
        {
          model: Room,
          as: "room",
          include: [
            {
              model: RoomImage,
              as: "images",
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return {
      rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPage: Math.ceil(count / limit),
      },
    };
  }

  async getById(id) {
    return await Booking.findByPk(id);
  }

  async createBooking(
    userId,
    roomId,
    checkIn,
    checkOut,
    totalGuests,
    totalPrice,
    isReviewed,
  ) {
    return await sequelize.transaction(async (t) => {
      const now = new Date();
      const room = await Room.findByPk(roomId, { transaction: t });

      if (room.user_id === userId) {
        throw new Error("Không thể đặt phòng của chính mình!");
      }

      if (new Date(checkIn) >= new Date(checkOut)) {
        throw new Error("Khoảng ngày check in và check out không hợp lệ!");
      }

      if (new Date(checkIn) < now)
        throw new Error("Không thể đặt ngày trong quá khứ!");

      const existing = await Booking.findOne({
        where: {
          user_id: userId,
          room_id: roomId,
          status: "pending" || "confirmed" || "staying",
          expired_at: {
            [Op.gt]: now,
          },
          check_in_date: checkIn,
          check_out_date: checkOut,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (existing) return existing;

      // check xem phòng đã được đặt
      const conflict = await Booking.findOne({
        where: {
          room_id: roomId,
          [Op.and]: [
            {
              [Op.or]: [
                {
                  status: "pending",
                  expired_at: {
                    [Op.gt]: now,
                  },
                },

                {
                  status: {
                    [Op.in]: ["confirmed", "staying"],
                  },
                },
              ],
            },
            {
              check_in_date: {
                [Op.lt]: checkOut,
              },
            },
            {
              check_out_date: {
                [Op.gt]: checkIn,
              },
            },
          ],
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      // check xem có booking nào trùng với khoảng thời gian đặt gần nhất
      const userConflict = await Booking.findOne({
        where: {
          user_id: userId,

          [Op.and]: [
            {
              [Op.or]: [
                {
                  status: "pending",
                  expired_at: {
                    [Op.gt]: now,
                  },
                },
                {
                  status: {
                    [Op.in]: ["confirmed", "staying"],
                  },
                },
              ],
            },

            {
              check_in_date: {
                [Op.lt]: checkOut,
              },
            },
            {
              check_out_date: {
                [Op.gt]: checkIn,
              },
            },
          ],
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (conflict)
        throw new Error(
          "Phòng này được đặt trong khoảng thời gian này không hợp lệ!",
        );

      if (userConflict) {
        throw new Error("Bạn đã có booking trong khoảng thời gian này!");
      }

      // expired_at được đặt 15p sau khi không tạo thanh toán sẽ cancelled
      const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
      // format lại checkIn, checkOut để không bị bug timezone
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const booking = await Booking.create(
        {
          user_id: userId,
          room_id: roomId,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          total_guests: totalGuests,
          total_price: totalPrice,
          is_reviewed: isReviewed,
          status: "pending",
          expired_at: expiresAt,
        },
        { transaction: t },
      );

      return booking;
    });
  }

  async cancelBooking({ bookingId, userId }) {
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        user_id: userId,
      },
    });

    if (!booking) throw new Error("Booking không tồn tại!");

    if (booking.status !== "pending")
      throw new Error("Chỉ được hủy booking đang chờ thanh toán!");

    if (booking.expired_at < new Date()) throw new Error("Booking đã hết hạn!");

    await Booking.update(
      {
        status: "cancelled",
        cancelled_at: new Date(),
      },
      {
        where: {
          status: "pending",
          expired_at: {
            [Op.gt]: new Date(),
          },
        },
      },
    );
  }

  async checkAvailability({ roomId, checkIn, checkOut }) {
    const now = new Date();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const conflict = await Booking.findOne({
      where: {
        room_id: roomId,

        [Op.and]: [
          {
            [Op.or]: [
              {
                status: "pending",
                expired_at: {
                  [Op.gt]: now,
                },
              },
              {
                status: {
                  [Op.in]: ["confirmed", "staying"],
                },
              },
            ],
          },
          {
            check_in_date: {
              [Op.lt]: checkOutDate,
            },
          },
          {
            check_out_date: {
              [Op.gt]: checkInDate,
            },
          },
        ],
      },
    });

    return {
      available: !conflict,
    };
  }
}

module.exports = new BookingService();
