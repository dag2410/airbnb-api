const transporter = require("@/configs/mail");
const loadEmail = require("@/utils/loadEmail");
const { createToken } = require("@/utils/jwt");
const { User } = require("@/models");
const {
  EMAIL_VERIFY_TOKEN_EXPIRES_IN,
  FRONTEND_URL,
} = require("@/configs/auth");

async function sendVerifyEmailJob(job) {
  const now = new Date();
  const { userId, type } = JSON.parse(job.payload);
  const user = await User.findByPk(userId);
  // Tạo link xác thực cho userId
  const token = createToken(
    {
      userId: user.id,
    },
    {
      expiresIn: EMAIL_VERIFY_TOKEN_EXPIRES_IN,
    },
  );

  const baseUrl = FRONTEND_URL;
  const allowType = ["verify-email", "reset-password"];
  const path = allowType.includes(type) ? type : "";
  const verifyUrl = `${baseUrl}/${path}?token=${token}`;

  // Load email từ template ejs

  const emailTemplate = {
    "verify-email": "auth/verification",
    "reset-password": "auth/reset-password",
    "reset-success": "auth/reset-success",
  };

  const data = { token, userId, user, verifyUrl };
  const templatePath = emailTemplate[path] || "auth/verification";
  const template = await loadEmail(templatePath, data);

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
    },
  );
}

module.exports = sendVerifyEmailJob;
