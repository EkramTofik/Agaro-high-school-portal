const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    startYear: { type: Number, required: true },
    endYear: { type: Number, required: true },
    isCurrent: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Academicyear = mongoose.model("Academicyear", academicYearSchema);

module.exports = Academicyear;
