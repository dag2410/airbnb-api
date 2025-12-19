"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roomImages = [];
    for (let i = 0; i < 40; i++) {
      roomImages.push({
        room_id: faker.number.int({ min: 1, max: 15 }),
        url: faker.image.urlPicsumPhotos({ width: 1280, height: 960 }),
        display_order: faker.number.int({ min: 0, max: 6 }),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("room_images", roomImages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("room_images", null, {});
  },
};
