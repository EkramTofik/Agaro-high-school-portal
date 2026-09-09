const ApiFeature = require("../utils/apiFeature");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const School = require("../models/schoolModel");
exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const feature = new ApiFeature(Model.find(), req.query)
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

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

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

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    let doc;
    if (
      Model.modelName === "Department" ||
      Model.modelName === "StaffMember" ||
      Model.modelName === "Alumni" ||
      Model.modelName === "News" ||
      Model.modelName === "Academicyear" ||
      Model.modelName === "Academicrecord" ||
      Model.modelName === "Resource" ||
      Model.modelName === "Club" ||
      Model.modelName === "Galleryitem" ||
      Model.modelName === "Contact" ||
      Model.modelName === "Mediafile" ||
      Model.modelName === "Event"
      || Model.modelName === "Team"
      || Model.modelName === "StudentVoice"
      || Model.modelName === "HonorRoll"
    ) {
      const school = await School.findOne();
      if (!school) {
        return res.status(503).json({
          status: "fail",
          message: "School record is not configured.",
        });
      }
      doc = await Model.create({
        ...req.body,
        school: school._id,
      });
    } else {
      doc = await Model.create(req.body);
    }

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No document found with that ID`, 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
