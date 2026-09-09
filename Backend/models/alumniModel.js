const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: { type: String, required: true, trim: true },
    graduationYear: { type: Number },
    profession: {
      type: String,
      enum: [
        "Science & Medicine",
        "Public Affairs",
        "Technology & Business",
        "Fine Arts",
      ],
    },
    company: { type: String },
    location: { type: String },
    bio: { type: String },
    imageUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;
