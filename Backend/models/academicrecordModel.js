const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear" },
    title: { type: String, required: true, trim: true },
    recordType: {
      type: String,
      enum: ["exam", "result", "study_guide", "archive", "report"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileType: { type: String },
    fileSize: { type: Number },
    visibility: {
      type: String,
      enum: ["public", "restricted"],
      default: "public",
    },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);
const Academicrecord = mongoose.model("Academicrecord", academicRecordSchema);

module.exports = Academicrecord;
