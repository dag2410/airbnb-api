module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      booking_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: "bookings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      parent_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: "reviews",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      is_edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "reviews",
      underscored: true,
      timestamps: true,
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "author",
    });
    Review.belongsTo(models.Room, {
      foreignKey: "room_id",
      as: "room",
    });
    Review.belongsTo(models.Booking, {
      foreignKey: "booking_id",
      as: "booking",
    });
    Review.belongsTo(models.Review, {
      foreignKey: "parent_id",
      as: "parent",
    });
    Review.hasOne(models.Review, {
      foreignKey: "parent_id",
      as: "reply",
    });
  };

  return Review;
};
