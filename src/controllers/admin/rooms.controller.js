const adminRoomService = require("@/services/admin/room.admin.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const result = await adminRoomService.paginate(req.query);

  res.render("admin/rooms/index", {
    title: "Quản lý phòng",
    rooms: result.data,
    pagination: result.pagination,
    filters: result.filters,
  });
});

exports.show = asyncHandler(async (req, res) => {
  const room = await adminRoomService.getById(req.params.id);
  if (!room) {
    res.flash({ type: "error", message: "Không tìm thấy phòng." });
    return res.redirect("/admin/rooms");
  }

  res.render("admin/rooms/show", {
    title: room.title,
    room,
  });
});

exports.create = asyncHandler(async (req, res) => {
  res.render("admin/rooms/create", {
    title: "Tạo phòng",
    old: {},
    errors: {},
  });
});

exports.store = asyncHandler(async (req, res) => {
  const room = await adminRoomService.create(req.body);
  res.flash({ type: "success", message: "Tạo phòng thành công." });
  res.redirect(`/admin/rooms/${room.id}`);
});

exports.edit = asyncHandler(async (req, res) => {
  const room = await adminRoomService.getById(req.params.id);
  if (!room) {
    res.flash({ type: "error", message: "Không tìm thấy phòng." });
    return res.redirect("/admin/rooms");
  }

  res.render("admin/rooms/edit", {
    title: "Sửa phòng",
    room,
    old: room,
    errors: {},
  });
});

exports.update = asyncHandler(async (req, res) => {
  const room = await adminRoomService.update(req.params.id, req.body);
  if (!room) {
    res.flash({ type: "error", message: "Không tìm thấy phòng." });
    return res.redirect("/admin/rooms");
  }

  res.flash({ type: "success", message: "Cập nhật phòng thành công." });
  res.redirect(`/admin/rooms/${room.id}`);
});

exports.destroy = asyncHandler(async (req, res) => {
  const deleted = await adminRoomService.remove(req.params.id);
  if (deleted) {
    res.flash({ type: "success", message: "Xóa phòng thành công." });
  } else {
    res.flash({ type: "error", message: "Không tìm thấy phòng." });
  }
  res.redirect("/admin/rooms");
});
