"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("conversation_participant", {
      user_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      conversation_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "conversations",
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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("conversation_participant");
  },
};
