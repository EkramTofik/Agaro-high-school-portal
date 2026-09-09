const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);
const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
