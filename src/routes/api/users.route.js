const express = require("express");

const usersController = require("@/controllers/api/users.controller");

const {
  createUserValidator,
  updateUserValidator,
} = require("@/validators/api/users.validator");
const attachResourceLoader = require("../../utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["user"]);

router.get("/", usersController.getList);
router.get("/:id/email-image.jpg", usersController.getEmailImage);
router.get("/:user", usersController.getOne);
router.post("/", createUserValidator, usersController.create);
router.put("/:user", usersController.update);
router.patch("/:user", usersController.update);
router.delete("/:user", usersController.remove);

module.exports = router;
