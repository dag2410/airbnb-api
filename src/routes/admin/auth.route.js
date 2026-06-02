const express = require("express");
const { loginValidator } = require("@/validators/admin/auth.validator");
const authController = require("@/controllers/admin/auth.controller");

const router = express.Router();

router.get("/login", authController.showLoginForm);
router.post("/login", loginValidator, authController.login);
router.delete("/logout", authController.logout);
router.get("/forgot-password", authController.showForgotForm);
router.post("/forgot-password", authController.handleForgotPassword);
router.get("/reset-password", authController.showResetForm);
router.post("/reset-password", authController.handleResetPassword);
module.exports = router;
