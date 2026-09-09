const express = require("express");

const {
  getAllClubs,
  createClub,
  getClub,
  updateClub,
  deleteClub,
} = require("../controllers/clubController");
const router = express.Router();

router.route("/").get(getAllClubs).post(createClub);
router.route("/:id").get(getClub).patch(updateClub).delete(deleteClub);

module.exports = router;
