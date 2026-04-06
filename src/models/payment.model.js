module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      booking_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        references: {
          model: "bookings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      provider: {
        type: DataTypes.ENUM("momo", "vnpay"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: "pending",
      },
      transaction_id: {
        type: DataTypes.STRING,
      },
      provider_order_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      paid_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "payments",
      underscored: true,
      timestamps: true,
    },
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, {
      foreignKey: "booking_id",
      as: "booking",
    });
  };

  return Payment;
};
