"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("highlights", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
    await queryInterface.dropTable("highlights");
  },
};
