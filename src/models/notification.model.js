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
      actor_id: {
        type: DataTypes.INTEGER,
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
  Notification.associate = (models) => {
    Notification.belongsToMany(models.User, {
      through: "user_notification",
      foreignKey: "notification_id",
      otherKey: "user_id",
      as: "receivers",
    });
    Notification.belongsTo(models.User, {
      foreignKey: "actor_id",
      as: "actor",
    });
  };

  return Notification;
};
