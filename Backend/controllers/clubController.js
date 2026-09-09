const factory = require("./handlerFactory");
const Club = require("../models/clubModel");

exports.getAllClubs = factory.getAll(Club);
exports.getClub = factory.getOne(Club);
exports.createClub = factory.createOne(Club);
exports.updateClub = factory.updateOne(Club);
exports.deleteClub = factory.deleteOne(Club);
