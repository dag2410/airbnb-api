module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define(
    "Amenity",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "amenities",
      underscored: true,
      timestamps: true,
    }
  );

  return Amenity;
};
