const Upload = require("../models/uploadModel");
const path = require("path");
const multer = require("multer");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

// Initialize upload variable with Multer storage configuration
const upload = multer({ storage });

// Upload file and save to database
const uploadFile = async (req, res) => {
  const { filename } = req.body;
  const filepath = req.file ? req.file.path : null; // Get file path

  try {
    const newUpload = await Upload.create({ filename, filepath });
    res.status(201).json(newUpload);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all uploads
const getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({});
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};

// Delete an upload
const deleteUpload = async (req, res) => {
  try {
    const { id } = req.params;
    await Upload.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete upload" });
  }
};

module.exports = { upload, uploadFile, getUploads, deleteUpload };
