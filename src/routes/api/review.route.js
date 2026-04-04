const express = require("express");
const reviewsController = require("@/controllers/api/review.controller");
const attachResourceLoader = require("@/utils/attachResourceLoader");
const {
  createReviewValidator,
  updateReviewValidator,
} = require("@/validators/api/review.validator");
const checkAuth = require("@/middleware/checkAuth");

const router = express.Router();
attachResourceLoader(router, ["review"]);

router.get("/", reviewsController.index);
router.get("/:review", reviewsController.show);
router.post("/", checkAuth, createReviewValidator, reviewsController.create);
router.put(
  "/:review",
  checkAuth,
  updateReviewValidator,
  reviewsController.update,
);
router.delete("/:review", checkAuth, reviewsController.remove);

module.exports = router;
