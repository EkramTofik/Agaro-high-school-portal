const factory = require("./handlerFactory");
const AcademicRecord = require("../models/academicrecordModel");

exports.getAllAcademicRecords = factory.getAll(AcademicRecord);
exports.getAcademicRecord = factory.getOne(AcademicRecord);
exports.createAcademicRecord = factory.createOne(AcademicRecord);
exports.updateAcademicRecord = factory.updateOne(AcademicRecord);
exports.deleteAcademicRecord = factory.deleteOne(AcademicRecord);
