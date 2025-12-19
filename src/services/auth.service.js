const { hash, compare } = require("bcrypt");
const { User, RefreshToken } = require("@/models");
const jwtService = require("@/services/jwt.service");
const refreshTokenService = require("@/services/refreshToken.service");
const queue = require("@/utils/queue");

class AuthService {
  async register(email, password, firstName, lastName) {
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser)
      throw new Error(
        "Email đã được đăng kí trước đó, xin vui lòng đăng nhập."
      );

    // username
    const base = lastName ? lastName.toLowerCase().replace(/\s+/g, "") : "user";
    let newUsername;
    let isTaken = true;

    while (isTaken) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      newUsername = `${base}${randomNum}`;
      const existingName = await User.findOne({
        where: { username: newUsername },
      });

      if (!existingName) {
        isTaken = false;
      }
    }

    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      username: newUsername,
    });

    queue.dispatch("sendVerifyEmailJob", {
      userId: user.id,
      type: "verify-email",
    });

    return jwtService.generateAccessToken(user.id);
  }

  async login(email, password) {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) throw new Error("Tài khoản này chưa đăng kí.");
    const isValid = await compare(password, user?.password);
    if (!isValid) throw new Error("Mật khẩu không đúng. Vui lòng nhập lại.");
    // if (!user.verified_at) {
    //   throw new Error(
    //     "Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra email để xác thực."
    //   );
    // }

    const tokenData = jwtService.generateAccessToken(user.id);
    const refreshToken = await refreshTokenService.createRefreshToken(user.id);
    await User.update(
      {
        last_login: new Date(),
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return {
      ...tokenData,
      refresh_token: refreshToken.token,
    };
  }

  async logout(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User không tồn tại.");
    await RefreshToken.destroy({
      where: {},
      user_id: user.id,
    });

    return { message: "Đăng xuất thành công." };
  }

  async forgotPassword(email) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("Email không tồn tại.");

    queue.dispatch("sendVerifyEmailJob", {
      userId: user.id,
      type: "reset-password",
    });
  }

  async resetPassword(password, token) {
    const { userId } = jwtService.verifyEmailVerifyToken(token);
    const user = await User.findByPk(userId);
    if (!user) throw new Error("Người dùng không tồn tại.");
    const hashedPassword = await hash(password, 10);

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  async refreshAccessToken(refreshTokenString) {
    const refreshToken = await refreshTokenService.findValidRefreshToken(
      refreshTokenString
    );
    if (!refreshToken) throw new Error("Refresh token không hợp lệ.");
    const tokenData = jwtService.generateAccessToken(refreshToken.user_id);
    await refreshTokenService.deleteRefreshToken(refreshToken);
    const newRefreshToken = await refreshTokenService.createRefreshToken(
      refreshToken.user_id
    );

    return {
      ...tokenData,
      refresh_token: newRefreshToken.token,
    };
  }

  async verifyEmail(token) {
    try {
      const verify = jwtService.verifyEmailVerifyToken(token);
      const userId = verify.userId;
      await User.update(
        {
          verified_at: new Date(),
        },
        {
          where: { id: userId },
        }
      );
    } catch (err) {
      throw new Error(
        "Xác thực thất bại. Token có vẻ đã được sử dụng hoặc hết hạn."
      );
    }
  }

  async verifyResetEmail(token) {
    try {
      return jwtService.verifyEmailVerifyToken(token);
    } catch (err) {
      throw new Error(
        "Xác thực thất bại. Token có vẻ đã được sử dụng hoặc hết hạn."
      );
    }
  }

  getGoogleOAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "openid profile email",
      access_type: "offline",
      prompt: "consent",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
}

module.exports = new AuthService();
