module.exports = (sequelize, DataTypes) => {
  const RoomImage = sequelize.define(
    "RoomImage",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      room_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      tableName: "room_images",
      underscored: true,
      timestamps: true,
    },
  );

  RoomImage.associate = (models) => {
    RoomImage.belongsTo(models.Room, {
      foreignKey: "room_id",
      as: "room",
    });
  };

  return RoomImage;
};
