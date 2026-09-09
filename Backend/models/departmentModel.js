const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    headName: { type: String },
  },
  { timestamps: true },
);
const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
