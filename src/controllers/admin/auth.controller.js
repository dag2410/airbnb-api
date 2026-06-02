const AdminUserService = require("@/services/admin/user.admin.service");
const asyncHandler = require("@/utils/asyncHandler");
const queue = require("@/utils/queue");
const { verifyToken } = require("@/utils/jwt");

exports.showLoginForm = asyncHandler(async (req, res) => {
  res.render("admin/auth/login", {
    layout: "admin/layout/auth",
    title: "Đăng nhập Admin",
    old: {},
    errors: {},
  });
});

exports.login = asyncHandler(async (req, res) => {
  req.session.userId = req.user.id;
  res.flash({ type: "success", message: "Đăng nhập thành công." });
  return res.redirect("/admin");
});

exports.logout = asyncHandler(async (req, res) => {
  delete req.session.userId;
  res.flash({ type: "info", message: "Bạn đã đăng xuất." });
  return res.redirect("/admin/auth/login");
});

exports.showForgotForm = asyncHandler(async (req, res) => {
  res.render("admin/auth/forgotPassword", {
    layout: "admin/layout/auth",
    title: "Quên mật khẩu",
  });
});

exports.handleForgotPassword = asyncHandler(async (req, res) => {
  const user = await AdminUserService.getByEmail(req.body.email);
  if (!user) {
    res.flash({
      type: "error",
      message: "Không tìm thấy người dùng với email này.",
    });
    return res.redirect("/admin/auth/forgot-password");
  }

  queue.dispatch("sendVerifyEmailJob", {
    userId: user.id,
    type: "reset-password",
  });

  res.flash({
    type: "info",
    message: `Chúng tôi đã gửi email hướng dẫn tới ${user.email}.`,
  });
  res.redirect("/admin/auth/forgot-password");
});

exports.showResetForm = async (req, res) => {
  const token = req.query.token;
  res.render("admin/auth/resetPassword", {
    layout: "admin/layout/auth",
    token,
  });
};

exports.handleResetPassword = async (req, res) => {
  const token = req.body.token;
  const verify = verifyToken(token);

  if (!verify.success) {
    res.flash({
      type: "error",
      message: "Liên kết xác minh không hợp lệ hoặc đã hết hạn",
    });
  }
  const userId = verify.data.userId;

  const user = await AdminUserService.getById(userId);
  if (!user || user.id !== userId) {
    res.flash({
      type: "error",
      message: "Người dùng không tồn tại hoặc thông tin không khớp.",
    });
    return res.redirect("/admin/auth/forgot-password");
  }

  await AdminUserService.update(userId, {
    password: req.body.newPassword,
    updated_at: new Date(),
  });
  res.flash({
    type: "success",
    message: "Bạn đã cập nhật mật khẩu mới thành công, xin vui lòng đăng nhập",
  });
  res.redirect("/admin/auth/login");
};
