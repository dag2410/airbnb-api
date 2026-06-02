const { checkSchema } = require("express-validator");
const handlerError = require("./handlerError");
const adminAuthService = require("@/services/admin/auth.admin.service");

exports.loginValidator = [
  (req, res, next) => {
    res.view = "admin/auth/login";
    res.layout = "admin/layout/auth";
    next();
  },
  ...checkSchema({
    email: {
      notEmpty: { errorMessage: "Vui lòng nhập email." },
      isEmail: { errorMessage: "Email không hợp lệ." },
    },
    password: {
      notEmpty: { errorMessage: "Vui lòng nhập mật khẩu." },
      custom: {
        options: async (password, { req }) => {
          try {
            const user = await adminAuthService.login(
              req.body.email,
              password,
            );
            req.user = user;
            return true;
          } catch (err) {
            throw new Error(err.message);
          }
        },
      },
    },
  }),
  handlerError,
];
