"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("bookings", "cancelled_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.removeColumn("bookings", "payment_method");
    await queryInterface.removeColumn("bookings", "payment_status");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("bookings", "payment_method", {
      type: Sequelize.ENUM("momo", "vnpay"),
    });
    await queryInterface.addColumn("bookings", "payment_status", {
      type: Sequelize.ENUM("pending", "success", "failed"),
    });
    await queryInterface.removeColumn("bookings", "cancelled_at");
  },
};
