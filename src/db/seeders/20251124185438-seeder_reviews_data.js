"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Lấy ra những booking có status là 'completed' để làm review
    const [completedBookings] = await queryInterface.sequelize.query(
      `SELECT id, user_id, room_id FROM bookings WHERE status = 'completed'`
    );

    if (!completedBookings || completedBookings.length === 0) {
      console.log("No completed bookings found to seed reviews.");
      return;
    }

    const reviews = [];
    const reviewedBookingIds = [];

    completedBookings.forEach((booking) => {
      // Mỗi booking hoàn thành, ta tạo 1 đánh giá của khách
      reviews.push({
        user_id: booking.user_id,
        room_id: booking.room_id,
        booking_id: booking.id,
        parent_id: null, // Review gốc
        content: faker.lorem.paragraph({ min: 1, max: 2 }),
        rating: faker.number.int({ min: 1, max: 5 }),
        is_edited: false,
        created_at: faker.date.recent(),
        updated_at: new Date(),
      });

      reviewedBookingIds.push(booking.id);
    });

    if (reviews.length > 0) {
      await queryInterface.bulkInsert("reviews", reviews);

      // 2. Cập nhật is_reviewed = true trong bảng bookings để đồng bộ dữ liệu
      await queryInterface.sequelize.query(
        `UPDATE bookings SET is_reviewed = true WHERE id IN (${reviewedBookingIds.join(
          ","
        )})`
      );

      console.log(
        `Successfully seeded ${reviews.length} reviews and updated bookings.`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
