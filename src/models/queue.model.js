module.exports = (sequelize, DataTypes) => {
  const Queue = sequelize.define(
    "Queue",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "pending",
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payload: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      max_retries: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 5,
      },
      retries_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      retry_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "queues",
      underscored: true,
      timestamps: true,
    }
  );

  return Queue;
};
