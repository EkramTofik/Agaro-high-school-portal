const mongoose = require("mongoose");

const studentVoiceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    quote: { type: String, trim: true },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("StudentVoice", studentVoiceSchema);
