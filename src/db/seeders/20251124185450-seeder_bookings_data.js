"use strict";
const { faker } = require("@faker-js/faker");

const MAX_ROOM_ID = 15;
const MAX_USER_ID = 10;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [];
    for (let i = 0; i < 25; i++) {
      const checkIn = faker.date.soon({ days: 30 });
      const checkOut = faker.date.soon({ days: 30, refDate: checkIn });
      bookings.push({
        user_id: faker.number.int({ min: 1, max: MAX_USER_ID }),
        room_id: faker.number.int({ min: 1, max: MAX_ROOM_ID }),
        check_in_date: checkIn,
        check_out_date: checkOut,
        total_guests: faker.number.int({ min: 1, max: 6 }),
        total_price: faker.number.float({
          min: 600000,
          max: 8000000,
          precision: 0.01,
        }),
        payment_method: faker.helpers.arrayElement(["momo", "stripe"]),
        payment_status: faker.helpers.arrayElement([
          "pending",
          "success",
          "failed",
          "rejected",
        ]),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("bookings", bookings);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("bookings", null, {});
  },
};
