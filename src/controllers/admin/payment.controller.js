const adminPaymentService = require("@/services/admin/payment.admin.service");
const asyncHandler = require("@/utils/asyncHandler");

const PAYMENT_STATUSES = ["pending", "paid", "failed"];
const PAYMENT_PROVIDERS = ["momo", "vnpay"];

exports.index = asyncHandler(async (req, res) => {
  const result = await adminPaymentService.paginate(req.query);

  res.render("admin/payments/index", {
    title: "Quản lý thanh toán",
    payments: result.data,
    pagination: result.pagination,
    filters: result.filters,
    statusOptions: PAYMENT_STATUSES,
    providerOptions: PAYMENT_PROVIDERS,
  });
});

exports.show = asyncHandler(async (req, res) => {
  const payment = await adminPaymentService.getById(req.params.id);
  if (!payment) {
    res.flash({ type: "error", message: "Không tìm thấy thanh toán." });
    return res.redirect("/admin/payments");
  }

  res.render("admin/payments/show", {
    title: `Payment #${payment.id}`,
    payment,
    statusOptions: PAYMENT_STATUSES,
  });
});

exports.edit = asyncHandler(async (req, res) => {
  const payment = await adminPaymentService.getById(req.params.id);
  if (!payment) {
    res.flash({ type: "error", message: "Không tìm thấy thanh toán." });
    return res.redirect("/admin/payments");
  }

  res.render("admin/payments/edit", {
    title: "Sửa thanh toán",
    payment,
    old: payment,
    errors: {},
    statusOptions: PAYMENT_STATUSES,
  });
});

exports.update = asyncHandler(async (req, res) => {
  const payment = await adminPaymentService.updateStatus(
    req.params.id,
    req.body.status,
  );

  if (!payment) {
    res.flash({ type: "error", message: "Không tìm thấy thanh toán." });
    return res.redirect("/admin/payments");
  }

  res.flash({ type: "success", message: "Cập nhật thanh toán thành công." });
  res.redirect(`/admin/payments/${payment.id}`);
});

exports.destroy = asyncHandler(async (req, res) => {
  const deleted = await adminPaymentService.remove(req.params.id);
  if (deleted) {
    res.flash({ type: "success", message: "Đã xóa thanh toán." });
  } else {
    res.flash({ type: "error", message: "Không tìm thấy thanh toán." });
  }
  res.redirect("/admin/payments");
});
