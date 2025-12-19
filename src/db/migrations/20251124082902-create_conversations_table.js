"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("conversations", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      room_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: "rooms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      last_message_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("conversations");
  },
};
