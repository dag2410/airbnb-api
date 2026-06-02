const express = require("express");
const roomsController = require("@/controllers/admin/rooms.controller");

const router = express.Router();

router.get("/", roomsController.index);
router.get("/create", roomsController.create);
router.post("/", roomsController.store);
router.get("/:id/edit", roomsController.edit);
router.get("/:id", roomsController.show);
router.put("/:id", roomsController.update);
router.delete("/:id", roomsController.destroy);

module.exports = router;
