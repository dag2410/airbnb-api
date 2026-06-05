"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: room_amenity - Thêm tiện ích cho 50 phòng mới (id 21→70)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const roomAmenities = [];

    // Giả định các ID tiện ích có sẵn trong database từ 1 đến 10 (Wifi, Bếp, TV, Điều hòa...)
    const amenitySet1 = [1, 2, 3, 5];
    const amenitySet2 = [1, 4, 6, 8, 10];
    const amenitySet3 = [2, 3, 7, 9];

    for (let roomId = 21; roomId <= 70; roomId++) {
      // Thay đổi tổ hợp tiện ích ngẫu nhiên một chút dựa vào ID chẵn/lẻ
      let amenitiesToInsert = amenitySet1;
      if (roomId % 3 === 0) amenitiesToInsert = amenitySet2;
      else if (roomId % 2 === 0) amenitiesToInsert = amenitySet3;

      for (const amenityId of amenitiesToInsert) {
        roomAmenities.push({
          room_id: roomId,
          amenity_id: amenityId,
          created_at: now,
          updated_at: now,
        });
      }
    }

    // Đảm bảo tên bảng khớp với DB của bạn (ví dụ: 'room_amenity' hoặc 'room_amenities')
    await queryInterface.bulkInsert("room_amenity", roomAmenities, {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "room_amenity",
      {
        room_id: { [Op.between]: [21, 70] },
      },
      {},
    );
  },
};
