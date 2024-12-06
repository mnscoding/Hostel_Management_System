const express = require("express");
const Apply = require("../models/applyModel");
const router = express.Router();
const {
  getApplications,
  getApplication,
  createApplication,
  deleteApplication,
  updateApplication,
  getApplicationCount, // Optional: if you want to use it
} = require("../controllers/applyController");

// Get all applications
router.get("/", getApplications);

// Get a single application
router.get("/:id", getApplication);

// Post a new application
router.post("/", createApplication);

// Delete an application
router.delete("/:id", deleteApplication);

// Update an application
router.patch("/:id", updateApplication);

// Get the total number of applications (optional)
router.get("/count", getApplicationCount);

module.exports = router;
