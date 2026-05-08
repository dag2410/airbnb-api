const { checkSchema } = require("express-validator");
const handlerError = require("./handlerErrors");

exports.createBookingValidator = [
  checkSchema({
    room_id: {
      in: ["body"],
      notEmpty: {
        errorMessage: "room_id không được để trống",
      },
      isInt: {
        errorMessage: "room_id phải là số",
      },
      toInt: true,
    },

    check_in_date: {
      in: ["body"],
      notEmpty: {
        errorMessage: "check_in_date không được để trống",
      },
      isISO8601: {
        errorMessage:
          "check_in_date phải đúng định dạng YYYY-MM-DD hoặc phải có thật",
      },
      toDate: true,
    },

    check_out_date: {
      in: ["body"],
      notEmpty: {
        errorMessage: "check_out_date không được để trống",
      },
      isISO8601: {
        errorMessage:
          "check_out_date phải đúng định dạng YYYY-MM-DD hoặc phải có thật",
      },
      toDate: true,
    },
  }),

  (req, res, next) => {
    const { check_in_date, check_out_date } = req.body;

    if (check_in_date && check_out_date) {
      const now = new Date();

      if (new Date(check_in_date) >= new Date(check_out_date)) {
        return res.status(400).json({
          success: false,
          message: "check_in_date phải nhỏ hơn check_out_date",
        });
      }

      if (new Date(check_in_date) < now) {
        return res.status(400).json({
          success: false,
          message: "Không thể đặt ngày trong quá khứ",
        });
      }
    }

    next();
  },

  handlerError,
];

exports.checkAvailabilityValidator = [
  checkSchema({
    room_id: {
      in: ["body"],
      notEmpty: {
        errorMessage: "room_id không được để trống",
      },
      isInt: {
        errorMessage: "room_id phải là số",
      },
      toInt: true,
    },

    check_in_date: {
      in: ["body"],
      notEmpty: {
        errorMessage: "check_in_date không được để trống",
      },
      isISO8601: {
        errorMessage: "check_in_date không hợp lệ",
      },
      toDate: true,
    },

    check_out_date: {
      in: ["body"],
      notEmpty: {
        errorMessage: "check_out_date không được để trống",
      },
      isISO8601: {
        errorMessage: "check_out_date không hợp lệ",
      },
      toDate: true,
    },
  }),

  (req, res, next) => {
    const { check_in_date, check_out_date } = req.body;

    if (new Date(check_in_date) >= new Date(check_out_date)) {
      return res.status(400).json({
        success: false,
        message: "Khoảng thời gian không hợp lệ",
      });
    }

    next();
  },

  handlerError,
];

exports.cancelBookingValidator = [
  checkSchema({
    booking: {
      in: ["params"],
      notEmpty: {
        errorMessage: "booking_id không được để trống",
      },
      isInt: {
        errorMessage: "bookingId phải là số",
      },
      toInt: true,
    },
  }),
  handlerError,
];
