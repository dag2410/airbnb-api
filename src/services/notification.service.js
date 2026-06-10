const { Notification, User, sequelize } = require("@/models");

class NotificationService {
  async getAll(user_id, page = 1, limit = 10) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const offsetNum = (pageNum - 1) * limitNum;
    const { rows, count } = await Notification.findAndCountAll({
      distinct: true,
      limit: limitNum,
      offset: offsetNum,
      include: [
        {
          model: User,
          as: "actor",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: User,
          as: "receivers",
          where: { id: user_id },
          attributes: ["id"],
          through: { attributes: ["read_at"] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return {
      rows,
      pagination: {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPage: Math.ceil(count / limitNum),
      },
    };
  }

  async getById(notifiable_id) {
    return await Notification.findOne({
      where: {
        id: notifiable_id,
      },
    });
  }

  async createNotification(receiver_id, data) {
    const { receiver_id: _, ...notificationData } = data;

    const notification = await Notification.create(notificationData);
    await notification.addReceiver(receiver_id);
    return notification;
  }

  async deleteNotification(user_id, notifiable_id) {
    const notification = await Notification.findOne({
      where: { id: notifiable_id },
      include: [
        {
          model: User,
          as: "receivers",
          where: { id: user_id },
          attributes: ["id"],
        },
      ],
    });

    if (!notification) {
      return {
        message: "Thông báo không tồn tại hoặc bạn không có quyền xóa.",
      };
    }

    await notification.removeReceiver(user_id);

    return {
      message: "Thông báo đã bị xóa khỏi danh sách của bạn.",
      id: notifiable_id,
    };
  }

  async markAsRead(user_id, notification_id) {
    const notification = await Notification.findByPk(notification_id, {
      include: [
        {
          model: User,
          as: "receivers",
          where: { id: user_id },
          through: { attributes: ["read_at"] },
        },
      ],
    });

    if (!notification) {
      throw new Error("Thông báo này không phải của bạn.");
    }

    await sequelize.query(
      `UPDATE user_notification 
   SET read_at = :readAt
   WHERE user_id = :userId AND notification_id = :notificationId`,
      {
        replacements: {
          readAt: new Date(),
          userId: user_id,
          notificationId: notification_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      },
    );
    return {
      message: "Thông báo đã được đọc.",
      id: notification_id,
      user_id: user_id,
    };
  }

  async markAllAsRead(user_id) {
    await sequelize.query(
      `UPDATE user_notification
     SET read_at = :readAt
     WHERE user_id = :userId AND read_at IS NULL`,
      {
        replacements: {
          readAt: new Date(),
          userId: user_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      },
    );

    return { message: "Tất cả thông báo đã được đọc." };
  }
}

module.exports = new NotificationService();
