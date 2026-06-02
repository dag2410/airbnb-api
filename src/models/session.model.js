module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      data: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },

      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "sessions",
      underscored: true,
      timestamps: true,
    },
  );

  return Session;
};
