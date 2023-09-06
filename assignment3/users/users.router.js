const express = require("express");
const middleware = require("./users.middleware");
const controller = require("./users.controller");

const router = express.Router();

router.post("/", middleware.validateUserCreation, controller.createUser);

router.get("/", middleware.sendUsersDb);

module.exports = router;
