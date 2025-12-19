"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_hobby", {
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
      hobby_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "hobbies",
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
    await queryInterface.dropTable("user_hobby");
  },
};
