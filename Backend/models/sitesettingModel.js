const mongoose = require("mongoose");

const siteSettingSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      unique: true,
    },
    settingKey: { type: String, required: true, unique: true },
    settingValue: { type: String },
  },
  { timestamps: true },
);
const Sitesetting = mongoose.model("Sitesetting", siteSettingSchema);

module.exports = Sitesetting;
