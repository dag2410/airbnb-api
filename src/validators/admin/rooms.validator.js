const { checkSchema } = require("express-validator");
const handlerError = require("./handlerError");

exports.createPostValidator = [
  (req, res, next) => {
    res.view = "admin/posts/create";
    next();
  },
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Title không được để trống.",
    },
    content: {
      notEmpty: true,
      errorMessage: "Content không được để trống.",
    },
    description: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerError,
];

exports.updatePostValidator = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Title không được để trống.",
    },
    content: {
      notEmpty: true,
      errorMessage: "Content không được để trống.",
    },
    description: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerError,
];

exports.createCommentPostValidator = [
  checkSchema({
    content: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerError,
];
