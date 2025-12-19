"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("room_amenity", {
      room_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "rooms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amenity_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "amenities",
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
    await queryInterface.dropTable("room_amenity");
  },
};
