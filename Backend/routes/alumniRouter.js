const express = require("express");

const {
  getAllAlumnis,
  createAlumni,
  getAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/alumniController");
const router = express.Router();

router.route("/").get(getAllAlumnis).post(createAlumni);
router.route("/:id").get(getAlumni).patch(updateAlumni).delete(deleteAlumni);

module.exports = router;
