const reviewService = require("@/services/review.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getAll();

  res.render("admin/review/index", {
    title: "Quản lý đánh giá",
    reviews,
  });
});

exports.show = asyncHandler(async (req, res) => {
  const review = await reviewService.getById(req.params.id);

  if (!review) {
    res.flash({ type: "error", message: "Không tìm thấy đánh giá." });
    return res.redirect("/admin/reviews");
  }

  res.render("admin/review/show", {
    title: `Đánh giá #${review.id}`,
    review,
  });
});

exports.edit = asyncHandler(async (req, res) => {
  const review = await reviewService.getById(req.params.id);

  if (!review) {
    res.flash({ type: "error", message: "Không tìm thấy đánh giá." });
    return res.redirect("/admin/reviews");
  }

  res.render("admin/review/edit", {
    title: "Sửa đánh giá",
    review,
    old: review,
    errors: {},
  });
});

exports.update = asyncHandler(async (req, res) => {
  const review = await reviewService.updateReview(req.params.id, {
    content: req.body.content,
    rating: req.body.rating,
  });

  if (!review) {
    res.flash({ type: "error", message: "Không tìm thấy đánh giá." });
    return res.redirect("/admin/reviews");
  }

  res.flash({ type: "success", message: "Cập nhật đánh giá thành công." });
  res.redirect(`/admin/reviews/${review.id}`);
});

exports.destroy = asyncHandler(async (req, res) => {
  const deleted = await reviewService.removeReview(req.params.id);

  if (deleted) {
    res.flash({ type: "success", message: "Đã xóa đánh giá." });
  } else {
    res.flash({ type: "error", message: "Không tìm thấy đánh giá." });
  }

  res.redirect("/admin/reviews");
});
