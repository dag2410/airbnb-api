const roomService = require("@/services/room.service");
const { success, error } = require("@/utils/response");

exports.index = async (req, res) => {
  try {
    const { type, limit, offset } = req.query;
    const userId = req.user?.id;

    let rooms;

    switch (type) {
      case "latest":
        rooms = await roomService.getLatest(limit);
        break;

      case "trending":
        rooms = await roomService.getTrending(limit);
        break;

      case "top_rated":
        rooms = await roomService.getTopRated(limit);
        break;

      default:
        rooms = await roomService.getAll({
          limit: limit || 20,
          offset: offset || 0,
        });
        break;
    }

    success(res, 200, rooms);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.show = async (req, res) => {
  try {
    // req.room đã được attach từ attachResourceLoader
    success(res, 200, req.room);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body, req.user.id);
    success(res, 201, room);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const room = await roomService.updateRoom(
      req.room.slug,
      req.body,
      req.user.id,
    );

    if (!room) {
      error(res, 404, "Phòng không tồn tại!");
    }

    success(res, 200, room);
  } catch (err) {
    if (err.message === "FORBIDDEN") {
      error(res, 403, "Bạn không có quyền sửa phòng này!");
    }
    error(res, 500, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await roomService.deleteRoom(req.room.slug, req.user.id);

    if (!result) {
      error(res, 404, "Phòng không tồn tại!");
    }

    success(res, 200, { deleted: true, message: "Xóa phòng thành công!" });
  } catch (err) {
    if (err.message === "FORBIDDEN") {
      error(res, 403, "Forbidden");
    }
    error(res, 500, err.message);
  }
};
