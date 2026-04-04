const { checkSchema } = require("express-validator");
const handlerError = require("./handlerErrors");

exports.createUserValidator = [
  checkSchema({
    name: {
      notEmpty: true,
      errorMessage: "Name không được để trống.",
    },

    email: {
      notEmpty: {
        errorMessage: "Email không được để trống.",
      },
      isEmail: {
        errorMessage: "Bạn điền không phải là email.",
      },
    },
    password: {
      notEmpty: true,
      errorMessage: "Mật khẩu không được để trống.",
    },
    phone: {
      notEmpty: true,
      errorMessage: "Số điện thoại không được để trống.",
    },
    address: {
      notEmpty: true,
      errorMessage: "Địa chỉ không được để trống.",
    },
    username: {
      notEmpty: true,
      errorMessage: "Username không được để trống.",
    },
    confirm_password: {
      notEmpty: true,
      errorMessage: "Nhập lại mật khẩu đã nhập trước đó.",
    },
  }),
  handlerError,
];

exports.updateUserValidator = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này không được để trống.",
    },

    content: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này không được để trống.",
    },
    description: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này không được để trống.",
    },
  }),
  handlerError,
];
