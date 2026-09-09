const StaffMember = require("../models/staffModel");
const ApiFeature = require("../utils/apiFeature");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllStaffMembers = catchAsync(async (req, res) => {
  const feature = new ApiFeature(
    StaffMember.find().populate("department", "name"),
    req.query,
  )
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

exports.getStaffMember = catchAsync(async (req, res, next) => {
  const doc = await StaffMember.findById(req.params.id).populate(
    "department",
    "name",
  );

  if (!doc) {
    return next(new AppError(`No document found with that ID`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createStaffMember = factory.createOne(StaffMember);
exports.updateStaffMember = factory.updateOne(StaffMember);
exports.deleteStaffMember = factory.deleteOne(StaffMember);
