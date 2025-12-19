module.exports = (sequelize, DataTypes) => {
  const Hobby = sequelize.define(
    "Hobby",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: "hobbies",
      underscored: true,
      timestamps: true,
    }
  );

  return Hobby;
};
