const { Review, User, Room, Booking } = require("@/models");
const notificationService = require("./notification.service");
const pusher = require("@/configs/pusher");

class ReviewsService {
  async getAll() {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Review,
          as: "reply",
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return reviews;
  }

  async getById(id) {
    const review = await Review.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Room,
          as: "room",
        },
        {
          model: Review,
          as: "reply",
        },
      ],
    });
    return review;
  }

  async createReview(data) {
    // kiểm tra nếu là reply thì chỉ dc reply 1 lần
    if (data.parent_id) {
      const parentReview = await Review.findOne({
        where: { id: data.parent_id },
      });
      if (!parentReview) throw new Error("Review cha không tồn tại!");
      const alreadyReplied = await Review.findOne({
        where: { parent_id: data.parent_id },
      });
      if (alreadyReplied) {
        throw new Error("Review này đã có phản hồi rồi, không thể reply thêm!");
      }
    }
    const reviewExists = await Review.findOne({
      where: {
        booking_id: data.booking_id,
        user_id: data.user_id,
      },
    });
    if (reviewExists && !data.parent_id) {
      throw new Error("Bạn đã đánh giá cho phòng lần này rồi!");
    }
    const review = await Review.create(data);

    // Cập nhật booking là đã đánh giá
    const bookingIsReviewed = await Booking.findByPk(data.booking_id);
    if (bookingIsReviewed) {
      await bookingIsReviewed.update({ is_reviewed: true });
    }
    // const fullReview = await Review.findByPk(review.id, {
    //   include: [
    //     {
    //       model: User,
    //       as: "author",
    //       attributes: ["id", "username", "avatar"],
    //     },
    //   ],
    // });

    // await pusher.trigger(`room-${review.room_id}`, "new-review", {
    //   review: fullReview,
    // });

    // let recipientId = null;
    // let notificationType = "";

    // if (data.parent_id) {
    //   const parentReview = await Review.findByPk(data.parent_id);
    //   if (parentReview && parentReview.user_id !== data.user_id) {
    //     recipientId = parentReview.user_id;
    //     notificationType = "reply";
    //   }
    // } else {
    //   const room = await Room.findByPk(review.room_id);
    //   if (room && room.user_id !== data.user_id) {
    //     recipientId = room.user_id;
    //     notificationType = "review";
    //   }
    // }

    // if (recipientId) {
    //   await notificationService.create(recipientId, {
    //     type: notificationType,
    //     title: `${
    //       notificationType === "reply" ? " replied to" : " reviewed on"
    //     } your ${notificationType === "reply" ? "review" : "room"}`,
    //     notifiable_type: "review",
    //     notifiable_id: review.id,
    //     actor_id: data.user_id,
    //   });

    //   await pusher.trigger(`user-${recipientId}`, "new-notification", {
    //     action: notificationType,
    //     review_id: review.id,
    //     room_id: review.room_id,
    //     user_id: data.user_id,
    //   });
    // }

    return review;
  }

  async updateReview(id, data) {
    const review = await Review.findByPk(id);
    if (!review) throw new Error("Không tìm thấy review");

    await review.update(data);

    const updatedReview = await Review.findByPk(id, {
      include: [
        { model: User, as: "author", attributes: ["id", "username", "avatar"] },
      ],
    });

    await pusher.trigger(`room-${review.room_id}`, "update-comment", {
      comment: updatedReview,
    });

    return updatedReview;
  }

  async removeReview(id) {
    const review = await Review.findByPk(id);
    if (!review) return null;

    const room = await review.room_id;

    await pusher.trigger(`room-${review.room_id}`, "delete-review", {
      review_id: review.id,
    });

    if (room) {
      await notificationService.deleteNotification({
        user_id: room.user_id,
        notifiable_id: review.id,
      });
      await pusher.trigger(`user-${room.user_id}`, "new-notification", {
        action: "delete_review",
        review_id: review.id,
        room_id: review.room_id,
        user_id: review.user_id,
      });
    }

    await review.destroy();
    return review;
  }
}

module.exports = new ReviewsService();
