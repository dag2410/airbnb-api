const adminWalletService = require("@/services/admin/wallet.admin.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const result = await adminWalletService.paginate(req.query);

  res.render("admin/wallets/index", {
    title: "Quản lý ví",
    wallets: result.data,
    pagination: result.pagination,
    filters: result.filters,
  });
});

exports.create = asyncHandler(async (req, res) => {
  res.render("admin/wallets/create", {
    title: "Tạo ví",
    old: {},
    errors: {},
  });
});

exports.store = asyncHandler(async (req, res) => {
  await adminWalletService.create({
    user_id: req.body.user_id,
    balance: req.body.balance || 0,
  });
  res.flash({ type: "success", message: "Tạo ví thành công." });
  res.redirect("/admin/wallets");
});

exports.show = asyncHandler(async (req, res) => {
  const wallet = await adminWalletService.getById(req.params.id);
  if (!wallet) {
    res.flash({ type: "error", message: "Không tìm thấy ví." });
    return res.redirect("/admin/wallets");
  }

  res.render("admin/wallets/show", {
    title: `Ví #${wallet.id}`,
    wallet,
  });
});

exports.adjust = asyncHandler(async (req, res) => {
  await adminWalletService.adjustBalance(req.params.id, req.body.amount, {
    type: req.body.type,
  });
  res.flash({ type: "success", message: "Cập nhật số dư ví thành công." });
  res.redirect(`/admin/wallets/${req.params.id}`);
});

exports.destroy = asyncHandler(async (req, res) => {
  const deleted = await adminWalletService.remove(req.params.id);
  if (deleted) {
    res.flash({ type: "success", message: "Đã xóa ví." });
  } else {
    res.flash({ type: "error", message: "Không tìm thấy ví." });
  }
  res.redirect("/admin/wallets");
});
