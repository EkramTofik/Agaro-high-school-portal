const express = require("express");
const controller = require("../controllers/honorRollController");

const router = express.Router();
router.route("/").get(controller.getAllHonorRoll).post(controller.createHonorRoll);
router.route("/:id").get(controller.getHonorRoll).patch(controller.updateHonorRoll).delete(controller.deleteHonorRoll);

module.exports = router;
