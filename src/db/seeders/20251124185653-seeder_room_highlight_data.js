"use strict";

const { faker } = require("@faker-js/faker");

const NUM_ROOMS = 15;
const MAX_HIGHLIGHT_ID = 14;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roomHighlights = [];
    const currentTime = new Date();

    for (let roomId = 1; roomId <= NUM_ROOMS; roomId++) {
      const numHighlights = faker.number.int({ min: 3, max: 6 });

      const availableHighlightIds = Array.from(
        { length: MAX_HIGHLIGHT_ID },
        (_, index) => index + 1
      );

      const selectedHighlightIds = faker.helpers
        .shuffle(availableHighlightIds)
        .slice(0, numHighlights);

      selectedHighlightIds.forEach((highlightId) => {
        roomHighlights.push({
          room_id: roomId,
          highlight_id: highlightId,
          created_at: currentTime,
          updated_at: currentTime,
        });
      });
    }

    await queryInterface.bulkInsert("room_highlight", roomHighlights, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("room_highlight", null, {});
  },
};
