const express = require("express");
const {
  upload,
  uploadFile,
  getUploads,
  deleteUpload,
} = require("../controllers/uploadController");

const router = express.Router();

// Define the upload route
router.post("/upload", upload.single("file"), uploadFile);

// Get all uploads
router.get("/uploads", getUploads);

// Delete an upload
router.delete("/uploads/:id", deleteUpload);

module.exports = router;
