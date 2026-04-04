const express = require("express");
const usersController = require("@/controllers/api/user.controller");
const attachResourceLoader = require("@/utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["user"]);

router.get("/", usersController.index);
router.get("/:user", usersController.show);
// router.post("/", usersController.create);
router.put("/:user", usersController.update);
router.patch("/:user", usersController.update);
router.delete("/:user", usersController.remove);

module.exports = router;
