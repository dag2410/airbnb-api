"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const conversations = [];
    for (let i = 0; i < 15; i++) {
      conversations.push({
        room_id: faker.number.int({ min: 1, max: 15 }),
        created_at: faker.date.past(),
        updated_at: new Date(),
        last_message_at: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert("conversations", conversations);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conversations", null, {});
  },
};
