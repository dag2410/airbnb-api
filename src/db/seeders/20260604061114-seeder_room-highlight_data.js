"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: room_images + room_amenity + room_highlight
// Chạy SAU rooms
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // ── Highlights từng phòng ───────────────────────────────
    await queryInterface.bulkInsert(
      "room_highlight",
      [
        { room_id: 1, highlight_id: 1, created_at: now, updated_at: now },
        { room_id: 1, highlight_id: 4, created_at: now, updated_at: now },
        { room_id: 1, highlight_id: 7, created_at: now, updated_at: now },
        { room_id: 1, highlight_id: 8, created_at: now, updated_at: now },
        { room_id: 2, highlight_id: 2, created_at: now, updated_at: now },
        { room_id: 2, highlight_id: 3, created_at: now, updated_at: now },
        { room_id: 2, highlight_id: 9, created_at: now, updated_at: now },
        { room_id: 3, highlight_id: 5, created_at: now, updated_at: now },
        { room_id: 3, highlight_id: 6, created_at: now, updated_at: now },
        { room_id: 3, highlight_id: 4, created_at: now, updated_at: now },
        { room_id: 4, highlight_id: 1, created_at: now, updated_at: now },
        { room_id: 4, highlight_id: 3, created_at: now, updated_at: now },
        { room_id: 4, highlight_id: 5, created_at: now, updated_at: now },
        { room_id: 4, highlight_id: 10, created_at: now, updated_at: now },
        { room_id: 5, highlight_id: 1, created_at: now, updated_at: now },
        { room_id: 5, highlight_id: 2, created_at: now, updated_at: now },
        { room_id: 5, highlight_id: 3, created_at: now, updated_at: now },
        { room_id: 5, highlight_id: 6, created_at: now, updated_at: now },
        { room_id: 5, highlight_id: 9, created_at: now, updated_at: now },
        { room_id: 6, highlight_id: 5, created_at: now, updated_at: now },
        { room_id: 6, highlight_id: 6, created_at: now, updated_at: now },
        { room_id: 6, highlight_id: 13, created_at: now, updated_at: now },
        { room_id: 7, highlight_id: 1, created_at: now, updated_at: now },
        { room_id: 7, highlight_id: 2, created_at: now, updated_at: now },
        { room_id: 7, highlight_id: 4, created_at: now, updated_at: now },
        { room_id: 7, highlight_id: 14, created_at: now, updated_at: now },
        { room_id: 8, highlight_id: 4, created_at: now, updated_at: now },
        { room_id: 8, highlight_id: 10, created_at: now, updated_at: now },
        { room_id: 8, highlight_id: 12, created_at: now, updated_at: now },
        { room_id: 9, highlight_id: 1, created_at: now, updated_at: now },
        { room_id: 9, highlight_id: 2, created_at: now, updated_at: now },
        { room_id: 9, highlight_id: 9, created_at: now, updated_at: now },
        { room_id: 9, highlight_id: 14, created_at: now, updated_at: now },
        { room_id: 10, highlight_id: 4, created_at: now, updated_at: now },
        { room_id: 10, highlight_id: 12, created_at: now, updated_at: now },
        { room_id: 10, highlight_id: 14, created_at: now, updated_at: now },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("room_highlight", null, {});
  },
};
