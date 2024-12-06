/*const express = require("express");
const Complaint = require("../models/complaintModel");
const router = express.Router();
const {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  updateComplaint,
} = require("../controllers/complaintController");

//get all Complaints
router.get("/", getComplaints);

//get a single Complaint
router.get("/:id", getComplaint);

//post a new Complaint
router.post("/", createComplaint);

//delete a Complaint
router.delete("/:id", deleteComplaint);

//update a Complaint
router.patch("/:id", updateComplaint);

module.exports = router;*/
const express = require("express");
const router = express.Router();
const {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  updateComplaint,
  updateComplaintStatus,
} = require("../controllers/complaintController");

// Get all complaints
router.get("/", getComplaints);

// Get a single complaint
router.get("/:id", getComplaint);

// Create a new complaint
router.post("/", createComplaint);

// Delete a complaint
router.delete("/:id", deleteComplaint);

// Update a complaint
router.patch("/:id", updateComplaint);

router.patch("/:id/status", updateComplaintStatus);

module.exports = router;
