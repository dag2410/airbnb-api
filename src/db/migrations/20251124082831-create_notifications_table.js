"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      notifiable_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      notifiable_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(255),
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("notifications");
  },
};
