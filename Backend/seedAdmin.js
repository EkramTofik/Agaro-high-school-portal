require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const User = require("./models/userModel");

const run = async () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD,
  );

  await mongoose.connect(DB);
  console.log("Database connection successful 🎉");

  const existing = await User.findOne({ email: "ekru6482@gmail.com" });
  if (existing) {
    console.log("Admin already exists.");
    process.exit();
  }

  await User.create({
    fullName: "Ekram Tofik",
    email: "ekru6482@gmail.com",
    password: "ekram12345",
    passwordConfirm: "ekram12345",
    role: "admin",
  });

  console.log("Admin created.");
  process.exit();
};

run();
