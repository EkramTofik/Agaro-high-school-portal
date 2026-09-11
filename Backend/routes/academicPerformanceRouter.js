const express = require("express");
const {
  aliasTrend,
  getAllAcademicPerformance,
  createAcademicPerformance,
  getAcademicPerformance,
  updateAcademicPerformance,
  deleteAcademicPerformance,
} = require("../controllers/academicPerformanceController");
const {
  protect,
  restrictTo,
} = require("../controllers/authenticationController");

const router = express.Router();

router.route("/trend").get(aliasTrend, getAllAcademicPerformance);

router
  .route("/")
  .get(getAllAcademicPerformance)
  .post(protect, restrictTo("admin"), createAcademicPerformance);

router
  .route("/:id")
  .get(getAcademicPerformance)
  .patch(protect, restrictTo("admin"), updateAcademicPerformance)
  .delete(protect, restrictTo("admin"), deleteAcademicPerformance);

module.exports = router;
