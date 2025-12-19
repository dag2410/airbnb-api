"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const wishlists = [];
    for (let i = 0; i < 10; i++) {
      wishlists.push({
        room_id: faker.number.int({ min: 1, max: 14 }),
        user_id: faker.number.int({ min: 1, max: 9 }),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("wishlists", wishlists);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wishlists", null, {});
  },
};
