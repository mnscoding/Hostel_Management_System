const multer = require("multer");
const path = require("path");
const Test = require("../models/testModel");

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
  const { name, filename } = req.body;
  const filepath = req.file ? req.file.path : null; // Get file path

  try {
    const newTest = await Test.create({ name, filename, filepath });
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tests
const getTests = async (req, res) => {
  try {
    const tests = await Test.find({});
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

// Delete a test
const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    await Test.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete test" });
  }
};

module.exports = { upload, uploadFile, getTests, deleteTest };
