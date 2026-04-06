"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      booking_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        references: {
          model: "bookings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      provider: {
        type: Sequelize.ENUM("momo", "vnpay"),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "paid", "failed"),
        defaultValue: "pending",
      },
      transaction_id: {
        type: Sequelize.STRING,
      },
      provider_order_id: {
        type: Sequelize.STRING,
      },
      paid_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("payments");
  },
};
