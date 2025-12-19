"use strict";

const { faker } = require("@faker-js/faker");

const NUM_ROOMS = 15; 
const MAX_AMENITY_ID = 40; 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roomAmenities = [];
    const currentTime = new Date();

    for (let roomId = 1; roomId <= NUM_ROOMS; roomId++) {
      const numAmenities = faker.number.int({ min: 5, max: 15 });

      const availableAmenityIds = Array.from(
        { length: MAX_AMENITY_ID },
        (_, index) => index + 1
      );

      const selectedAmenityIds = faker.helpers
        .shuffle(availableAmenityIds)
        .slice(0, numAmenities);

      selectedAmenityIds.forEach((amenityId) => {
        roomAmenities.push({
          room_id: roomId,
          amenity_id: amenityId,
          created_at: currentTime,
          updated_at: currentTime,
        });
      });
    }

    await queryInterface.bulkInsert("room_amenity", roomAmenities, {});
  },

  async down(queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete("room_amenity", null, {});
  },
};
