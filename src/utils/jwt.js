const jwt = require("jsonwebtoken");

//node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

const MAIL_JWT_SECRET = process.env.MAIL_JWT_SECRET;
exports.createToken = function (payload, options) {
  const token = jwt.sign(payload, MAIL_JWT_SECRET, options);
  return token;
};

exports.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, MAIL_JWT_SECRET);
    return {
      success: true,
      data: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
