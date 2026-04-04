module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        references: {
          model: "roles",
          key: "id",
        },
      },
      first_name: {
        type: DataTypes.STRING(150),
        defaultValue: null,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(150),
        defaultValue: null,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      phone_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      language: {
        type: DataTypes.STRING(10),
        defaultValue: "vi",
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
      },
      fun_fact: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      job: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      traits: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      email_send_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "local",
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Room, {
      foreignKey: "user_id",
      as: "rooms",
    });

    User.hasMany(models.Review, {
      foreignKey: "user_id",
      as: "reviews",
    });

    User.hasMany(models.Booking, {
      foreignKey: "user_id",
      as: "bookings",
    });

    User.hasMany(models.Wishlist, {
      foreignKey: "user_id",
      as: "wishlists",
    });

    User.hasMany(models.Message, {
      foreignKey: "user_id",
      as: "messages",
    });

    User.hasMany(models.RefreshToken, {
      foreignKey: "user_id",
      as: "refresh_tokens",
    });

    User.hasMany(models.Chatbot, {
      foreignKey: "user_id",
      as: "ai_chats",
    });

    User.hasOne(models.UserSetting, {
      foreignKey: "user_id",
      as: "user_settings",
    });

    User.belongsToMany(models.Hobby, {
      through: "user_hobby",
      foreignKey: "user_id",
      otherKey: "hobby_id",
      as: "hobbies",
    });

    User.belongsToMany(models.Notification, {
      through: "user_notification",
      foreignKey: "user_id",
      otherKey: "notification_id",
      as: "notifications",
    });

    User.belongsToMany(models.Conversation, {
      through: "conversation_participant",
      foreignKey: "user_id",
      otherKey: "conversation_id",
      as: "conversations",
    });

    User.belongsToMany(models.Room, {
      through: models.Wishlist,
      foreignKey: "user_id",
      otherKey: "room_id",
      as: "wishlist_rooms",
    });

    User.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });
  };

  return User;
};
