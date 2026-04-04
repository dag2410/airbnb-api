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

  Hobby.associate = (models) => {
    Hobby.belongsToMany(models.User, {
      through: "user_hobby",
      foreignKey: "hobby_id",
      otherKey: "user_id",
      as: "users",
    });
  };
  return Hobby;
};
