const { checkSchema } = require("express-validator");
const handlerError = require("./handlerError");

const userFields = {
  first_name: { notEmpty: { errorMessage: "Họ không được để trống." } },
  last_name: { notEmpty: { errorMessage: "Tên không được để trống." } },
  email: {
    notEmpty: { errorMessage: "Email không được để trống." },
    isEmail: { errorMessage: "Email không hợp lệ." },
  },
  role_id: { notEmpty: { errorMessage: "Vui lòng chọn vai trò." } },
};

exports.createUserValidator = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  ...checkSchema({
    ...userFields,
    password: {
      notEmpty: { errorMessage: "Mật khẩu không được để trống." },
      isLength: { options: { min: 8 }, errorMessage: "Mật khẩu tối thiểu 8 ký tự." },
    },
    confirm_password: {
      custom: {
        options: (value, { req }) => value === req.body.password,
        errorMessage: "Mật khẩu xác nhận không khớp.",
      },
    },
  }),
  handlerError,
];

exports.updateUserValidator = [
  (req, res, next) => {
    res.view = "admin/users/edit";
    next();
  },
  ...checkSchema({
    ...userFields,
    password: {
      optional: true,
      isLength: { options: { min: 8 }, errorMessage: "Mật khẩu tối thiểu 8 ký tự." },
    },
  }),
  handlerError,
];
