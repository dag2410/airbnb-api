const ms = require("ms");

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: ms(process.env.REFRESH_TOKEN_EXPIRES_IN),
  TOKEN_TYPE: process.env.TOKEN_TYPE,

  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER,
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS,
  MAIL_SENDER_FROM: process.env.MAIL_SENDER_FROM,
  MAIL_JWT_SECRET: process.env.MAIL_JWT_SECRET,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN,

  APP_URL: process.env.APP_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
