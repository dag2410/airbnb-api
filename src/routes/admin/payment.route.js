const express = require("express");
const paymentController = require("@/controllers/admin/payment.controller");

const router = express.Router();

router.get("/", paymentController.index);
router.get("/:id/edit", paymentController.edit);
router.get("/:id", paymentController.show);
router.put("/:id", paymentController.update);
router.delete("/:id", paymentController.destroy);

module.exports = router;
