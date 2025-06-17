const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("@/validators/admin/auth.validator");
const authController = require("@/controllers/admin/auth.controller");
const router = express.Router();

router.get("/register", authController.showRegisterForm);
router.post("/register", registerValidator, authController.register);
router.get("/login", authController.showLoginForm);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", loginValidator, authController.login);
router.delete("/logout", authController.logout);
router.get("/forgot-password", authController.showForgotForm);
router.post("/forgot-password", authController.handleForgotPassword);
router.get("/reset-password", authController.showResetForm);
router.post("/reset-password", authController.handleResetPassword);

module.exports = router;
