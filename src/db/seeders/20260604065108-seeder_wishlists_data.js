"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: bookings → payments → reviews + wishlists
// Chạy SAU users + rooms
// Lưu ý: guest (id 7-16) đặt phòng của host (id 2-6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // ── Wishlists (guest thêm phòng yêu thích) ──────────────
    await queryInterface.bulkInsert(
      "wishlists",
      [
        { room_id: 5, user_id: 7, created_at: now, updated_at: now }, // An thích Villa Sapa
        { room_id: 4, user_id: 7, created_at: now, updated_at: now }, // An thích Penthouse
        { room_id: 1, user_id: 8, created_at: now, updated_at: now }, // Bình thích Studio HG
        { room_id: 9, user_id: 9, created_at: now, updated_at: now }, // Chi thích Tràng An
        { room_id: 6, user_id: 9, created_at: now, updated_at: now }, // Chi thích Bungalow HG
        { room_id: 5, user_id: 10, created_at: now, updated_at: now }, // Dũng thích Villa Sapa
        { room_id: 9, user_id: 10, created_at: now, updated_at: now }, // Dũng thích Tràng An
        { room_id: 7, user_id: 11, created_at: now, updated_at: now }, // Em thích Homestay Bếp HN
        { room_id: 3, user_id: 12, created_at: now, updated_at: now }, // Giang thích Ba Đình
        { room_id: 2, user_id: 13, created_at: now, updated_at: now }, // Hảo thích Hồ Tây
        { room_id: 1, user_id: 14, created_at: now, updated_at: now }, // Mai thích Studio HG
        { room_id: 8, user_id: 2, created_at: now, updated_at: now }, // Nam thích Phố Huế
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("wishlists", null, {});
  },
};
