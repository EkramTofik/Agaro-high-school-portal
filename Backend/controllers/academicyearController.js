const factory = require("./handlerFactory");
const AcademicYear = require("../models/academicyearModel");

exports.getAllAcademicYears = factory.getAll(AcademicYear);
exports.getAcademicYear = factory.getOne(AcademicYear);
exports.createAcademicYear = factory.createOne(AcademicYear);
exports.updateAcademicYear = factory.updateOne(AcademicYear);
exports.deleteAcademicYear = factory.deleteOne(AcademicYear);
