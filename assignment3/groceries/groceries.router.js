const express = require("express");
const router = express.Router();
const controller = require("./groceries.controller");
// GET all groceries
router.get("/", controller.GetGroceries);

// GET grocery by id
router.get("/:id", controller.getOneGrocery);

// create a grocery
router.post("/", controller.createGrocery);

// update a grocery
router.put("/:id", controller.updateGrocery);

// delete a grocery
router.delete("/:id", controller.deleteGrocery);
module.exports = router;
