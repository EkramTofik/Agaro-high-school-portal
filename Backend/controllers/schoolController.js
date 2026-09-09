const School = require("../models/schoolModel");

const factory = require("./handlerFactory");

exports.getAllSchools = factory.getAll(School);
exports.getSchool = factory.getOne(School);
exports.createSchool = factory.createOne(School);
exports.updateSchool = factory.updateOne(School);
exports.deleteSchool = factory.deleteOne(School);
