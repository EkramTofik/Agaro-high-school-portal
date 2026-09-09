const express = require("express");

const {
  getAllMediaFiles,
  createMediaFile,
  getMediaFile,
  updateMediaFile,
  deleteMediaFile,
} = require("../controllers/mediafileController");
const router = express.Router();

router.route("/").get(getAllMediaFiles).post(createMediaFile);
router
  .route("/:id")
  .get(getMediaFile)
  .patch(updateMediaFile)
  .delete(deleteMediaFile);

module.exports = router;
