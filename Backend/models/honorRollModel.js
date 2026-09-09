const mongoose = require("mongoose");

const honorRollSchema = new mongoose.Schema(
  {
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    rank: { type: Number, required: true, min: 1 },
    studentName: { type: String, required: true, trim: true },
    yearSpan: { type: String, required: true, trim: true },
    accomplishment: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("HonorRoll", honorRollSchema);
