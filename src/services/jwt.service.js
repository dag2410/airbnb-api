const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  TOKEN_TYPE,
  MAIL_JWT_SECRET,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN,
} = require("@/configs/auth");

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return {
    userId,
    accessToken: token,
    tokenType: TOKEN_TYPE,
    expiresIn: JWT_EXPIRES_IN,
  };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const generateEmailVerifyToken = (userId) => {
  return jwt.sign({ userId }, MAIL_JWT_SECRET, {
    expiresIn: EMAIL_VERIFY_TOKEN_EXPIRES_IN,
  });
};

const verifyEmailVerifyToken = (token) => {
  return jwt.verify(token, MAIL_JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateEmailVerifyToken,
  verifyEmailVerifyToken,
};
