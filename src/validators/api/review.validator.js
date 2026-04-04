const { checkSchema } = require("express-validator");
const handlerError = require("./handlerErrors");

exports.createReviewValidator = [
  checkSchema({
    content: {
      notEmpty: true,
      trim: true,
      errorMessage: "Nội dung bình luận không được để trống",
    },
  }),
  handlerError,
];

exports.updateReviewValidator = [
  checkSchema({
    content: {
      optional: true,
      notEmpty: true,
      trim: true,
      errorMessage: "Nội dung không được để trống",
    },
  }),
  handlerError,
];
