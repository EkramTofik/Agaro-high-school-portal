const express = require("express");
const authController = require("../controllers/authenticationController");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", authController.login);

// everything below requires a logged-in admin
router.use(authController.protect, authController.restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
