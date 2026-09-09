const factory = require("./handlerFactory");
const StudentVoice = require("../models/studentVoiceModel");

exports.getAllStudentVoices = factory.getAll(StudentVoice);
exports.createStudentVoice = factory.createOne(StudentVoice);
exports.getStudentVoice = factory.getOne(StudentVoice);
exports.updateStudentVoice = factory.updateOne(StudentVoice);
exports.deleteStudentVoice = factory.deleteOne(StudentVoice);
