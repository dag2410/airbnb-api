"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const conversationParticipants = [];
    for (let i = 0; i < 10; i++) {
      conversationParticipants.push({
        user_id: faker.number.int({ min: 1, max: 10 }),
        conversation_id: faker.number.int({
          min: 1,
          max: 10,
        }),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert(
      "conversation_participant",
      conversationParticipants
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conversation_participant", null, {});
  },
};
