module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define(
    "Highlight",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "highlights",
      underscored: true,
      timestamps: true,
    }
  );

  return Highlight;
};
