const bookingService = require("@/services/booking.service");
const { success, error } = require("@/utils/response");

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const userId = req.user.id;
    const bookings = await bookingService.getAll(userId, page, limit);
    success(res, 200, bookings);
  } catch (err) {
    error(res, 500, "Lỗi xảy ra khi tải dữ liệu booking!", err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      room_id,
      check_in_date,
      check_out_date,
      total_guests,
      total_price,
      is_reviewed,
    } = req.body;
    const result = await bookingService.createBooking(
      userId,
      room_id,
      check_in_date,
      check_out_date,
      total_guests,
      total_price,
      is_reviewed,
    );
    success(res, 201, result);
  } catch (err) {
    error(res, 400, "Lỗi xảy ra khi tạo booking!", err.message);
  }
};

exports.cancel = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.booking;
    await bookingService.cancelBooking({ bookingId, userId });
    success(res, 200, "Hủy booking thành công!");
  } catch (err) {
    error(res, 400, "Lỗi xảy ra khi mà hủy booking", err.message);
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { room_id, check_in_date, check_out_date } = req.body;

    const result = await bookingService.checkAvailability({
      roomId: room_id,
      checkIn: check_in_date,
      checkOut: check_out_date,
    });

    success(res, 200, result);
  } catch (err) {
    error(res, 400, "Check availability failed", err.message);
  }
};
