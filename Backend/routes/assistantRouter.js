const express = require("express");
const rateLimit = require("express-rate-limit");
const { askAssistant } = require("../controllers/assistantController");

const router = express.Router();
const assistantLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: {
    status: "fail",
    message:
      "Too many questions in a short time. Please wait a few minutes and try again.",
  },
});

router.post("/ask", assistantLimiter, askAssistant);

module.exports = router;
