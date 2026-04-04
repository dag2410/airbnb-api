module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
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
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      introduce: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
      },
      room_ward: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      room_district: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      room_city: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      room_lat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      room_lng: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      address_line: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price_per_night: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      max_guests: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      num_bedrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      num_beds: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      num_bathrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      property_type: {
        type: DataTypes.ENUM("house", "apartment", "hotel_room"),
        allowNull: false,
      },
      house_rules: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "rooms",
      underscored: true,
      timestamps: true,
    }
  );

  Room.associate = (models) => {
    Room.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "host",
    });

    Room.hasMany(models.Review, {
      foreignKey: "room_id",
      as: "reviews",
    });

    Room.hasMany(models.Booking, {
      foreignKey: "room_id",
      as: "bookings",
    });

    Room.hasMany(models.RoomImage, {
      foreignKey: "room_id",
      as: "images",
    });

    Room.hasMany(models.Conversation, {
      foreignKey: "room_id",
      as: "conversations",
    });

    Room.hasMany(models.Wishlist, {
      foreignKey: "room_id",
      as: "wishlists_room",
    });

    Room.belongsToMany(models.Amenity, {
      through: "room_amenity",
      foreignKey: "room_id",
      otherKey: "amenity_id",
      as: "amenities",
    });

    Room.belongsToMany(models.Highlight, {
      through: "room_highlight",
      foreignKey: "room_id",
      otherKey: "highlight_id",
      as: "highlights",
    });

    Room.belongsToMany(models.User, {
      through: models.Wishlist,
      foreignKey: "room_id",
      otherKey: "user_id",
      as: "wishlisted_by",
    });
  };

  return Room;
};
