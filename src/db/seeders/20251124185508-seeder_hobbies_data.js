"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hobbies = [
      { name: "Đọc sách" },
      { name: "Du lịch khám phá" },
      { name: "Nghe nhạc" },
      { name: "Chơi thể thao" },
      { name: "Nấu ăn" },

      // Sở thích về Nghệ thuật & Văn hóa
      { name: "Vẽ/Nghệ thuật thị giác" },
      { name: "Chụp ảnh/Quay phim" },
      { name: "Xem phim/TV Shows" },
      { name: "Tham quan bảo tàng/Phòng trưng bày" },
      { name: "Học ngoại ngữ" },
      { name: "Học chơi nhạc cụ" },

      // Sở thích về Thiên nhiên & Hoạt động ngoài trời
      { name: "Làm vườn/Trồng cây" },
      { name: "Đi bộ đường dài" },
      { name: "Cắm trại" },
      { name: "Câu cá" },
      { name: "Chèo thuyền Kayak/SUP" },

      // Sở thích về Ẩm thực & Giải trí
      { name: "Thưởng thức cà phê đặc biệt" },
      { name: "Thử món ăn/nhà hàng mới" },
      { name: "Tham gia các trò chơi board game" },
      { name: "Chơi game" },

      // Sở thích về Phát triển bản thân & Kỹ năng
      { name: "Thiền/Yoga" },
      { name: "Học lập trình/Code" },
      { name: "Tự học kỹ năng mới" },
      { name: "Viết lách/Làm thơ" },
    ];

    const hobbiesWithTimestamps = hobbies.map((hobby) => ({
      ...hobby,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("hobbies", hobbiesWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("hobbies", null, {});
  },
};
