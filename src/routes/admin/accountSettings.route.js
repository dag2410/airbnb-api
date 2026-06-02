const express = require("express");
const accountSettingsController = require("@/controllers/admin/accountSetting.controller");

const router = express.Router();

router.get("/", accountSettingsController.index);
router.put("/profile", accountSettingsController.updateProfile);
router.put("/password", accountSettingsController.updatePassword);

module.exports = router;
