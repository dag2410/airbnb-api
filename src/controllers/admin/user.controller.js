const adminUserService = require("@/services/admin/user.admin.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const result = await adminUserService.paginate(req.query);

  res.render("admin/users/index", {
    title: "Quản lý người dùng",
    users: result.data,
    pagination: result.pagination,
    filters: result.filters,
    roleOptions: await adminUserService.listRoles(),
  });
});

exports.show = asyncHandler(async (req, res) => {
  const user = await adminUserService.getById(req.params.id);
  if (!user) {
    res.flash({ type: "error", message: "Không tìm thấy người dùng." });
    return res.redirect("/admin/users");
  }

  res.render("admin/users/show", {
    title: "Chi tiết người dùng",
    user,
  });
});

exports.create = asyncHandler(async (req, res) => {
  const roles = await adminUserService.listRoles();
  res.render("admin/users/create", {
    title: "Tạo người dùng",
    roles,
    old: req.body || {},
    errors: {},
  });
});

exports.store = asyncHandler(async (req, res) => {
  const { confirm_password, ...body } = req.body;
  await adminUserService.create(body);
  res.flash({ type: "success", message: "Tạo người dùng thành công." });
  res.redirect("/admin/users");
});

exports.edit = asyncHandler(async (req, res) => {
  const user = await adminUserService.getById(req.params.id);
  if (!user) {
    res.flash({ type: "error", message: "Không tìm thấy người dùng." });
    return res.redirect("/admin/users");
  }

  const roles = await adminUserService.listRoles();
  res.render("admin/users/edit", {
    title: "Sửa người dùng",
    user,
    roles,
    old: user,
    errors: {},
  });
});

exports.update = asyncHandler(async (req, res) => {
  const { confirm_password, ...body } = req.body;
  const user = await adminUserService.update(req.params.id, body);

  if (!user) {
    res.flash({ type: "error", message: "Không tìm thấy người dùng." });
    return res.redirect("/admin/users");
  }

  res.flash({ type: "success", message: "Cập nhật người dùng thành công." });
  res.redirect("/admin/users");
});

exports.destroy = asyncHandler(async (req, res) => {
  const deleted = await adminUserService.remove(req.params.id);

  if (deleted) {
    res.flash({ type: "success", message: "Xóa người dùng thành công." });
  } else {
    res.flash({ type: "error", message: "Không tìm thấy người dùng để xóa." });
  }

  res.redirect("/admin/users");
});
