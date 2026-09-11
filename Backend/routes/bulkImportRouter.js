const express = require("express");
const path = require("path");
const {
  uploadBulkFile,
  bulkImportAll,
} = require("../controllers/bulkImportController");
const {
  protect,
  restrictTo,
} = require("../controllers/authenticationController");

const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("admin"), uploadBulkFile, bulkImportAll);

router.route("/template").get((req, res) => {
  res.download(
    path.join(__dirname, "../public/templates/Bulk_Import_Template.xlsx"),
    "Bulk_Import_Template.xlsx",
  );
});

module.exports = router;
