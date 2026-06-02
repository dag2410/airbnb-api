const express = require("express");
const dashboardRouter = require("./dashboard.route");
const roomsRouter = require("./room.route");
const userRouter = require("./user.route");
const settingsRouter = require("./setting.route");
const accountSettingsRouter = require("./accountSettings.route");
const analyticsRouter = require("./analytic.route");
const reviewRouter = require("./review.route");
const paymentRouter = require("./payment.route");
const bookingRouter = require("./booking.route");
const walletRouter = require("./wallet.route");
const authRouter = require("./auth.route");

const router = express.Router();

router.use("/", dashboardRouter);
router.use("/users", userRouter);
router.use("/rooms", roomsRouter);
router.use("/bookings", bookingRouter);
router.use("/payments", paymentRouter);
router.use("/wallets", walletRouter);
router.use("/settings", settingsRouter);
router.use("/accountSettings", accountSettingsRouter);
router.use("/analytics", analyticsRouter);
router.use("/reviews", reviewRouter);
router.use("/auth", authRouter);

module.exports = router;
