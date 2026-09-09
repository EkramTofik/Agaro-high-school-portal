const mongoose = require("mongoose");

const staffMemberSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    qualifications: { type: String },
    leadershipCredentials: { type: String, trim: true },
    yearsAtSchool: { type: Number, min: 0 },
    publishedPapers: { type: Number, min: 0 },
    bio: { type: String },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    isLeadership: { type: Boolean, default: false },
    isPresident: { type: Boolean, default: false },
    isVicePresident: { type: Boolean, default: false },
    isDistinguished: { type: Boolean, default: false },
    isAdministrative: { type: Boolean, default: false },
    office: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);
const Staff = mongoose.model("StaffMember", staffMemberSchema);

module.exports = Staff;
