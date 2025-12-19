"use strict";
const { faker } = require("@faker-js/faker");

const MAX_ROOM_ID = 15;
const MAX_USER_ID = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [];
    for (let i = 0; i < 30; i++) {
      reviews.push({
        user_id: faker.number.int({ min: 1, max: MAX_USER_ID }),
        room_id: faker.number.int({ min: 1, max: MAX_ROOM_ID }),
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        rating: faker.number.float({ min: 2, max: 5, precision: 0.01 }),
        is_edited: faker.datatype.boolean(),
        created_at: faker.date.past(),
        updated_at: new Date(),
        deleted_at: faker.datatype.boolean() ? null : null,
      });
    }
    await queryInterface.bulkInsert("reviews", reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
