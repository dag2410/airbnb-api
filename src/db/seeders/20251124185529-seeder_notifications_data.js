"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notifications = [];
    for (let i = 0; i < 15; i++) {
      notifications.push({
        notifiable_type: faker.helpers.arrayElement([
          "room",
          "booking",
          "review",
          "system",
          "wishlist",
        ]),
        notifiable_id: faker.number.int({ min: 1, max: 15 }),
        content: faker.lorem.sentence(),
        created_at: faker.date.past(),
        updated_at: new Date(),
        deleted_at: faker.datatype.boolean() ? null : null,
      });
    }
    await queryInterface.bulkInsert("notifications", notifications);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
