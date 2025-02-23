require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const noticeRoutes = require("./routes/notice");
const complaintRoutes = require("./routes/complaints");
const hostelRoutes = require("./routes/hostel");
const studentRoutes = require("./routes/student");
const dashboardRoutes = require("./routes/dashboard");
const applyRoutes = require("./routes/apply");

const uploadRoutes = require("./routes/upload");
const testRoutes = require("./routes/test");
const hostelApplyRoutes = require("./routes/hostelApply");
const registerRoutes = require("./routes/register");
const approvedEmailRoutes = require("./routes/approvedEmail");
const staffRoutes = require("./routes/staff");
const stripeRoutes = require("./routes/stripeRoutes");
const studentRequestRoutes = require("./routes/studentRequest");
//express app
const app = express();

//middleware
app.use(express.json());

app.use("/uploads", express.static("uploads")); // Serve uploaded files

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/apply", applyRoutes);

app.use("/api", uploadRoutes);
app.use("/api/test", testRoutes);
app.use("/api/hostelApply", hostelApplyRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/approvedEmails", approvedEmailRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/studentRequests", studentRequestRoutes);
//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
