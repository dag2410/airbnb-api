const notificationService = require("@/services/notification.service");
const { success, error } = require("@/utils/response");

exports.index = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await notificationService.getAll(user_id);
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const actor_id = req.user.id;
    const { type, content, notifiable_type, notifiable_id, receiver_id } =
      req.body;
    const result = await notificationService.createNotification(receiver_id, {
      type,
      content,
      notifiable_type,
      notifiable_id,
      actor_id,
    });
    success(res, 201, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.destroy = async (req, res) => {
  try {
    const user_id = req.user.id;
    const notifiable_id = req.notification.id;
    const result = await notificationService.deleteNotification(
      user_id,
      notifiable_id
    );
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = req.user.id;
    const result = await notificationService.markAsRead(user_id, id);
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.bulkUpdate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await notificationService.markAllAsRead(user_id);
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};
