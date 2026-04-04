const express = require("express");
const router = express.Router();
const wishlistController = require("@/controllers/api/wishlist.controller");
const checkAuth = require("@/middleware/checkAuth");

router.get("/", checkAuth, wishlistController.index);
router.post("/", checkAuth, wishlistController.toggleLike);
router.delete("/", checkAuth, wishlistController.clear);
module.exports = router;
