module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    "Wishlist",
    {
      room_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "rooms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "wishlists",
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "room_id"],
        },
      ],
    }
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Wishlist.belongsTo(models.Room, {
      foreignKey: "room_id",
      as: "room",
    });
  };

  return Wishlist;
};
