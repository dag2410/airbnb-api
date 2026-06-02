const adminBookingService = require("@/services/admin/booking.admin.service");
const asyncHandler = require("@/utils/asyncHandler");

const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "staying",
  "completed",
  "cancelled",
];

exports.index = asyncHandler(async (req, res) => {
  const result = await adminBookingService.paginate(req.query);

  res.render("admin/bookings/index", {
    title: "Quản lý đặt phòng",
    bookings: result.data,
    pagination: result.pagination,
    filters: result.filters,
    statusOptions: BOOKING_STATUSES,
  });
});

exports.show = asyncHandler(async (req, res) => {
  const booking = await adminBookingService.getById(req.params.id);
  if (!booking) {
    res.flash({ type: "error", message: "Không tìm thấy booking." });
    return res.redirect("/admin/bookings");
  }

  res.render("admin/bookings/show", {
    title: `Booking #${booking.id}`,
    booking,
    statusOptions: BOOKING_STATUSES,
  });
});

exports.edit = asyncHandler(async (req, res) => {
  const booking = await adminBookingService.getById(req.params.id);
  if (!booking) {
    res.flash({ type: "error", message: "Không tìm thấy booking." });
    return res.redirect("/admin/bookings");
  }

  res.render("admin/bookings/edit", {
    title: "Sửa booking",
    booking,
    old: booking,
    errors: {},
    statusOptions: BOOKING_STATUSES,
  });
});

exports.update = asyncHandler(async (req, res) => {
  const booking = await adminBookingService.update(req.params.id, {
    status: req.body.status,
    total_guests: req.body.total_guests,
    total_price: req.body.total_price,
  });

  if (!booking) {
    res.flash({ type: "error", message: "Không tìm thấy booking." });
    return res.redirect("/admin/bookings");
  }

  res.flash({ type: "success", message: "Cập nhật booking thành công." });
  res.redirect(`/admin/bookings/${booking.id}`);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const booking = await adminBookingService.updateStatus(
    req.params.id,
    req.body.status,
  );

  if (!booking) {
    res.flash({ type: "error", message: "Không tìm thấy booking." });
  } else {
    res.flash({ type: "success", message: "Cập nhật trạng thái thành công." });
  }

  res.redirect(`/admin/bookings/${req.params.id}`);
});

exports.destroy = asyncHandler(async (req, res) => {
  const deleted = await adminBookingService.remove(req.params.id);
  if (deleted) {
    res.flash({ type: "success", message: "Đã xóa booking." });
  } else {
    res.flash({ type: "error", message: "Không tìm thấy booking." });
  }
  res.redirect("/admin/bookings");
});
