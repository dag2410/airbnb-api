"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const messages = [];
    for (let i = 0; i < 50; i++) {
      messages.push({
        type: faker.helpers.arrayElement(["text", "image", "system"]),
        content: faker.lorem.sentence(),
        user_id: faker.number.int({ min: 1, max: 10 }),
        conversation_id: faker.number.int({
          min: 1,
          max: 5,
        }),
        read_at: faker.datatype.boolean() ? faker.date.recent() : null,
        created_at: faker.date.past(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }
    await queryInterface.bulkInsert("messages", messages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
