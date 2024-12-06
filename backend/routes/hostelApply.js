const express = require("express");
const {
  upload,
  uploadFile,
  getHostelApplies,
  deleteHostelApply,
  updateHostelApplyStatus,
} = require("../controllers/hostelApplyController");

const router = express.Router();

// Define the upload route
router.post("/hostelApply", upload.single("file"), uploadFile);

// Get all tests
router.get("/hostelApplies", getHostelApplies);

// Delete a test
router.delete("/hostelApplies/:id", deleteHostelApply);
router.patch("/hostelApplies/:id/status", updateHostelApplyStatus);

module.exports = router;
