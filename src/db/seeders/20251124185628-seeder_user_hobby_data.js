"use strict";

const { faker } = require("@faker-js/faker");

const NUM_USERS = 10; 
const MAX_HOBBY_ID = 24;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userHobbies = [];
    const currentTime = new Date();

    for (let userId = 1; userId <= NUM_USERS; userId++) {
      const numHobbies = faker.number.int({ min: 3, max: 7 });

      const availableHobbyIds = Array.from(
        { length: MAX_HOBBY_ID },
        (_, index) => index + 1
      );

    
      const selectedHobbyIds = faker.helpers
        .shuffle(availableHobbyIds)
        .slice(0, numHobbies);

      selectedHobbyIds.forEach((hobbyId) => {
        userHobbies.push({
          user_id: userId,
          hobby_id: hobbyId,
          created_at: currentTime,
          updated_at: currentTime,
        });
      });
    }

    await queryInterface.bulkInsert("user_hobby", userHobbies, {});
  },

  async down(queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete("user_hobby", null, {});
  },
};
