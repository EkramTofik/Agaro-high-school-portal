const express = require("express");

const {
  getAllStaffMembers,
  createStaffMember,
  getStaffMember,
  updateStaffMember,
  deleteStaffMember,
} = require("../controllers/staffController");
const router = express.Router();

router.route("/").get(getAllStaffMembers).post(createStaffMember);
router
  .route("/:id")
  .get(getStaffMember)
  .patch(updateStaffMember)
  .delete(deleteStaffMember);

module.exports = router;
