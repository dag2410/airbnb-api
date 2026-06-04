"use strict";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BẢNG: bookings → payments → reviews + wishlists
// Chạy SAU users + rooms
// Lưu ý: guest (id 7-16) đặt phòng của host (id 2-6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // ── Reviews (guest review + host reply) ─────────────────
    // Chỉ booking có status=completed + is_reviewed=1 mới có review
    await queryInterface.bulkInsert(
      "reviews",
      [
        // booking 1: An ở phòng 1
        {
          user_id: 7,
          room_id: 1,
          booking_id: 1,
          parent_id: null,
          content:
            "Phòng cực kỳ ấn tượng! View Hồ Gươm từ ban công đẹp hơn trong ảnh rất nhiều. Chủ nhà Minh rất nhiệt tình, chỉ tôi hàng loạt quán ăn ngon trong phố cổ. Sẽ quay lại lần sau!",
          rating: 5,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-03-14 09:00:00"),
          updated_at: new Date("2024-03-14 09:00:00"),
        },
        // booking 1: Minh reply An
        {
          user_id: 2,
          room_id: 1,
          booking_id: 1,
          parent_id: null,
          content:
            "Cảm ơn An đã lưu trú và để lại review tuyệt vời! Lần sau ghé Hà Nội nhớ book lại nhé, tôi sẽ giới thiệu thêm nhiều điểm ăn uống mới!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-03-14 11:00:00"),
          updated_at: new Date("2024-03-14 11:00:00"),
        },

        // booking 2: Bình ở phòng 2
        {
          user_id: 8,
          room_id: 2,
          booking_id: 2,
          parent_id: null,
          content:
            "Căn hộ rộng rãi, sạch sẽ, đúng như mô tả. Hồ Tây buổi sáng rất đẹp. Bếp đủ dụng cụ, tôi tự nấu ăn cả 3 ngày. Rất hài lòng!",
          rating: 4,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-03-19 10:00:00"),
          updated_at: new Date("2024-03-19 10:00:00"),
        },
        // booking 2: Minh reply Bình
        {
          user_id: 2,
          room_id: 2,
          booking_id: 2,
          parent_id: null,
          content:
            "Cảm ơn Bình! Vui vì bạn thấy bếp tiện nghi. Lần sau đi công tác Hà Nội nhớ ghé lại nhé!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-03-19 14:00:00"),
          updated_at: new Date("2024-03-19 14:00:00"),
        },

        // booking 3: Chi ở phòng 4
        {
          user_id: 9,
          room_id: 4,
          booking_id: 3,
          parent_id: null,
          content:
            "Penthouse đẳng cấp thật sự! View ban đêm từ tầng 20 xuống Hà Nội rất đẹp. Bàn làm việc rộng, wifi cực nhanh — tôi làm việc 3 ngày liên tục vẫn thoải mái. Nội thất Japandi rất tinh tế.",
          rating: 5,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-04-09 08:00:00"),
          updated_at: new Date("2024-04-09 08:00:00"),
        },
        // booking 3: Lan reply Chi
        {
          user_id: 3,
          room_id: 4,
          booking_id: 3,
          parent_id: null,
          content:
            "Cảm ơn Chi rất nhiều! Nghe bạn làm việc hiệu quả tôi rất vui. Bàn làm việc đó tôi đặt riêng từ Nhật đó, hehe. Lần sau ghé nhé!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-04-09 10:30:00"),
          updated_at: new Date("2024-04-09 10:30:00"),
        },

        // booking 4: Dũng ở phòng 5
        {
          user_id: 10,
          room_id: 5,
          booking_id: 4,
          parent_id: null,
          content:
            "Chuyến đi gia đình tuyệt nhất từ trước đến nay! Bé nhà tôi 3 tuổi thích lắm vì có nhiều không gian chạy nhảy. Buổi sáng ngồi uống trà nhìn mây dưới thung lũng, thật sự힐リング. Phải cho 5 sao!",
          rating: 5,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-04-25 15:00:00"),
          updated_at: new Date("2024-04-25 15:00:00"),
        },
        // booking 4: Hùng reply Dũng
        {
          user_id: 4,
          room_id: 5,
          booking_id: 4,
          parent_id: null,
          content:
            "Gia đình bạn dễ thương quá! Lần sau lên Sapa mùa ruộng bậc thang vàng (tháng 9-10) nha, đẹp hơn nhiều!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-04-25 17:00:00"),
          updated_at: new Date("2024-04-25 17:00:00"),
        },

        // booking 5: Thanh Em ở phòng 7
        {
          user_id: 11,
          room_id: 7,
          booking_id: 5,
          parent_id: null,
          content:
            "Chị Hoa nấu ăn ngon KHÔNG TƯỞNG! Bữa sáng có phở bò tái, bánh cuốn nóng hổi — tôi ăn hết sạch rồi xin thêm. Phòng nhỏ xinh, ấm áp, cảm giác như ở nhà mình. 10/10 recommend!",
          rating: 5,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-01 10:00:00"),
          updated_at: new Date("2024-05-01 10:00:00"),
        },
        // booking 5: Hoa reply Thanh Em
        {
          user_id: 5,
          room_id: 7,
          booking_id: 5,
          parent_id: null,
          content:
            "Cảm ơn em! Chị vui lắm vì em thích phở của chị. Lần sau lên HN chị nấu bún chả và chả cá Lã Vọng cho em thử nhé!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-01 12:00:00"),
          updated_at: new Date("2024-05-01 12:00:00"),
        },

        // booking 6: Giang ở phòng 9
        {
          user_id: 12,
          room_id: 9,
          booking_id: 6,
          parent_id: null,
          content:
            'Đúng là "cổng trời vào Tràng An". Buổi sáng sương mù, núi đá vôi thấp thoáng — tôi ngồi ở ban công uống cà phê mà tưởng mình đang trong bức tranh. Anh Đức cho thuê xe đạp miễn phí, rất tuyệt!',
          rating: 5,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-06 14:00:00"),
          updated_at: new Date("2024-05-06 14:00:00"),
        },
        // booking 6: Đức reply Giang
        {
          user_id: 6,
          room_id: 9,
          booking_id: 6,
          parent_id: null,
          content:
            "Cảm ơn Giang đã đến! Lần sau sang sẽ kết hợp đi Cúc Phương hoặc Vân Long thêm nha!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-06 16:00:00"),
          updated_at: new Date("2024-05-06 16:00:00"),
        },

        // booking 7: Hảo ở phòng 3
        {
          user_id: 13,
          room_id: 3,
          booking_id: 7,
          parent_id: null,
          content:
            "Nhóm 3 đứa đi chơi, ở nhà kiểu cũ phong cách Pháp thuộc này rất có hồn. Cô Lan cực kỳ thân thiện, kể chuyện lịch sử Hà Nội cho nghe cả buổi tối. Gần Lăng Bác, Bảo tàng Quân sự — tham quan thuận tiện.",
          rating: 4,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-13 09:00:00"),
          updated_at: new Date("2024-05-13 09:00:00"),
        },
        // booking 7: Lan reply Hảo
        {
          user_id: 3,
          room_id: 3,
          booking_id: 7,
          parent_id: null,
          content:
            "Cảm ơn các bạn trẻ đã ghé! Cô rất vui được kể chuyện về Hà Nội ngày xưa. Lần sau đến nhớ báo trước, cô nấu bữa cơm Bắc đón nhé!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-13 11:00:00"),
          updated_at: new Date("2024-05-13 11:00:00"),
        },

        // booking 8: Ivan (user 14) ở phòng 6
        {
          user_id: 14,
          room_id: 6,
          booking_id: 8,
          parent_id: null,
          content:
            "This is the most authentic experience I have had in Vietnam! No wifi, no TV, just nature and a wonderful Nung family. I helped harvesting tea leaves in the morning. The bamboo bungalow is so peaceful.",
          rating: 5,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-19 20:00:00"),
          updated_at: new Date("2024-05-19 20:00:00"),
        },
        // booking 8: Hùng reply Ivan
        {
          user_id: 4,
          room_id: 6,
          booking_id: 8,
          parent_id: null,
          content:
            "Thank you Ivan! You were an amazing guest who respected local culture. You are welcome back anytime!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-20 08:00:00"),
          updated_at: new Date("2024-05-20 08:00:00"),
        },

        // booking 9: Minh reply Mai
        {
          user_id: 2,
          room_id: 1,
          booking_id: 9,
          parent_id: null,
          content:
            "Cảm ơn Mai! Cảm ơn góp ý về điều hoà, tôi sẽ thay cái mới trong tháng này. Lần sau ghé lại nhé, giá ưu đãi cho khách quay lại!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-23 10:00:00"),
          updated_at: new Date("2024-05-23 10:00:00"),
        },

        // booking 10: Đức reply Nam
        {
          user_id: 6,
          room_id: 10,
          booking_id: 10,
          parent_id: null,
          content:
            "Cảm ơn anh Nam! Lần sau đến Ninh Bình nhớ ghé lại, tôi sẽ tặng thêm tour xe đạp Tràng An miễn phí cho đoàn đông nhé!",
          rating: null,
          is_edited: 0,
          deleted_at: null,
          created_at: new Date("2024-05-28 09:00:00"),
          updated_at: new Date("2024-05-28 09:00:00"),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
