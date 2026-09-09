const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    coordinatorName: { type: String },
    imageUrl: { type: String },
    category: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
