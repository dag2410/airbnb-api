"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      room_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      check_in_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      check_out_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total_guests: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM("momo", "stripe"),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "success", "failed", "rejected"),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("bookings");
  },
};
