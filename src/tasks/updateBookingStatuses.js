const { Booking } = require("@/models");
const { Op } = require("sequelize");

async function updateBookingStatuses() {
  const now = new Date();
  // check in
  const [stayingUpdated] = await Booking.update(
    { status: "staying" },
    {
      where: {
        status: "confirmed",
        check_in_date: {
          [Op.lte]: now,
        },
      },
    },
  );
  console.log(`[CRON] Updated ${stayingUpdated} bookings to staying`);

  // check out
  const [completedUpdated] = await Booking.update(
    { status: "completed" },
    {
      where: {
        status: "staying",
        check_out_date: {
          [Op.lte]: now,
        },
      },
    },
  );

  console.log(`[CRON] Updated ${completedUpdated} bookings to completed`);
}

module.exports = updateBookingStatuses;
