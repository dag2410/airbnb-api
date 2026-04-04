const express = require("express");
const router = express.Router();
const notificationController = require("@/controllers/api/notification.controller");
const checkAuth = require("@/middleware/checkAuth");
const attachResourceLoader = require("@/utils/attachResourceLoader");

attachResourceLoader(router, ["notification"]);

router.get("/", checkAuth, notificationController.index);
router.post("/", checkAuth, notificationController.create);
router.delete("/:notification", checkAuth, notificationController.destroy);
router.patch("/read", checkAuth, notificationController.update);
router.patch("/read-all", checkAuth, notificationController.bulkUpdate);

module.exports = router;
