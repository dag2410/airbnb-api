const express = require("express");
const usersController = require("@/controllers/admin/user.controller");
const usersValidator = require("@/validators/admin/user.validator");

const router = express.Router();

router.get("/", usersController.index);
router.get("/create", usersController.create);
router.post("/", usersValidator.createUserValidator, usersController.store);
router.get("/:id/edit", usersController.edit);
router.get("/:id", usersController.show);
router.put("/:id", usersValidator.updateUserValidator, usersController.update);
router.delete("/:id", usersController.destroy);

module.exports = router;
