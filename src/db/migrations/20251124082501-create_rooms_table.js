"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rooms", {
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
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      introduce: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
      },
      room_ward: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      room_district: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      room_city: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      room_lat: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      room_lng: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      address_line: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price_per_night: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      max_guests: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      num_bedrooms: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      num_beds: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      num_bathrooms: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      property_type: {
        type: Sequelize.ENUM("house", "apartment", "hotel_room"),
        allowNull: false,
      },
      house_rules: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("rooms");
  },
};
