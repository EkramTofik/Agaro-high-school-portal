const factory = require("./handlerFactory");
const Alumni = require("../models/alumniModel");

exports.getAllAlumnis = factory.getAll(Alumni);
exports.getAlumni = factory.getOne(Alumni);
exports.createAlumni = factory.createOne(Alumni);
exports.updateAlumni = factory.updateOne(Alumni);
exports.deleteAlumni = factory.deleteOne(Alumni);
