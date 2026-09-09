const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Football", "Athletics", "Volleyball"],
      required: true,
    },
    achievement: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Team", teamSchema);
