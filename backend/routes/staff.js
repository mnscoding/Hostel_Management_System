const express = require("express");
const {
  upload,
  uploadFile,
  getStaffs,
  getStaff,
  deleteStaff,
  updateStaff,
} = require("../controllers/staffController");

const router = express.Router();

// Define the upload route
router.post("/staff", upload.single("file"), uploadFile);

// Get all tests
router.get("/staff", getStaffs);

//Get a staff
router.get("/staff/:id", getStaff);

// Delete a test
router.delete("/staff/:id", deleteStaff);

//update
router.patch("/staff/:id", updateStaff);
//router.patch("/staff/:id/status", updateHostelApplyStatus);

module.exports = router;
