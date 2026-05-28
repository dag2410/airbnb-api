module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      last_received_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "wallets",
      underscored: true,
      timestamps: true,
    },
  );

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Wallet;
};
