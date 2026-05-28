const express = require("express");
const router = express.Router();
const paymentController = require("@/controllers/api/payment.controller");
const checkAuth = require("@/middleware/checkAuth");

router.post("/momo/create", checkAuth, paymentController.createMomoPayment);

router.post("/momo/callback", paymentController.momoCallback);

router.post("/transaction-status", checkAuth, (req, res) => {
  const { orderId } = req.body;
});

module.exports = router;
