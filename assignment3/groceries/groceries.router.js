const express = require("express");
const globalMiddlewares = require("../middleware/global.middleware");
const router = express.Router();
const controller = require("./groceries.controller");

// router.use(globalMiddlewares.basicAuth);
router.use(globalMiddlewares.apiKeyAuth);

// GET all groceries
router.get("/", controller.GetGroceries);

// GET grocery by id
router.get("/:id", controller.getOneGrocery);

// create a grocery
router.post(
  "/",
  globalMiddlewares.checkBody,
  globalMiddlewares.checkAdmin,
  controller.createGrocery
);

// update a grocery
router.put(
  "/:id",
  globalMiddlewares.checkBody,
  globalMiddlewares.checkAdmin,
  controller.updateGrocery
);

// delete a grocery
router.delete(
  "/:id",
  globalMiddlewares.checkBody,
  globalMiddlewares.checkAdmin,
  controller.deleteGrocery
);
module.exports = router;
