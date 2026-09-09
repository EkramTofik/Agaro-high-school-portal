const StaffMember = require("../models/staffModel");

const factory = require("./handlerFactory");

exports.getAllStaffMembers = factory.getAll(StaffMember);
exports.getStaffMember = factory.getOne(StaffMember);
exports.createStaffMember = factory.createOne(StaffMember);
exports.updateStaffMember = factory.updateOne(StaffMember);
exports.deleteStaffMember = factory.deleteOne(StaffMember);
