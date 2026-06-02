const express = require("express");
const bookingController = require("@/controllers/admin/booking.controller");

const router = express.Router();

router.get("/", bookingController.index);
router.get("/:id/edit", bookingController.edit);
router.get("/:id", bookingController.show);
router.put("/:id/status", bookingController.updateStatus);
router.put("/:id", bookingController.update);
router.delete("/:id", bookingController.destroy);

module.exports = router;
