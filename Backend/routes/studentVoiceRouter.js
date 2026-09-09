const express = require("express");
const {
  getAllStudentVoices,
  createStudentVoice,
  getStudentVoice,
  updateStudentVoice,
  deleteStudentVoice,
} = require("../controllers/studentVoiceController");

const router = express.Router();

router.route("/").get(getAllStudentVoices).post(createStudentVoice);
router.route("/:id").get(getStudentVoice).patch(updateStudentVoice).delete(deleteStudentVoice);

module.exports = router;
