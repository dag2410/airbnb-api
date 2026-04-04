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
  
  Amenity.associate = (models) => {
    Amenity.belongsToMany(models.Room, {
      through: "room_amenity",
      foreignKey: "amenity_id",
      otherKey: "room_id",
      as: "rooms",
    });
  };
  return Amenity;
};
