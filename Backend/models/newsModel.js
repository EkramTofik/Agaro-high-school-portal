const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String },
    body: { type: String, required: true },
    category: {
      type: String,
      enum: ["Academic", "Sports", "Cultural", "Meeting", "Event", "Other"],
    },
    imageUrl: { type: String },
    isUrgent: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);
const News = mongoose.model("News", newsSchema);

module.exports = News;
