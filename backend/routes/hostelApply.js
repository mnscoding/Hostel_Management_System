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
/*02.08 commented for add photoPath
router.post("/hostelApply", upload.single("file"), uploadFile);*/

router.post(
  "/hostelApply",
  upload.fields([
    { name: "file", maxCount: 1 }, // For the main file
    { name: "photo", maxCount: 1 }, // For the photo
  ]),
  uploadFile
);

// Get all tests
router.get("/hostelApplies", getHostelApplies);

// Delete a test
router.delete("/hostelApplies/:id", deleteHostelApply);
router.patch("/hostelApplies/:id/status", updateHostelApplyStatus);

module.exports = router;
