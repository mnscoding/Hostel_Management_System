const express = require("express");
const {
  upload,
  uploadFile,
  getTests,
  deleteTest,
} = require("../controllers/testController");

const router = express.Router();

// Define the upload route
router.post("/test", upload.single("file"), uploadFile);

// Get all tests
router.get("/tests", getTests);

// Delete a test
router.delete("/tests/:id", deleteTest);

module.exports = router;
