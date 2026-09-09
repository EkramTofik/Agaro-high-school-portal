const express = require("express");

const {
  getAllAcademicYears,
  createAcademicYear,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../controllers/academicyearController");
const router = express.Router();

router.route("/").get(getAllAcademicYears).post(createAcademicYear);
router
  .route("/:id")
  .get(getAcademicYear)
  .patch(updateAcademicYear)
  .delete(deleteAcademicYear);

module.exports = router;
