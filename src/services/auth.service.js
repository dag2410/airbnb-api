const { hash, compare } = require("bcrypt");
const { User, RefreshToken } = require("@/models");
const jwtService = require("@/services/jwt.service");
const refreshTokenService = require("@/services/refreshToken.service");
const queue = require("@/utils/queue");
const { error } = require("@/utils/response");
const { default: axios } = require("axios");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_SECRET,
} = require("@/configs/auth");
const generateUsername = require("@/utils/generateUsername");

class AuthService {
  async register(email, password, firstName, lastName) {
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("Email đã được đăng ký. Xin vui lòng đăng nhập.");
    }

    const newUsername = await generateUsername(lastName);

    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      username: newUsername,
      provider: "local",
    });

    queue.dispatch("sendVerifyEmailJob", {
      userId: user.id,
      type: "verify-email",
    });

    return jwtService.generateAccessToken(user.id);
  }

  async login(email, password) {
    const now = new Date();
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user)
      throw new Error(
        "Tài khoản chưa được đăng ký. Vui lòng đăng ký tài khoản.",
      );

    if (!user.password) {
      throw new Error(
        "Tài khoản này đã được đăng nhập bằng Google trước đó! Hãy đăng nhập bằng Google.",
      );
    }

    const isValid = await compare(password, user?.password);
    if (!isValid) throw new Error("Mật khẩu không đúng. Vui lòng nhập lại.");

    if (!user.verified_at) {
      if (now - user.email_send_at > 10 * 60 * 1000) {
        queue.dispatch("sendVerifyEmailJob", {
          userId: user.id,
          type: "verify-email",
        });
        throw new Error(
          "Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra email để xác thực.",
        );
      }
      throw new Error(
        "Bạn đã yêu cầu xác thực email. Vui lòng check email ngay nhé để xác thực tài khoản.",
      );
    }

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
      },
    );

    return {
      ...tokenData,
      user: user,
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
    const now = new Date();
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("Email không tồn tại.");

    if (now - user.email_send_at < 10 * 60 * 1000) {
      throw new Error(
        "Bạn đã gửi yêu cầu xác thực email. Vui lòng đợi trong vài phút trước khi gửi lại",
      );
    }

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
      },
    );
  }

  async refreshAccessToken(refreshTokenString) {
    const refreshToken =
      await refreshTokenService.findValidRefreshToken(refreshTokenString);
    if (!refreshToken) {
      error(res, 403, "Refresh token không hợp lệ. Vui lòng đăng nhập lại.");
    }
    const tokenData = jwtService.generateAccessToken(refreshToken.user_id);
    await refreshTokenService.deleteRefreshToken(refreshToken);
    const newRefreshToken = await refreshTokenService.createRefreshToken(
      refreshToken.user_id,
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
        },
      );
    } catch (err) {
      throw new Error(
        "Xác thực thất bại. Token có vẻ đã được sử dụng hoặc hết hạn.",
      );
    }
  }

  async verifyResetEmail(token) {
    try {
      return jwtService.verifyEmailVerifyToken(token);
    } catch (err) {
      throw new Error(
        "Xác thực thất bại. Token có vẻ đã được sử dụng hoặc hết hạn.",
      );
    }
  }

  getGoogleOAuthUrl() {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "openid profile email",
      access_type: "offline",
      prompt: "consent",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async getOauthGoogleToken(code) {
    const params = new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    });
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return tokenRes.data;
  }

  async getGoogleUserInfo({ id_token, access_token }) {
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        params: {
          access_token,
          alt: "json",
        },
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      },
    );

    const { email, family_name, given_name, picture } = userRes.data;
    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      user = await User.create({
        email: email,
        last_name: family_name,
        first_name: given_name,
        username: await generateUsername(family_name),
        avatar: picture,
        provider: "google",
        verified_at: new Date(),
        last_login: new Date(),
      });
    }

    user.update({
      last_login: new Date(),
    });

    return user;
  }
}

// {
//   id: '101178117173236220612',
//   email: 'dagger241004abc@gmail.com',
//   verified_email: true,
//   name: 'Đăng Dương Hải',
//   given_name: 'Đăng',
//   family_name: 'Dương Hải',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocKuV5JH1ErAD2AEH-oVl0PNxrGsSKnvrfX4P4mWAXLPGFedoAUf=s96-c'
// }

module.exports = new AuthService();
