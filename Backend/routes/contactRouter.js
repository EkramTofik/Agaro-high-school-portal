const express = require("express");
const authController = require("../controllers/authenticationController");

const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, authController.restrictTo("admin"), getAllContacts)
  .post(createContact);
router
  .route("/:id")
  .get(authController.protect, authController.restrictTo("admin"), getContact)
  .patch(authController.protect, authController.restrictTo("admin"), updateContact)
  .delete(authController.protect, authController.restrictTo("admin"), deleteContact);
module.exports = router;
