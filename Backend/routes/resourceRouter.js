const express = require("express");

const {
  getAllResources,
  createResource,
  getResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");
const router = express.Router();

router.route("/").get(getAllResources).post(createResource);
router
  .route("/:id")
  .get(getResource)
  .patch(updateResource)
  .delete(deleteResource);

module.exports = router;
