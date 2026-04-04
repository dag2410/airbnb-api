const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const wishlistRouter = require("./wishlist.route");
const roomRouter = require("./room.route");
const reviewRouter = require("./review.route");
const notificationRouter = require("./notification.route");
// const bookingRouter = require("./booking.route");
// const settingRouter = require("./setting.route");
// const uploadRouter = require("./upload.route");
const conversationRouter = require("./conversation.route");
const pusherRouter = require("./pusher.route");
const chatbotRouter = require("./chatbot.route");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/wishlists", wishlistRouter);
router.use("/rooms", roomRouter);
router.use("/reviews", reviewRouter);
router.use("/notifications", notificationRouter);
// router.use("/bookings", bookingRouter);
// router.use("/settings", settingRouter);
// router.use("/upload", uploadRouter);
router.use("/conversations", conversationRouter);
router.use("/pusher", pusherRouter);
router.use("/ai/chat", chatbotRouter);

module.exports = router;
