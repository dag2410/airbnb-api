"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: room_images + room_amenity + room_highlight
// Chạy SAU rooms
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "room_images",
      [
        // ==========================================
        // DỮ LIỆU GỐC CỦA BẠN (GIỮ NGUYÊN KHÔNG ĐỔI)
        // ==========================================
        // Room 1 - Studio Hồ Gươm
        {
          room_id: 1,
          url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 1,
          url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 1,
          url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 1,
          url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
          display_order: 3,
          created_at: now,
          updated_at: now,
        },
        // Room 2 - Căn hộ Hồ Tây
        {
          room_id: 2,
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 2,
          url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 2,
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 2,
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          display_order: 3,
          created_at: now,
          updated_at: now,
        },
        // Room 3 - Nhà truyền thống Ba Đình
        {
          room_id: 3,
          url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 3,
          url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 3,
          url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 3,
          url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
          display_order: 3,
          created_at: now,
          updated_at: now,
        },
        // Room 4 - Penthouse Cầu Giấy
        {
          room_id: 4,
          url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 4,
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 4,
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 4,
          url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800",
          display_order: 3,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 4,
          url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          display_order: 4,
          created_at: now,
          updated_at: now,
        },
        // Room 5 - Villa Sapa
        {
          room_id: 5,
          url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 5,
          url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 5,
          url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 5,
          url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
          display_order: 3,
          created_at: now,
          updated_at: now,
        },
        // Room 6 - Bungalow Hà Giang
        {
          room_id: 6,
          url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 6,
          url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 6,
          url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 7 - Homestay Bếp HN
        {
          room_id: 7,
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 7,
          url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 7,
          url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 8 - Căn hộ Phố Huế
        {
          room_id: 8,
          url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 8,
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 8,
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 9 - Tràng An
        {
          room_id: 9,
          url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 9,
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 9,
          url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 9,
          url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
          display_order: 3,
          created_at: now,
          updated_at: now,
        },
        // Room 10 - KS Ninh Bình
        {
          room_id: 10,
          url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 10,
          url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 10,
          url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },

        // ==========================================
        // DỮ LIỆU THÊM MỚI TỪ PHÒNG 11 ĐẾN PHÒNG 20
        // ==========================================
        // Room 11 - Green Homestay Hạ Long
        {
          room_id: 11,
          url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 11,
          url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 11,
          url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 12 - Nhà khách Tràng An - Đông Thành
        {
          room_id: 12,
          url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 12,
          url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 12,
          url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 13 - Căn hộ hướng biển Hạ Long
        {
          room_id: 13,
          url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 13,
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 13,
          url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 14 - Bungalow đá tự nhiên Cát Bà
        {
          room_id: 14,
          url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 14,
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 14,
          url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 15 - Phòng Ocean View Cát Bà
        {
          room_id: 15,
          url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 15,
          url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 15,
          url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 16 - Hidden Glass Villa Sóc Sơn
        {
          room_id: 16,
          url: "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 16,
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 16,
          url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 17 - Nhà Gỗ Mộc Ba Vì
        {
          room_id: 17,
          url: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 17,
          url: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 17,
          url: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 18 - Căn hộ Loft nghệ thuật Nhà Hát Lớn
        {
          room_id: 18,
          url: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 18,
          url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 18,
          url: "https://images.unsplash.com/photo-1502672016927-94cb2b55309a?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 19 - Trốn nắng Studio Đống Đa
        {
          room_id: 19,
          url: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 19,
          url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 19,
          url: "https://images.unsplash.com/photo-1524061614234-8449607d3bb7?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
        // Room 20 - Studio style Hàn Quốc Bà Triệu
        {
          room_id: 20,
          url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
          display_order: 0,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 20,
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
          display_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          room_id: 20,
          url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
          display_order: 2,
          created_at: now,
          updated_at: now,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("room_images", null, {});
  },
};
