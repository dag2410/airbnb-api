const reviewService = require("@/services/review.service");
const { success, error } = require("@/utils/response");

exports.index = async (req, res) => {
  try {
    const reviews = await reviewService.getAll();
    success(res, 200, reviews);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.show = async (req, res) => {
  try {
    success(res, 200, req.review);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    success(res, 201, await reviewService.createReview(req.body));
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    success(
      res,
      200,
      await reviewService.updateReview(req.review.id, req.body),
    );
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await reviewService.removeReview(req.review.id);
    success(res, 200, "Xóa đánh giá thành công");
  } catch (err) {
    error(res, 500, "Đánh giá không tồn tại!");
  }
};
