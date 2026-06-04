"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: amenities + highlights
// Không phụ thuộc FK → chạy sớm
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // ── Tiện nghi ───────────────────────────────────────────
    await queryInterface.bulkInsert(
      "amenities",
      [
        {
          id: 1,
          name: "Wifi miễn phí",
          icon: "wifi",
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          name: "Điều hoà nhiệt độ",
          icon: "air-conditioner",
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          name: "Bếp nấu ăn",
          icon: "kitchen",
          created_at: now,
          updated_at: now,
        },
        {
          id: 4,
          name: "Máy giặt",
          icon: "washing-machine",
          created_at: now,
          updated_at: now,
        },
        {
          id: 5,
          name: "Bãi đỗ xe miễn phí",
          icon: "parking",
          created_at: now,
          updated_at: now,
        },
        {
          id: 6,
          name: "Hồ bơi",
          icon: "pool",
          created_at: now,
          updated_at: now,
        },
        {
          id: 7,
          name: "Tivi màn hình rộng",
          icon: "tv",
          created_at: now,
          updated_at: now,
        },
        {
          id: 8,
          name: "Máy sấy tóc",
          icon: "hair-dryer",
          created_at: now,
          updated_at: now,
        },
        {
          id: 9,
          name: "Lò nướng",
          icon: "oven",
          created_at: now,
          updated_at: now,
        },
        {
          id: 10,
          name: "Máy pha cà phê",
          icon: "coffee-maker",
          created_at: now,
          updated_at: now,
        },
        {
          id: 11,
          name: "Bàn làm việc",
          icon: "desk",
          created_at: now,
          updated_at: now,
        },
        {
          id: 12,
          name: "Ban công",
          icon: "balcony",
          created_at: now,
          updated_at: now,
        },
        {
          id: 13,
          name: "Thang máy",
          icon: "elevator",
          created_at: now,
          updated_at: now,
        },
        {
          id: 14,
          name: "Tủ lạnh",
          icon: "fridge",
          created_at: now,
          updated_at: now,
        },
        {
          id: 15,
          name: "Lò vi sóng",
          icon: "microwave",
          created_at: now,
          updated_at: now,
        },
        {
          id: 16,
          name: "Két an toàn",
          icon: "safe",
          created_at: now,
          updated_at: now,
        },
        {
          id: 17,
          name: "Đồ dùng ngoài trời",
          icon: "outdoor",
          created_at: now,
          updated_at: now,
        },
        {
          id: 18,
          name: "Sân vườn riêng",
          icon: "garden",
          created_at: now,
          updated_at: now,
        },
        {
          id: 19,
          name: "Phòng gym",
          icon: "gym",
          created_at: now,
          updated_at: now,
        },
        {
          id: 20,
          name: "Cho phép thú cưng",
          icon: "pet-friendly",
          created_at: now,
          updated_at: now,
        },
        {
          id: 21,
          name: "Khóa thông minh",
          icon: "smart-lock",
          created_at: now,
          updated_at: now,
        },
        {
          id: 22,
          name: "Đồ ăn sáng miễn phí",
          icon: "breakfast",
          created_at: now,
          updated_at: now,
        },
        {
          id: 23,
          name: "Phòng tắm riêng",
          icon: "bathroom",
          created_at: now,
          updated_at: now,
        },
        {
          id: 24,
          name: "Camera an ninh",
          icon: "security-camera",
          created_at: now,
          updated_at: now,
        },
        {
          id: 25,
          name: "Máy lọc không khí",
          icon: "air-purifier",
          created_at: now,
          updated_at: now,
        },
      ],
      {},
    );

    // ── Highlights (điểm nổi bật phòng) ─────────────────────
    await queryInterface.bulkInsert(
      "highlights",
      [
        {
          id: 1,
          name: "Chỗ ở được yêu thích",
          description: "Được khách đánh giá cao nhất trong khu vực",
          icon: "heart",
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          name: "Host siêu cấp",
          description: "Chủ nhà có kinh nghiệm và được đánh giá xuất sắc",
          icon: "superhost",
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          name: "Tầm nhìn đẹp",
          description: "View hồ, núi hoặc thành phố ấn tượng",
          icon: "view",
          created_at: now,
          updated_at: now,
        },
        {
          id: 4,
          name: "Vị trí tuyệt vời",
          description: "Nằm ngay trung tâm, tiện di chuyển",
          icon: "location",
          created_at: now,
          updated_at: now,
        },
        {
          id: 5,
          name: "Thiết kế độc đáo",
          description: "Không gian được thiết kế sáng tạo, thẩm mỹ cao",
          icon: "design",
          created_at: now,
          updated_at: now,
        },
        {
          id: 6,
          name: "Yên tĩnh, riêng tư",
          description: "Không gian yên tĩnh, phù hợp nghỉ ngơi thư giãn",
          icon: "quiet",
          created_at: now,
          updated_at: now,
        },
        {
          id: 7,
          name: "Gần phố cổ",
          description: "Cách phố cổ Hà Nội chỉ vài phút đi bộ",
          icon: "oldtown",
          created_at: now,
          updated_at: now,
        },
        {
          id: 8,
          name: "Gần hồ Hoàn Kiếm",
          description: "Đi bộ 5 phút đến Hồ Gươm thơ mộng",
          icon: "lake",
          created_at: now,
          updated_at: now,
        },
        {
          id: 9,
          name: "Phù hợp gia đình",
          description: "Không gian rộng rãi, an toàn cho cả gia đình",
          icon: "family",
          created_at: now,
          updated_at: now,
        },
        {
          id: 10,
          name: "Không gian làm việc",
          description: "Bàn làm việc, wifi tốc độ cao – phù hợp remote",
          icon: "workspace",
          created_at: now,
          updated_at: now,
        },
        {
          id: 11,
          name: "Gần bãi biển",
          description: "Chỉ 200m đến bãi tắm sạch đẹp",
          icon: "beach",
          created_at: now,
          updated_at: now,
        },
        {
          id: 12,
          name: "Check-in linh hoạt",
          description: "Nhận phòng 24/7 với khóa thông minh",
          icon: "checkin",
          created_at: now,
          updated_at: now,
        },
        {
          id: 13,
          name: "Mới khai trương",
          description: "Phòng mới hoàn thiện, nội thất hiện đại",
          icon: "new",
          created_at: now,
          updated_at: now,
        },
        {
          id: 14,
          name: "Gần nhà hàng",
          description: "Hàng chục nhà hàng ngon trong bán kính 500m",
          icon: "restaurant",
          created_at: now,
          updated_at: now,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("highlights", null, {});
    await queryInterface.bulkDelete("amenities", null, {});
  },
};
