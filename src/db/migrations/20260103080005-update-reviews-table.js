"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("reviews", "booking_id", {
      type: Sequelize.INTEGER({ unsigned: true }),
      allowNull: true,
      references: {
        model: "bookings",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("reviews", "parent_id", {
      type: Sequelize.INTEGER({ unsigned: true }),
      allowNull: true,
      references: {
        model: "reviews",
        key: "id",
      },
    });
    await queryInterface.changeColumn("reviews", "rating", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("reviews", "booking_id");
    await queryInterface.removeColumn("reviews", "parent_id");
    await queryInterface.changeColumn("reviews", "rating", {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: null,
    });
  },
};
