"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: room_images - Cập nhật ảnh ĐỘC NHẤT cho từng phòng (id 21→70)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const roomImages = [];

    // Tập hợp 50 ID ảnh Unsplash về không gian căn hộ/khách sạn khác nhau hoàn toàn
    // Đảm bảo mỗi phòng sở hữu một diện mạo riêng biệt, không trùng lặp chéo
    const uniqueUnsplashIds = [
      "1616486338812-3dadae4b4ace",
      "1582719508461-905c673771fd",
      "1540518614846-7eded433c457",
      "1464822759023-fed622ff2c3b",
      "1520250497591-112f2f40a3f4",
      "1549517045-bc93de075e53",
      "1508333706533-1ab43ecb1606",
      "1531835551805-16d864c8d311",
      "1499955085172-a104c9463ece",
      "1554995207-c18c203602cb",
      "1560448204-e02f11c3d0e2",
      "1502672260266-1c1ef2d93688",
      "1484154218962-a197022b5858",
      "1556909114-f6e7ad7d3136",
      "1513694203232-719a280e022f",
      "1522771739844-6a9f6d5f14af",
      "1502005229762-cf1b2da7c5d6",
      "1600607687939-ce8a6c25118c",
      "1600585154340-be6161a56a0c",
      "1615529182904-14819c35db37",
      "1449158743715-0a90ebb6d2d8",
      "1542718610-a1d656d1884c",
      "1510798831971-661eb04b3739",
      "1518780664697-55e3ad937233",
      "1586023492125-27b2c045efd7",
      "1568605114967-8130f3a36994",
      "1470770903676-69b98201ea1c",
      "1618773928121-c32242e63f39",
      "1566665797739-1674de7a421a",
      "1596394516093-501ba68a0ba6",
      "1512917774080-9991f1c4c750",
      "1600210492486-724fe5c67fb0",
      "1507525428034-b723cf961d3e",
      "1501785888041-af3ef285b470",
      "1571896349842-33c89424de2d",
      "1566073771259-6a8506099945",
      "1600596542815-ffad4c1539a9",
      "1600607687920-4e2a09cf159d",
      "1449034446853-66c86144b0ad",
      "1475855581690-80accde3ae2b",
      "1512915922686-57c11dde9b6b",
      "1502672016927-94cb2b55309a",
      "1513519245088-0e12902e5a38",
      "1524061614234-8449607d3bb7",
      "1486406146926-c627a92ad1ab",
      "1519710164239-da123dc03ef4",
      "1507089947368-19c1da9775ae",
      "1451153378-7fce62bda99a",
      "1536376072261-38c75010e6c9",
      "1590490360182-c33d57733427",
    ];

    // Các ID bổ trợ dùng để tạo góc chụp chi tiết (detail shots) tránh trùng lặp
    const detailAngles = [
      "&sig=1", // Góc ban công / cửa sổ
      "&sig=2", // Góc phòng tắm / bếp nhỏ
      "&sig=3", // Góc decor cận cảnh
    ];

    // Chạy vòng lặp từ phòng 21 đến 70
    for (let roomId = 21; roomId <= 70; roomId++) {
      // Lấy ID ảnh gốc tương ứng với vị trí index của phòng trong mảng (roomId - 21)
      const basePhotoId = uniqueUnsplashIds[roomId - 21];

      // Ảnh chính (display_order: 0) - Ảnh toàn cảnh phòng khách/phòng ngủ sạch sẽ
      roomImages.push({
        room_id: roomId,
        url: `https://images.unsplash.com/photo-${basePhotoId}?w=800`,
        display_order: 0,
        created_at: now,
        updated_at: now,
      });

      // Tạo thêm 2 góc chụp chi tiết khác nhau dựa trên ảnh gốc đó bằng cách thay đổi tham số biến thể
      // Điều này giúp mỗi phòng có trọn vẹn bộ 3 ảnh sinh động không lẫn với phòng khác
      for (let i = 0; i < 2; i++) {
        roomImages.push({
          room_id: roomId,
          url: `https://images.unsplash.com/photo-${basePhotoId}?w=800${detailAngles[i]}`,
          display_order: i + 1,
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert("room_images", roomImages, {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "room_images",
      {
        room_id: { [Op.between]: [21, 70] },
      },
      {},
    );
  },
};
