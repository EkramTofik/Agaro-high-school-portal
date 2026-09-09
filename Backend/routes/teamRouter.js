const express = require("express");
const {
  getAllTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

const router = express.Router();

router.route("/").get(getAllTeams).post(createTeam);
router.route("/:id").get(getTeam).patch(updateTeam).delete(deleteTeam);

module.exports = router;
