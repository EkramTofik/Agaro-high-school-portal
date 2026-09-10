const express = require("express");

const app = express();
const cors = require("cors");

const morgan = require("morgan");

// const AppError = require("./utiles/appError");
const globalErrorHandler = require("./controllers/errorController");

// const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const schoolRouter = require("./routes/schoolRouter");
const departmentRouter = require("./routes/departmentRouter");
const staffRouter = require("./routes/staffRouter");
const alumniRouter = require("./routes/alumniRouter");
const newsRouter = require("./routes/newsRouter");
const academicYearRouter = require("./routes/academicyearRouter");
const academicRecordRouter = require("./routes/academicrecordRouter");
const resourceRouter = require("./routes/resourceRouter");
const clubRouter = require("./routes/clubRouter");
const gallaryRouter = require("./routes/gallaryRouter");
const contactRouter = require("./routes/contactRouter");
const mediaFileRouter = require("./routes/mediafileController");
const eventRouter = require("./routes/eventRouter");
const studentVoiceRouter = require("./routes/studentVoiceRouter");
const honorRollRouter = require("./routes/honorRollRouter");
const teamRouter = require("./routes/teamRouter");
const { protect, restrictTo } = require("./controllers/authenticationController");
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, Postman, same-origin server calls)
    if (!origin) return callback(null, true);

    // Allow any Vercel domain: production + previews
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Allow localhost for local dev (Vite default 5173, others 3000)
    if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));
app.use(express.json());

// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
// Public reads remain available, while all writes require an administrator.
// Contact submissions are intentionally public so the contact form works.
app.use("/api/v1", (req, res, next) => {
  if (req.path.startsWith("/contact") || req.method === "GET") return next();
  return protect(req, res, (error) => {
    if (error) return next(error);
    return restrictTo("admin")(req, res, next);
  });
});
// app.all("*path", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/alumni", alumniRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/academicYear", academicYearRouter);
app.use("/api/v1/academicRecord", academicRecordRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/club", clubRouter);
app.use("/api/v1/gallary", gallaryRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/mediaFile", mediaFileRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/studentVoice", studentVoiceRouter);
app.use("/api/v1/honorRoll", honorRollRouter);
app.use("/api/v1/team", teamRouter);

app.use(globalErrorHandler);
module.exports = app;
