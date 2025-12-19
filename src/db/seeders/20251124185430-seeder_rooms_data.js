"use strict";

const { faker } = require("@faker-js/faker"); // Đã sửa lỗi import faker

// Giả định: Bạn đã có 10 user (ID từ 1-10)
const MAX_USER_ID = 10;
const NUM_ROOMS = 15;

// Khối dữ liệu giả lập cho địa điểm (dùng để điền vào các cột mới)
const mockDetailedLocations = [
  {
    ward: "Phường Tràng Tiền",
    district: "Quận Hoàn Kiếm",
    city: "Thành phố Hà Nội",
  },
  {
    ward: "Phường Dịch Vọng Hậu",
    district: "Quận Cầu Giấy",
    city: "Thành phố Hà Nội",
  },
  {
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
  },
  { ward: "Phường 10", district: "Quận 3", city: "Thành phố Hồ Chí Minh" },
  { ward: "Phường 1", district: "Thành phố Đà Lạt", city: "Tỉnh Lâm Đồng" },
  { ward: "Thị trấn Sa Pa", district: "Thị xã Sa Pa", city: "Tỉnh Lào Cai" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = [];

    for (let i = 0; i < NUM_ROOMS; i++) {
      const location = faker.helpers?.arrayElement(mockDetailedLocations);

      rooms.push({
        user_id: faker.number.int({ min: 1, max: MAX_USER_ID }),
        title: faker.lorem.words({ min: 3, max: 6 }) + " near " + location.ward,
        description: faker.lorem.paragraphs({ min: 1, max: 2 }),
        introduce: faker.lorem.sentence({ min: 10, max: 15 }),
        slug: faker.helpers.slugify(
          faker.lorem.words({ min: 2, max: 4 }) + "-" + faker.string.uuid()
        ),
        rating: faker.number.float({ min: 3.5, max: 5.0, precision: 0.01 }),

        room_ward: location.ward,
        room_district: location.district,
        room_city: location.city,

        room_lat: faker.location.latitude(),
        room_lng: faker.location.longitude(),
        address_line: faker.location.streetAddress(),

        price_per_night: faker.number.float({
          min: 250000,
          max: 3500000,
          precision: 0.01,
        }),
        max_guests: faker.number.int({ min: 1, max: 8 }),
        num_bedrooms: faker.number.int({ min: 1, max: 5 }),
        num_beds: faker.number.int({ min: 1, max: 6 }),
        num_bathrooms: faker.number.int({ min: 1, max: 3 }),

        property_type: faker.helpers.arrayElement([
          "house",
          "apartment",
          "hotel_room",
        ]),

        house_rules: JSON.stringify({
          smoking: faker.datatype.boolean(),
          pets: faker.datatype.boolean(),
          quiet_hours: "22:00-07:00",
        }),
        published_at: faker.date.past({ days: 120 }),
        created_at: faker.date.past({ days: 150 }),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("rooms", rooms);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
