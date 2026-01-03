"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("bookings", "status", {
      type: Sequelize.ENUM(
        "pending",
        "confirmed",
        "staying",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending",
      allowNull: false,
    });

    await queryInterface.addColumn("bookings", "is_reviewed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("bookings", "status");
    await queryInterface.removeColumn("bookings", "is_reviewed");
  },
};
