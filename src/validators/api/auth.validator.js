const { checkSchema } = require("express-validator");
const handlerError = require("./handlerErrors");

exports.registerValidator = [
  checkSchema({
    first_name: {
      notEmpty: true,
      errorMessage: "Tên không được để trống",
      isLength: {
        options: { min: 2, max: 50 },
        errorMessage: "Tên phải có độ dài từ 2-50 ký tự",
      },
      trim: true,
    },
    last_name: {
      notEmpty: true,
      errorMessage: "Họ không được để trống",
      isLength: {
        options: { min: 2, max: 50 },
        errorMessage: "Họ phải có độ dài từ 2-50 ký tự",
      },
      trim: true,
    },
    email: {
      notEmpty: true,
      errorMessage: "Email không được để trống",
      isEmail: {
        errorMessage: "Email không đúng định dạng",
      },
      normalizeEmail: true,
    },
    password: {
      notEmpty: true,
      errorMessage: "Mật khẩu không được để trống",
      isLength: {
        options: { min: 8 },
        errorMessage: "Mật khẩu phải có ít nhất 8 ký tự",
      },
      matches: {
        options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        errorMessage:
          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
      },
    },
    confirm: {
      notEmpty: true,
      errorMessage: "Xác nhận mật khẩu không được để trống",
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Mật khẩu xác nhận không khớp");
          }
          return true;
        },
      },
    },
  }),
  handlerError,
];

exports.loginValidator = [
  checkSchema({
    email: {
      notEmpty: true,
      errorMessage: "Email không được để trống",
      isEmail: {
        errorMessage: "Email không đúng định dạng",
      },
      normalizeEmail: true,
    },
    password: {
      notEmpty: true,
      errorMessage: "Mật khẩu không được để trống",
    },
  }),
  handlerError,
];

exports.forgotPasswordValidator = [
  checkSchema({
    email: {
      notEmpty: true,
      errorMessage: "Email không được để trống",
      isEmail: {
        errorMessage: "Email không đúng định dạng",
      },
      normalizeEmail: true,
    },
  }),
  handlerError,
];

exports.resetPasswordValidator = [
  checkSchema({
    password: {
      notEmpty: true,
      errorMessage: "Mật khẩu mới không được để trống",
      isLength: {
        options: { min: 8 },
        errorMessage: "Mật khẩu phải có ít nhất 8 ký tự",
      },
      matches: {
        options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        errorMessage:
          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
      },
    },
    confirm: {
      notEmpty: true,
      errorMessage: "Xác nhận mật khẩu không được để trống",
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Mật khẩu xác nhận không khớp");
          }
          return true;
        },
      },
    },
  }),
  handlerError,
];
