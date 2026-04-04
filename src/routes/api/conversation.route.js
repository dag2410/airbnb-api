const express = require("express");
const router = express.Router();
const conversationController = require("@/controllers/api/conversation.controller");
const checkAuth = require("@/middleware/checkAuth");
const attachResourceLoader = require("@/utils/attachResourceLoader");

attachResourceLoader(router, ["conversation"]);

router.post("/", checkAuth, conversationController.create);
router.get("/", checkAuth, conversationController.index);
router.get("/:conversation", checkAuth, conversationController.show);
router.post(
  "/:conversation/message",
  checkAuth,
  conversationController.createMessage,
);
router.put(
  "/:conversation/message/read",
  checkAuth,
  conversationController.markAsRead,
);

module.exports = router;
