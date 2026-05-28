const { Booking, Payment } = require("@/models");
const { Op } = require("sequelize");

// hàm này để loại bỏ các booking pending đã hết hạn thanh toán
async function expirePendingBookings() {
  const now = new Date();

  const expiredBookings = await Booking.findAll({
    where: {
      status: "pending",
      expired_at: {
        [Op.lt]: now,
      },
    },
    attributes: ["id"],
  });

  const bookingIds = expiredBookings.map((b) => b.id);

  if (bookingIds.length === 0) {
    console.log("[CRON] No expired bookings");
    return;
  }

  await Booking.update(
    {
      status: "cancelled",
      cancelled_at: now,
    },
    {
      where: {
        id: {
          [Op.in]: bookingIds,
        },
      },
    },
  );

  await Payment.update(
    { status: "expired" },
    {
      where: {
        booking_id: {
          [Op.in]: bookingIds,
        },
        status: "pending",
      },
    },
  );

  console.log(`[CRON] Expired ${bookingIds.length} bookings`);
}

module.exports = expirePendingBookings;
