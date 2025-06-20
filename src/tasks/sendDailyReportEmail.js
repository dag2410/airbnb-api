const usersService = require("@/services/users.service");
const transporter = require("@/configs/mail");
async function sendDailyResortEmail() {
  const usersCount = await usersService.count();
  const newUsersCount = await usersService.getCountNewUser();
  4;

  await transporter.sendMail({
    from: process.env.MAIL_SENDER_FROM,
    subject: "send daily email",
    to: "dagger241004abc@gmail.com",
    html: `
    <h1> Daily report</h1>
    <p>User count: ${usersCount}</p>
    <p>New user count: ${newUsersCount}</p>`,
  });
}

module.exports = sendDailyResortEmail;
