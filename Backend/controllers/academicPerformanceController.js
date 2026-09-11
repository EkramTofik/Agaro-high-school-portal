const factory = require("./handlerFactory");
const AcademicPerformance = require("../models/academicPerformanceModel");
const School = require("../models/schoolModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.aliasTrend = (req, res, next) => {
  req.aliasQuery = {
    sort: "-year",
    limit: req.query.limit || "6",
  };
  next();
};

exports.getAllAcademicPerformance = factory.getAll(AcademicPerformance);
exports.getAcademicPerformance = factory.getOne(AcademicPerformance);
exports.updateAcademicPerformance = factory.updateOne(AcademicPerformance);
exports.deleteAcademicPerformance = factory.deleteOne(AcademicPerformance);

// Single-school app: attach the one School doc automatically, same
// pattern as the rest of this codebase (see original createNews).
exports.createAcademicPerformance = catchAsync(async (req, res, next) => {
  const school = await School.findOne().select("_id");
  if (!school) {
    return next(
      new AppError(
        "No school record found. Set up the school profile first.",
        400,
      ),
    );
  }

  const record = await AcademicPerformance.create({
    ...req.body,
    school: school._id,
  });

  res.status(201).json({
    status: "success",
    data: { data: record },
  });
});
