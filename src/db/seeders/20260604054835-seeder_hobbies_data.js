"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: hobbies
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert(
      "hobbies",
      [
        { id: 1, name: "Đọc sách", created_at: now, updated_at: now },
        { id: 2, name: "Nấu ăn", created_at: now, updated_at: now },
        { id: 3, name: "Du lịch phượt", created_at: now, updated_at: now },
        { id: 4, name: "Chụp ảnh", created_at: now, updated_at: now },
        { id: 5, name: "Yoga", created_at: now, updated_at: now },
        { id: 6, name: "Bơi lội", created_at: now, updated_at: now },
        { id: 7, name: "Leo núi", created_at: now, updated_at: now },
        { id: 8, name: "Nghe nhạc", created_at: now, updated_at: now },
        { id: 9, name: "Xem phim", created_at: now, updated_at: now },
        { id: 10, name: "Cắm trại", created_at: now, updated_at: now },
        { id: 11, name: "Vẽ tranh", created_at: now, updated_at: now },
        { id: 12, name: "Chơi guitar", created_at: now, updated_at: now },
        { id: 13, name: "Đạp xe", created_at: now, updated_at: now },
        { id: 14, name: "Chạy bộ", created_at: now, updated_at: now },
        { id: 15, name: "Thiền định", created_at: now, updated_at: now },
        { id: 16, name: "Làm vườn", created_at: now, updated_at: now },
        { id: 17, name: "Chơi cờ vua", created_at: now, updated_at: now },
        { id: 18, name: "Cầu lông", created_at: now, updated_at: now },
        { id: 19, name: "Thể dục gym", created_at: now, updated_at: now },
        { id: 20, name: "Khiêu vũ", created_at: now, updated_at: now },
        { id: 21, name: "Viết lách", created_at: now, updated_at: now },
        { id: 22, name: "Mô hình tĩnh", created_at: now, updated_at: now },
        { id: 23, name: "Câu cá", created_at: now, updated_at: now },
        { id: 24, name: "Trồng cây cảnh", created_at: now, updated_at: now },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("hobbies", null, {});
  },
};
