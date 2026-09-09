const factory = require("./handlerFactory");
const Contact = require("../models/contactModel");
const School = require("../models/schoolModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllContacts = factory.getAll(Contact);
exports.getContact = factory.getOne(Contact);
exports.createContact = catchAsync(async (req, res) => {
  const school = await School.findOne();
  if (!school) {
    return res.status(503).json({ status: "fail", message: "School record is not configured." });
  }
  const contact = await Contact.create({ ...req.body, school: school._id });
  res.status(201).json({ status: "success", data: { contact } });
});
exports.updateContact = factory.updateOne(Contact);
exports.deleteContact = factory.deleteOne(Contact);
