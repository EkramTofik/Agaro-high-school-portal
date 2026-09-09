const factory = require("./handlerFactory");
const HonorRoll = require("../models/honorRollModel");

exports.getAllHonorRoll = factory.getAll(HonorRoll);
exports.createHonorRoll = factory.createOne(HonorRoll);
exports.getHonorRoll = factory.getOne(HonorRoll);
exports.updateHonorRoll = factory.updateOne(HonorRoll);
exports.deleteHonorRoll = factory.deleteOne(HonorRoll);
