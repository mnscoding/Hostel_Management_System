const express = require("express");
const router = express.Router();
const {
  getApprovedEmails,
  getApprovedEmail,
  createApprovedEmail,
  deleteApprovedEmail,
  updateApprovedEmail,
} = require("../controllers/approvedEmailController");

// Get all notices
router.get("/", getApprovedEmails);

// Get a single notice
router.get("/:id", getApprovedEmail);

// Post a new notice
router.post("/", createApprovedEmail);

// Delete a notice
router.delete("/:id", deleteApprovedEmail);

// Update a notice (use PATCH for partial updates)
router.patch("/:id", updateApprovedEmail);

module.exports = router;
