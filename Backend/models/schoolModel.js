const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortName: { type: String, trim: true },
    motto: { type: String, trim: true },
    foundingYear: { type: Number },
    description: { type: String },
    address: { type: String },
    city: { type: String },
    region: { type: String },
    phone: { type: String },
    email: { type: String, trim: true, lowercase: true },
    website: { type: String },
    logoUrl: { type: String },
    heroImageUrl: { type: String },
  },
  { timestamps: true },
);
const School = mongoose.model("School", schoolSchema);

module.exports = School;
