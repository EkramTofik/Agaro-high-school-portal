process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
});

const dotenv = require("dotenv");
const dns = require("dns");

const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = require("./app");

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error("Missing DATABASE or DATABASE_PASSWORD env var");
}

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connection successful  🎉");
  })
  .catch((err) => {
    console.error("Database connection failed 💥");
    console.error(err);
  });
const port = process.env.PORT;
if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`App is running on ${port}...`);
  });
}

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down gracefully...");
  console.log(`Error Name: ${err.name}`);
  console.log(`Error Message: ${err.message}`);
});
module.exports = app;
