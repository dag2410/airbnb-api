const transporter = require("@/configs/mail");
const loadEmail = require("@/utils/loadEmail");
const { createToken } = require("@/utils/jwt");
const { User } = require("@/models");
const { EMAIL_VERIFY_TOKEN_EXPIRES_IN } = require("@/configs/auth");

async function sendVerifyEmailJob(job) {
  const { userId, type } = JSON.parse(job.payload);
  const user = await User.findByPk(userId);
  // Tạo link xác thực cho userId
  const token = createToken(
    {
      userId: user.id,
    },
    {
      expiresIn: EMAIL_VERIFY_TOKEN_EXPIRES_IN,
    }
  );
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  const allowType = ["verify-email", "reset-password"];
  const path = allowType.includes(type) ? type : "";
  const verifyUrl = `${baseUrl}/admin/auth/${path}?token=${token}`;

  const data = { token, userId, user, verifyUrl };

  // Load email từ template ejs
  const template = await loadEmail("auth/verification", data);

  console.log(`Bắt đầu gửi email tới: ${user.email}`);

  await transporter.sendMail({
    from: process.env.MAIL_SENDER_FROM,
    subject: "Verification email",
    to: user.email,
    html: template,
    attachments: [
      {
        filename: "airbnb.png",
        path: "./public/assets/img/logo/airbnb.png",
        cid: "logo",
      },
    ],
  });

  // Update thời gian gửi email
  await User.update(
    {
      email_send_at: new Date(),
    },
    {
      where: {
        id: user.id,
      },
    }
  );
}

module.exports = sendVerifyEmailJob;
