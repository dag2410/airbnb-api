const transporter = require("@/configs/mail");
const loadEmail = require("@/utils/loadEmail");
const usersService = require("@/services/users.service");
const { createToken } = require("@/utils/jwt");

async function sendVerifyEmailJob(job) {
  const { userId, type } = JSON.parse(job.payload);
  const user = await usersService.getById(userId);
  // Tạo link xác thực cho userId
  const token = createToken(
    {
      userId: user.id,
    },
    {
      expiresIn: 60 * 60 * 12,
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
  });

  // Update thời gian gửi email
  await usersService.update(userId, {
    email_sent_at: new Date(),
  });
}

module.exports = sendVerifyEmailJob;
