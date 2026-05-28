const handlerError = require("@/validators/api/handlerErrors");
const { checkSchema } = require("express-validator");

exports.createPaymentValidator = [
  checkSchema({
    booking_id: {
      in: ["body"],
      notEmpty: true,
      isInt: true,
      toInt: true,
    },
  }),
  handlerError,
];
