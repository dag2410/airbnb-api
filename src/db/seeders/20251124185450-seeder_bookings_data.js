"use strict";
const { faker } = require("@faker-js/faker");

const MAX_ROOM_ID = 15;
const MAX_USER_ID = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [];
    for (let i = 0; i < 30; i++) {
      const checkIn = faker.date.soon({ days: 30 });
      const checkOut = faker.date.soon({ days: 5, refDate: checkIn });

      bookings.push({
        user_id: faker.number.int({ min: 1, max: MAX_USER_ID }),
        room_id: faker.number.int({ min: 1, max: MAX_ROOM_ID }),
        check_in_date: checkIn,
        check_out_date: checkOut,
        total_guests: faker.number.int({ min: 1, max: 5 }),
        total_price: faker.number.float({
          min: 500000,
          max: 5000000,
          fractionDigits: 2,
        }),
        payment_method: faker.helpers.arrayElement(["momo", "stripe"]),
        payment_status: faker.helpers.arrayElement([
          "pending",
          "success",
          "failed",
        ]),
        // Logic mới: Trạng thái chuyến đi
        status: faker.helpers.arrayElement([
          "pending",
          "confirmed",
          "staying",
          "completed",
          "cancelled",
        ]),
        is_reviewed: false, // Mặc định là false để Seeder Review bên dưới xử lý
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("bookings", bookings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
