module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
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
      check_in_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      check_out_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.ENUM("momo", "stripe"),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM("pending", "success", "failed", "rejected"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "staying",
          "completed",
          "cancelled"
        ),
        defaultValue: "pending",
        allowNull: false,
      },
      is_reviewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "bookings",
      underscored: true,
      timestamps: true,
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Booking.belongsTo(models.Room, {
      foreignKey: "room_id",
      as: "room",
    });
    Booking.hasMany(models.Review, {
      foreignKey: "booking_id",
      as: "reviews",
    });
  };

  return Booking;
};
