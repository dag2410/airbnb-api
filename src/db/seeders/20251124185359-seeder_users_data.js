"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const NUM_USERS = 10;
    const mockDetailedLocations = [
      {
        street: "Ngõ 200, Nguyễn Lương Bằng",
        ward: "Quang Trung",
        district: "Đống Đa",
        city: "Thành phố Hà Nội",
      },
      {
        street: "Số 15, Phố Hàng Cân",
        ward: "Hàng Đào",
        district: "Hoàn Kiếm",
        city: "Thành phố Hà Nội",
      },
      {
        street: "Lầu 5, Tòa nhà Bitexco",
        ward: "Bến Nghé",
        district: "Quận 1",
        city: "Thành phố Hồ Chí Minh",
      },
      {
        street: "Số 99, Đường Nguyễn Hữu Thọ",
        ward: "Tân Phong",
        district: "Quận 7",
        city: "Thành phố Hồ Chí Minh",
      },
      {
        street: "Đường Triệu Việt Vương",
        ward: "Phường 4",
        district: "Thành phố Đà Lạt",
        city: "Tỉnh Lâm Đồng",
      },
    ];

    for (let i = 0; i < NUM_USERS; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const location = faker.helpers.arrayElement(mockDetailedLocations);

      const fullAddress = `${location.street}, P.${location.ward}, Q.${location.district}, ${location.city}`;

      users.push({
        id: i + 1,
        role_id: faker.number.int({ min: 2, max: 3 }),
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({
          firstName,
          lastName,
          provider: "airbnbclone.com",
        }),
        password: faker.internet.password(),
        phone_number: faker.phone.number("09#########"),
        username: faker.internet.userName({ firstName, lastName }),
        bio: faker.person.bio(),
        address: fullAddress,
        date_of_birth: faker.date.past({ years: 30, refDate: "2000-01-01" }),
        rating: faker.number.float({ min: 3.5, max: 5.0, precision: 0.01 }),
        job: faker.person.jobTitle(),
        fun_fact: faker.lorem.sentence({ min: 5, max: 10 }),
        language: "vi",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
