"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: room_highlight - Thêm highlight cho 50 phòng mới (id 21→70)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const roomHighlights = [];

    // Lặp để gán 2-3 highlight cho mỗi phòng
    for (let roomId = 21; roomId <= 70; roomId++) {
      // Xoay vòng các highlight ID (giả sử bạn có id từ 1 -> 14 như trong file mẫu)
      const highlights = roomId % 2 === 0 ? [1, 4, 7] : [2, 5, 9, 14];

      for (const highlightId of highlights) {
        roomHighlights.push({
          room_id: roomId,
          highlight_id: highlightId,
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert("room_highlight", roomHighlights, {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "room_highlight",
      {
        room_id: { [Op.between]: [21, 70] },
      },
      {},
    );
  },
};
