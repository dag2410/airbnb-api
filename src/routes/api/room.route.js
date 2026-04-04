    const express = require("express");
    const roomController = require("@/controllers/api/room.controller");
    const attachResourceLoader = require("@/utils/attachResourceLoader");
    const checkAuth = require("@/middleware/checkAuth");
    const {
      createRoomValidator,
      updateRoomValidator,
    } = require("@/validators/api/rooms.validator");
    const router = express.Router();
    attachResourceLoader(router, ["room"]);

    router.get("/", roomController.index);
    router.get("/:room", roomController.show);
    router.post("/", checkAuth, createRoomValidator, roomController.create);
    router.put("/:room", checkAuth, updateRoomValidator, roomController.update);
    router.patch("/:room", checkAuth, updateRoomValidator, roomController.update);
    router.delete("/:room", checkAuth, roomController.remove);

    module.exports = router;
