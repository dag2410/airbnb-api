"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userNotifications = [];
    for (let i = 0; i < 9; i++) {
      userNotifications.push({
        user_id: faker.number.int({ min: 1, max: 9 }),
        notification_id: faker.number.int({
          min: 1,
          max: 9,
        }),
        read_at: faker.datatype.boolean() ? faker.date.recent() : null,
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("user_notification", userNotifications);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_notification", null, {});
  },
};
