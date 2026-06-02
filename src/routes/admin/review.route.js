const express = require("express");
const reviewController = require("@/controllers/admin/review.controller");

const router = express.Router();

router.get("/", reviewController.index);
router.get("/:id/edit", reviewController.edit);
router.get("/:id", reviewController.show);
router.put("/:id", reviewController.update);
router.delete("/:id", reviewController.destroy);

module.exports = router;
