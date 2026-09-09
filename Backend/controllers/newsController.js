const factory = require("./handlerFactory");
const News = require("../models/newsModel");
const School = require("../models/schoolModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const ApiFeature = require("../utils/apiFeature");

exports.aliasTopNews = catchAsync(async (req, res, next) => {
  req.aliasQuery = {
    limit: "5",
    sort: "-publishedAt",
    fields: "title,summary,category,imageUrl,publishedAt",
    status: "published",
  };
  const feature = new ApiFeature(News.find(), req.aliasQuery)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const docs = await feature.query;

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      data: docs,
    },
  });
});

exports.getPublishedNews = catchAsync(async (req, res) => {
  const news = await News.find({ status: "published" }).sort({
    publishedAt: -1,
  });

  res.status(200).json({
    status: "success",
    results: news.length,
    data: {
      news,
    },
  });
});
exports.createNews = catchAsync(async (req, res) => {
  const school = await School.findOne();
  if (!school) {
    return res.status(503).json({
      status: "fail",
      message: "School record is not configured.",
    });
  }
  const user = req.user || (await User.findOne());
  const slug =
    req.body.slug ||
    req.body.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const news = await News.create({
    ...req.body,
    slug,
    school: school._id,
    ...(user ? { createdBy: user._id } : {}),
    publishedAt: req.body.status === "published" ? new Date() : undefined,
  });

  res.status(201).json({
    status: "success",
    data: {
      news,
    },
  });
});
exports.getAllNews = factory.getAll(News);
exports.getNews = catchAsync(async (req, res, next) => {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
  const news = await News.findOne(
    isObjectId ? { _id: req.params.id } : { slug: req.params.id },
  );
  if (!news) return next(new (require("../utils/appError"))("No document found with that ID", 404));
  res.status(200).json({ status: "success", data: { data: news } });
});
exports.updateNews = factory.updateOne(News);
exports.deleteNews = factory.deleteOne(News);
