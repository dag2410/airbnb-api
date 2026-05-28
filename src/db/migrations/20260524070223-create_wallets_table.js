"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wallets", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      last_received_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("wallets");
  },
};
