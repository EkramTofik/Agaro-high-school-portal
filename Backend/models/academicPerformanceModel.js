const mongoose = require("mongoose");

const academicPerformanceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    year: { type: Number, required: true },
    passRate: { type: Number, required: true, min: 0, max: 100 },
    distinctionsPercent: { type: Number, min: 0, max: 100 },
    averageGPA: { type: Number, min: 0, max: 700 },
    topStudentName: { type: String, trim: true },
    topStudentImageUrl: { type: String },
  },
  { timestamps: true },
);

academicPerformanceSchema.index({ school: 1, year: 1 }, { unique: true });

const AcademicPerformance = mongoose.model(
  "AcademicPerformance",
  academicPerformanceSchema,
);

module.exports = AcademicPerformance;
