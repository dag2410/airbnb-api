module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(150),
        defaultValue: null,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(150),
        defaultValue: null,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      phone_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      language: {
        type: DataTypes.STRING(10),
        defaultValue: "vi",
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
      },
      fun_fact: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      job: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      traits: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      email_send_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  return User;
};
