"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // thêm processing và expired vào ENUM status cũ

    await queryInterface.changeColumn("payments", "status", {
      type: Sequelize.ENUM(
        "pending",
        "processing",
        "paid",
        "failed",
        "expired",
      ),
      allowNull: false,
      defaultValue: "pending",
    });
  },

  async down(queryInterface, Sequelize) {
    // rollback về enum cũ

    await queryInterface.changeColumn("payments", "status", {
      type: Sequelize.ENUM("pending", "paid", "failed"),
      allowNull: false,
      defaultValue: "pending",
    });
  },
};
