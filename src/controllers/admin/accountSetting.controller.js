const asyncHandler = require("@/utils/asyncHandler");
const { hash, compare } = require("bcrypt");
const AdminUserService = require("@/services/admin/user.admin.service");

exports.index = asyncHandler(async (req, res) => {
  res.render("admin/accountSettings/index", {
    title: "Cài đặt tài khoản",
    user: res.locals.auth,
    old: {},
    errors: {},
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const { first_name, last_name, phone_number, bio } = req.body;

  await AdminUserService.update(userId, {
    first_name,
    last_name,
    phone_number,
    bio,
  });

  res.flash({ type: "success", message: "Cập nhật hồ sơ thành công." });
  res.redirect("/admin/accountSettings");
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await AdminUserService.getById(req.session.userId);
  const { current_password, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    res.flash({ type: "error", message: "Mật khẩu xác nhận không khớp." });
    return res.redirect("/admin/accountSettings");
  }

  const valid = await compare(current_password, user.password);
  if (!valid) {
    res.flash({ type: "error", message: "Mật khẩu hiện tại không đúng." });
    return res.redirect("/admin/accountSettings");
  }

  const hashed = await hash(password, 10);
  await AdminUserService.update(req.session.userId, { password: hashed });

  res.flash({ type: "success", message: "Đổi mật khẩu thành công." });
  res.redirect("/admin/accountSettings");
});
