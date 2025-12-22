const authService = require("@/services/auth.service");
const { success, error } = require("@/utils/response");

exports.profile = async (req, res) => {
  try {
    success(res, 200, req.user);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const tokenData = await authService.register(
      email,
      password,
      first_name,
      last_name
    );
    success(res, 201, tokenData);
  } catch (err) {
    error(res, 401, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokenData = await authService.login(email, password);
    res.cookie("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    const { refresh_token, ...data } = tokenData;
    success(res, 200, data);
  } catch (err) {
    error(res, 403, err.message);
  }
};

exports.logout = async (req, res) => {
  try {
    const result = await authService.logout(req.user.id);
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    success(res, 200, result);
  } catch (err) {
    error(res, 401, err.message);
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      error(res, 403, "Không tìm thấy refresh token. Vui lòng đăng nhập lại.");
    }
    const tokenData = await authService.refreshAccessToken(refreshToken);
    res.cookie("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    const { refresh_token, ...data } = tokenData;
    success(res, 200, data);
  } catch (err) {
    error(res, 403, err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    success(
      res,
      200,
      "Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn."
    );
  } catch (err) {
    error(res, 400, err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const { password } = req.body;
    await authService.resetPassword(password, token);
    success(res, 200, "Mật khẩu của bạn đã được đặt lại thành công.");
  } catch (err) {
    error(res, 400, err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) error(res, 400, "Xác thực thất bại.");
    await authService.verifyEmail(token);
    success(res, 200, "Xác thực email thành công.");
  } catch (err) {
    error(res, 400, err.message);
  }
};

exports.verifyResetEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) error(res, 400, "Xác thực thất bại.");
    await authService.verifyResetEmail(token);
    success(res, 200, "Xác thực email thành công.");
  } catch (err) {
    error(res, 400, err.message);
  }
};

exports.googleRedirect = async (req, res) => {
  const url = authService.getGoogleOAuthUrl();
  console.log("GOOGLE OAUTH URL:", url);

  return res.redirect(url);
};

exports.googleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Google OAuth code not found",
      });
    }

    // tạm thời chỉ trả code để test
    return res.json({
      message: "Google callback OK",
      code,
    });
  } catch (err) {
    next(err);
  }
};
