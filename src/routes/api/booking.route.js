const express = require("express");
const router = express.Router();
const bookingController = require("@/controllers/api/booking.controller");
const checkAuth = require("@/middleware/checkAuth");
const attachResourceLoader = require("@/utils/attachResourceLoader");
const {
  createBookingValidator,
  cancelBookingValidator,
  checkAvailabilityValidator,
} = require("@/validators/api/booking.validator");

attachResourceLoader(router, ["booking"]);

router.get("/", checkAuth, bookingController.index);
router.post("/", checkAuth, createBookingValidator, bookingController.create);

router.patch(
  "/:booking/cancel",
  checkAuth,
  cancelBookingValidator,
  bookingController.cancel,
);

router.post(
  "/check-availability",
  checkAuth,
  checkAvailabilityValidator,
  bookingController.checkAvailability,
);
module.exports = router;
