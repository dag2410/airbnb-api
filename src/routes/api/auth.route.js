const express = require("express");
const router = express.Router();
const authController = require("@/controllers/api/auth.controller");
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("@/validators/api/auth.validator");
const checkAuth = require("@/middleware/checkAuth");

router.get("/profile", checkAuth, authController.profile);
router.get("/verify-email", authController.verifyEmail);
router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post("/logout", checkAuth, authController.logout);
router.post("/refresh", authController.refreshToken);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  authController.forgotPassword
);
router.get("/reset-password", authController.verifyResetEmail);
router.post(
  "/reset-password",
  resetPasswordValidator,
  authController.resetPassword
);

router.get("/oauth/google", authController.googleRedirect);
router.get("/oauth/google/callback", authController.googleCallback);

module.exports = router;
