const express = require("express");
const walletController = require("@/controllers/admin/wallet.controller");

const router = express.Router();

router.get("/", walletController.index);
router.get("/create", walletController.create);
router.post("/", walletController.store);
router.get("/:id", walletController.show);
router.post("/:id/adjust", walletController.adjust);
router.delete("/:id", walletController.destroy);

module.exports = router;
