const express = require("express");

const {
  getAllSchools,
  createSchool,
  getSchool,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");
const router = express.Router();

router.route("/").get(getAllSchools).post(createSchool);
router.route("/:id").get(getSchool).patch(updateSchool).delete(deleteSchool);

module.exports = router;
