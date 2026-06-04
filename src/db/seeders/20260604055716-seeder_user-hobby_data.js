"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "user_hobby",
      [
        // Host Minh (id=2): du lịch, chụp ảnh, nhạc, chạy bộ
        { user_id: 2, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 2, hobby_id: 4, created_at: now, updated_at: now },
        { user_id: 2, hobby_id: 8, created_at: now, updated_at: now },
        { user_id: 2, hobby_id: 14, created_at: now, updated_at: now },
        // Host Lan (id=3): đọc sách, yoga, vẽ, viết lách
        { user_id: 3, hobby_id: 1, created_at: now, updated_at: now },
        { user_id: 3, hobby_id: 5, created_at: now, updated_at: now },
        { user_id: 3, hobby_id: 11, created_at: now, updated_at: now },
        { user_id: 3, hobby_id: 21, created_at: now, updated_at: now },
        // Host Hùng (id=4): leo núi, du lịch, cắm trại, chụp ảnh
        { user_id: 4, hobby_id: 7, created_at: now, updated_at: now },
        { user_id: 4, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 4, hobby_id: 10, created_at: now, updated_at: now },
        { user_id: 4, hobby_id: 4, created_at: now, updated_at: now },
        // Host Hoa (id=5): nấu ăn, làm vườn, yoga
        { user_id: 5, hobby_id: 2, created_at: now, updated_at: now },
        { user_id: 5, hobby_id: 16, created_at: now, updated_at: now },
        { user_id: 5, hobby_id: 5, created_at: now, updated_at: now },
        // Host Đức (id=6): du lịch, chụp ảnh, cầu lông
        { user_id: 6, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 6, hobby_id: 4, created_at: now, updated_at: now },
        { user_id: 6, hobby_id: 18, created_at: now, updated_at: now },
        // Guest An (id=7): du lịch, xem phim, khiêu vũ
        { user_id: 7, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 7, hobby_id: 9, created_at: now, updated_at: now },
        { user_id: 7, hobby_id: 20, created_at: now, updated_at: now },
        // Guest Bình (id=8): du lịch, bơi lội, chạy bộ
        { user_id: 8, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 8, hobby_id: 6, created_at: now, updated_at: now },
        { user_id: 8, hobby_id: 14, created_at: now, updated_at: now },
        // Guest Chi (id=9): chụp ảnh, vẽ, nhạc, thiền
        { user_id: 9, hobby_id: 4, created_at: now, updated_at: now },
        { user_id: 9, hobby_id: 11, created_at: now, updated_at: now },
        { user_id: 9, hobby_id: 8, created_at: now, updated_at: now },
        { user_id: 9, hobby_id: 15, created_at: now, updated_at: now },
        // Guest Dũng (id=10): du lịch, bơi, xem phim
        { user_id: 10, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 10, hobby_id: 6, created_at: now, updated_at: now },
        { user_id: 10, hobby_id: 9, created_at: now, updated_at: now },
        // Guest Thanh Em (id=11): chụp ảnh, du lịch, nhạc, khiêu vũ
        { user_id: 11, hobby_id: 4, created_at: now, updated_at: now },
        { user_id: 11, hobby_id: 3, created_at: now, updated_at: now },
        { user_id: 11, hobby_id: 8, created_at: now, updated_at: now },
        { user_id: 11, hobby_id: 20, created_at: now, updated_at: now },
        // Guest Giang (id=12): đọc sách, cờ vua, thiền
        { user_id: 12, hobby_id: 1, created_at: now, updated_at: now },
        { user_id: 12, hobby_id: 17, created_at: now, updated_at: now },
        { user_id: 12, hobby_id: 15, created_at: now, updated_at: now },
        // Guest Mai (id=13): yoga, nấu ăn, xem phim
        { user_id: 13, hobby_id: 5, created_at: now, updated_at: now },
        { user_id: 13, hobby_id: 2, created_at: now, updated_at: now },
        { user_id: 13, hobby_id: 9, created_at: now, updated_at: now },
        // Guest Nam (id=14): chạy bộ, cầu lông, gym
        { user_id: 14, hobby_id: 14, created_at: now, updated_at: now },
        { user_id: 14, hobby_id: 18, created_at: now, updated_at: now },
        { user_id: 14, hobby_id: 19, created_at: now, updated_at: now },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("user_hobby", null, {});
  },
};
