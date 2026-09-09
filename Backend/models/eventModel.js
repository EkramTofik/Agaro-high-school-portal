const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    location: { type: String },
    eventDate: { type: Date },
    imageUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Alumni = mongoose.model("Event", eventSchema);

module.exports = Alumni;
