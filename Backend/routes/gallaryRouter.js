const express = require("express");

const {
  getAllGalleryItems,
  createGalleryItem,
  getGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/gallaryController");
const router = express.Router();

router.route("/").get(getAllGalleryItems).post(createGalleryItem);
router
  .route("/:id")
  .get(getGalleryItem)
  .patch(updateGalleryItem)
  .delete(deleteGalleryItem);

module.exports = router;
