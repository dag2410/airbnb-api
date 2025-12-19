module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      notifiable_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      notifiable_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "notifications",
      underscored: true,
      timestamps: true,
    }
  );

  return Notification;
};
