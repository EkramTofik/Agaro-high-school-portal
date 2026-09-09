const mongoose = require("mongoose");

const galleryItemSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["historic", "campus", "sports", "events"],
      required: true,
    },
    imageUrl: { type: String, required: true },
    caption: { type: String },
  },
  { timestamps: true },
);
const Galleryitem = mongoose.model("Galleryitem", galleryItemSchema);

module.exports = Galleryitem;
