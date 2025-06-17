const queue = require("@/utils/queue");
const usersService = require("@/services/users.service");
const { verifyToken } = require("@/utils/jwt");

exports.showRegisterForm = async (req, res) => {
  res.render("admin/auth/register", {
    layout: "admin/layout/auth",
    old: {},
    errors: {},
  });
};

exports.register = async (req, res) => {
  const user = await usersService.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  queue.dispatch("sendVerifyEmailJob", {
    userId: user.id,
    type: "verify-email",
  });
  res.flash({
    type: "success",
    message: `Chúng tôi đã gửi một email xác thực tới ${user.email}. Hãy kiểm tra inbox và xác minh để tiếp tục.`,
  });
  res.redirect("/admin/auth/register");
};

exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login", {
    layout: "admin/layout/auth",
    old: {},
    errors: {},
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.getByEmailAndPassword(email, password);

  if (user) {
    req.session.userId = user.id;
    res.flash({
      type: "success",
      message: "Đăng nhập thành công",
    });
    return res.redirect("/admin");
  }
};

exports.logout = async (req, res) => {
  delete req.session.userId;
  return res.redirect("/admin/auth/login");
};

exports.showForgotForm = async (req, res) => {
  res.render("admin/auth/forgotPassword", {
    layout: "admin/layout/auth",
  });
};

exports.handleForgotPassword = async (req, res) => {
  const user = await usersService.getByEmail(req.body.email);
  if (!user) {
    res.flash({
      type: "error",
      message: "Không thể tìm thấy người dùng với email này",
    });
    res.redirect("/admin/auth/forgot-password");
  }
  queue.dispatch("sendVerifyEmailJob", {
    userId: user.id,
    type: "reset-password",
  });
  res.flash({
    type: "info",
    message: `Chúng tôi đã gửi một email xác thực tới ${user.email}. Hãy kiểm tra inbox và xác minh để tiếp tục.`,
  });
  res.redirect("/admin/auth/forgot-password");
};

exports.showResetForm = async (req, res) => {
  const token = req.query.token;
  console.log(token);
  res.render("admin/auth/resetPassword", {
    layout: "admin/layout/auth",
    token,
  });
};

exports.handleResetPassword = async (req, res) => {
  const token = req.body.token;
  console.log(token);
  const verify = verifyToken(token);

  if (!verify.success) {
    res.flash({
      type: "error",
      message: "Liên kết xác minh không hợp lệ hoặc đã hết hạn",
    });
  }
  console.log(verify);
  const userId = verify.data.userId;

  const user = await usersService.getById(userId);
  if (!user || user.id !== userId) {
    res.flash({
      type: "error",
      message: "Người dùng không tồn tại hoặc thông tin không khớp.",
    });
    return res.redirect("/admin/auth/forgot-password");
  }

  await usersService.update(userId, {
    password: req.body.newPassword,
    updated_at: new Date(),
  });
  res.flash({
    type: "success",
    message: "Bạn đã cập nhật mật khẩu mới thành công, xin vui lòng đăng nhập",
  });
  res.redirect("/admin/auth/login");
};

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  const verify = verifyToken(token);
  if (!verify.success) {
    res.flash({
      type: "error",
      message: "Liên kết xác minh không hợp lệ hoặc đã hết hạn",
    });
  }

  const userId = verify.data.userId;
  const user = await usersService.getById(userId);
  if (user.verified_at) {
    res.flash({
      type: "info",
      message: "Tài khoản đã được xác minh trước đó, giờ bạn có thể đăng nhập",
    });
    return res.redirect("/admin/auth/login");
  }
  await usersService.update(userId, {
    verified_at: new Date(),
  });

  return res.redirect("/admin/auth/login");
};
