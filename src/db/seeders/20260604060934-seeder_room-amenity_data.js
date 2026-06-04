"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: room_images + room_amenity + room_highlight
// Chạy SAU rooms
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // ── Tiện nghi từng phòng ────────────────────────────────
    await queryInterface.bulkInsert(
      "room_amenity",
      [
        // Room 1: wifi, điều hoà, tivi, sấy tóc, bàn làm việc, ban công, tủ lạnh, khóa thông minh
        { room_id: 1, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 8, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 11, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 12, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 14, created_at: now, updated_at: now },
        { room_id: 1, amenity_id: 21, created_at: now, updated_at: now },
        // Room 2: wifi, điều hoà, bếp, máy giặt, đỗ xe, tivi, pha cà phê, tủ lạnh, lò vi sóng, ban công
        { room_id: 2, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 4, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 5, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 10, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 14, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 15, created_at: now, updated_at: now },
        { room_id: 2, amenity_id: 12, created_at: now, updated_at: now },
        // Room 3: wifi, điều hoà, bếp, máy giặt, đỗ xe, tivi, sân vườn, thú cưng
        { room_id: 3, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 4, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 5, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 18, created_at: now, updated_at: now },
        { room_id: 3, amenity_id: 20, created_at: now, updated_at: now },
        // Room 4: đầy đủ cao cấp
        { room_id: 4, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 4, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 6, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 10, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 11, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 13, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 16, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 19, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 21, created_at: now, updated_at: now },
        { room_id: 4, amenity_id: 25, created_at: now, updated_at: now },
        // Room 5: villa sapa
        { room_id: 5, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 4, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 5, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 17, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 18, created_at: now, updated_at: now },
        { room_id: 5, amenity_id: 22, created_at: now, updated_at: now },
        // Room 6: bungalow tối giản
        { room_id: 6, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 6, amenity_id: 17, created_at: now, updated_at: now },
        { room_id: 6, amenity_id: 18, created_at: now, updated_at: now },
        { room_id: 6, amenity_id: 22, created_at: now, updated_at: now },
        // Room 7: homestay
        { room_id: 7, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 7, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 7, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 7, amenity_id: 8, created_at: now, updated_at: now },
        { room_id: 7, amenity_id: 14, created_at: now, updated_at: now },
        { room_id: 7, amenity_id: 22, created_at: now, updated_at: now },
        // Room 8: căn hộ phố Huế
        { room_id: 8, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 4, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 11, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 13, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 14, created_at: now, updated_at: now },
        { room_id: 8, amenity_id: 21, created_at: now, updated_at: now },
        // Room 9: nhà khách Tràng An
        { room_id: 9, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 3, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 5, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 17, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 18, created_at: now, updated_at: now },
        { room_id: 9, amenity_id: 22, created_at: now, updated_at: now },
        // Room 10: khách sạn Ninh Bình
        { room_id: 10, amenity_id: 1, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 2, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 6, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 7, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 8, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 13, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 16, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 19, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 22, created_at: now, updated_at: now },
        { room_id: 10, amenity_id: 24, created_at: now, updated_at: now },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("room_amenity", null, {});
  },
};
