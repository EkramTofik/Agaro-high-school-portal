const User = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.createUser = catchAsync(async (req, res, next) => {
  const { fullName, email, password, passwordConfirm, role, isActive } =
    req.body;

  if (!fullName || !email || !password || !passwordConfirm) {
    return next(
      new AppError(
        "Please provide full name, email, password, and password confirmation.",
        400,
      ),
    );
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
    passwordConfirm,
    role: role || "admin",
    isActive: isActive !== undefined ? isActive : true,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { fullName, email, role, isActive, password, passwordConfirm } =
    req.body;

  const user = await User.findById(req.params.id).select("+password");
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  if (fullName !== undefined) user.fullName = fullName;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  if (password || passwordConfirm) {
    if (!password || !passwordConfirm) {
      return next(
        new AppError(
          "Please provide both password and password confirmation.",
          400,
        ),
      );
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
  }

  await user.save();
  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
