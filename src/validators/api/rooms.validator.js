const { checkSchema } = require("express-validator");
const handlerError = require("./handlerErrors");

exports.createRoomValidator = [
  checkSchema({
    title: {
      notEmpty: { errorMessage: "Tiêu đề không được để trống" },
      trim: true,
    },
    description: {
      notEmpty: { errorMessage: "Mô tả không được để trống" },
      trim: true,
    },
    introduce: {
      optional: true,
      trim: true,
    },
    property_type: {
      notEmpty: { errorMessage: "Loại chỗ ở không được để trống" },
      isIn: {
        options: [["apartment", "hotel_room", "house"]],
        errorMessage: "Loại chỗ ở phải là apartment, hotel_room hoặc house",
      },
    },
    room_ward: {
      notEmpty: { errorMessage: "Phường/Xã không được để trống" },
      trim: true,
    },
    room_district: {
      notEmpty: { errorMessage: "Quận/Huyện không được để trống" },
      trim: true,
    },
    room_city: {
      notEmpty: { errorMessage: "Thành phố không được để trống" },
      trim: true,
    },
    address_line: {
      notEmpty: { errorMessage: "Địa chỉ chi tiết không được để trống" },
      trim: true,
    },
    price_per_night: {
      notEmpty: { errorMessage: "Giá phòng không được để trống" },
      isFloat: {
        options: { min: 0 },
        errorMessage: "Giá phòng phải là số không âm",
      },
    },
    amenities: {
      optional: true,
      isArray: { errorMessage: "Amenities phải là một mảng" },
    },
    "amenities.*": {
      isInt: { errorMessage: "ID tiện nghi không hợp lệ" },
    },

    highlights: {
      optional: true,
      isArray: { errorMessage: "Highlights phải là một mảng" },
    },
    "highlights.*": {
      isInt: { errorMessage: "ID highlight không hợp lệ" },
    },
    images: {
      isArray: {
        options: { min: 6 },
        errorMessage: "Phải có ít nhất 6 hình ảnh",
      },
    },
    "images.*.url": {
      isURL: { errorMessage: "Định dạng URL ảnh không hợp lệ" },
    },
  }),
  handlerError,
];

exports.updateRoomValidator = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: { errorMessage: "Tiêu đề không được để trống" },
      trim: true,
    },
    description: {
      optional: true,
      notEmpty: { errorMessage: "Mô tả không được để trống" },
      trim: true,
    },
    introduce: {
      optional: true,
      trim: true,
    },
    property_type: {
      optional: true,
      isIn: {
        options: [["apartment", "hotel_room", "house"]],
        errorMessage: "Loại chỗ ở không hợp lệ",
      },
    },
    room_ward: {
      optional: true,
      notEmpty: { errorMessage: "Phường/Xã không được để trống" },
    },
    room_district: {
      optional: true,
      notEmpty: { errorMessage: "Quận/Huyện không được để trống" },
    },
    room_city: {
      optional: true,
      notEmpty: { errorMessage: "Thành phố không được để trống" },
    },
    address_line: {
      optional: true,
      notEmpty: { errorMessage: "Địa chỉ chi tiết không được để trống" },
    },
    price_per_night: {
      optional: true,
      isFloat: {
        options: { min: 0 },
        errorMessage: "Giá phòng phải là số không âm",
      },
    },
  }),
  handlerError,
];
