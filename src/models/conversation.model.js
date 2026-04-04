module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      room_id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: "rooms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      last_message_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "conversations",
      underscored: true,
      timestamps: true,
    }
  );

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.Room, {
      foreignKey: "room_id",
      as: "room",
    });

    Conversation.hasMany(models.Message, {
      foreignKey: "conversation_id",
      as: "messages",
    });

    Conversation.belongsToMany(models.User, {
      through: "conversation_participant",
      foreignKey: "conversation_id",
      otherKey: "user_id",
      as: "participants",
    });
  };

  return Conversation;
};
