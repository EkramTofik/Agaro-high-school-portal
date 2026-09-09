const factory = require("./handlerFactory");
const MediaFile = require("../models/mediafileModel");

exports.getAllMediaFiles = factory.getAll(MediaFile);
exports.getMediaFile = factory.getOne(MediaFile);
exports.createMediaFile = factory.createOne(MediaFile);
exports.updateMediaFile = factory.updateOne(MediaFile);
exports.deleteMediaFile = factory.deleteOne(MediaFile);
