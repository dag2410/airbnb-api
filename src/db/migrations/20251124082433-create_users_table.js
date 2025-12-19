"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(150),
        defaultValue: null,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(150),
        defaultValue: null,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      phone_number: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      language: {
        type: Sequelize.STRING(10),
        defaultValue: "vi",
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
      },
      fun_fact: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      job: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      traits: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
      },
      email_send_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      verified_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("users");
  },
};
