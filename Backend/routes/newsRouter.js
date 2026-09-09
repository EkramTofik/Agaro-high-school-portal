const express = require("express");

const {
  getAllNews,
  createNews,
  getNews,
  updateNews,
  deleteNews,
  getPublishedNews,
  aliasTopNews,
} = require("../controllers/newsController");
const router = express.Router();
router.route("/top-news").get(aliasTopNews, getAllNews);
router.route("/published-news").get(getPublishedNews);
router.route("/").get(getAllNews).post(createNews);
router.route("/:id").get(getNews).patch(updateNews).delete(deleteNews);
module.exports = router;
