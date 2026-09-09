const express = require("express");

const {
  getAllAcademicRecords,
  createAcademicRecord,
  getAcademicRecord,
  updateAcademicRecord,
  deleteAcademicRecord,
} = require("../controllers/academicrecordController");
const router = express.Router();

router.route("/").get(getAllAcademicRecords).post(createAcademicRecord);
router
  .route("/:id")
  .get(getAcademicRecord)
  .patch(updateAcademicRecord)
  .delete(deleteAcademicRecord);

module.exports = router;
