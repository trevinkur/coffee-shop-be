const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.get("/:userId", usersController.getUserId);

module.exports = router