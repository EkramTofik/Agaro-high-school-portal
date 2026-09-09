const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
