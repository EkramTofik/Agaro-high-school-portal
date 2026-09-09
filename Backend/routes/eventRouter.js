const express = require("express");

const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);
router.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
