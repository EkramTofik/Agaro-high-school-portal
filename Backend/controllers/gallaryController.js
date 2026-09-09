const factory = require("./handlerFactory");
const GalleryItem = require("../models/galleryitemModel");

exports.getAllGalleryItems = factory.getAll(GalleryItem);
exports.getGalleryItem = factory.getOne(GalleryItem);
exports.createGalleryItem = factory.createOne(GalleryItem);
exports.updateGalleryItem = factory.updateOne(GalleryItem);
exports.deleteGalleryItem = factory.deleteOne(GalleryItem);
