const mongoose = require("mongoose");

const mediaFileSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    mimeType: { type: String },
    sizeBytes: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);
const Mediafile = mongoose.model("Mediafile", mediaFileSchema);

module.exports = Mediafile;
