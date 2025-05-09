/*02.08
const multer = require("multer");
const path = require("path");
const Register = require("../models/registerModel");
const { sendMail } = require("../services/emailService");
const mongoose = require("mongoose");

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
  const {
    name,
    regNo,
    gender,
    registeringYear,
    faculty,
    department,
    address,
    contactNo,
    email,
    parentNo,
  } = req.body;
  const filepath = req.file ? req.file.path : null; // Get file path

  try {
    const newRegister = await Register.create({
      name,
      regNo,
      gender,
      registeringYear,
      faculty,
      department,
      address,
      contactNo,
      email,
      parentNo,
      //filepath,
    });

    const subject = `Registration`;
    const message = `Dear ${newRegister.name},\n\nYour registration for Year ${newRegister.registeringYear} has been registration was submitted.We will inform your hostel as soon as possible.`;

    // Send email to the applicant
    await sendMail(newRegister.email, subject, message);

    res.status(201).json(newRegister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tests
const getRegisters = async (req, res) => {
  try {
    const registers = await Register.find({}).sort({ createdAt: -1 });
    res.status(200).json(registers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

// Delete a test
const deleteRegister = async (req, res) => {
  try {
    const { id } = req.params;
    await Register.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete test" });
  }
};

const updateRegister = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const register = await Register.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated document
  );
  if (!register) {
    return res.status(404).json({ error: "Application not found" });
  }
  // Prepare email content

  res.status(200).json(register);
};

const getRegisterCount = async (req, res) => {
  try {
    const count = await Register.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRegisterStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Ensure to accept status in the request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such register" });
  }

  const register = await Register.findOneAndUpdate(
    { _id: id },
    {
      status: status, // Update status based on request
    },
    { new: true } // Return the updated complaint
  );

  if (!register) {
    return res.status(404).json({ error: "No such register" });
  }
  res.status(200).json(register);
};

module.exports = {
  upload,
  uploadFile,
  getRegisters,
  deleteRegister,
  updateRegister,
  getRegisterCount,
  updateRegisterStatus,
};
*/

const multer = require("multer");
const path = require("path");
const Register = require("../models/registerModel");
const { sendMail } = require("../services/emailService");
const mongoose = require("mongoose");

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
  const {
    name,
    regNo,
    gender,
    registeringYear,

    contactNo,
    email,
    parentNo,
  } = req.body;
  const filepath = req.file ? req.file.path : null; // Get file path

  try {
    const newRegister = await Register.create({
      name,
      regNo,
      gender,
      registeringYear,

      contactNo,
      email,
      parentNo,
      //filepath,
    });

    const subject = `Registration`;
    const message = `Dear ${newRegister.name},\n\nYour registration for Year ${newRegister.registeringYear} has been registration was submitted.We will inform your hostel as soon as possible.`;

    // Send email to the applicant
    await sendMail(newRegister.email, subject, message);

    res.status(201).json(newRegister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tests
const getRegisters = async (req, res) => {
  try {
    const registers = await Register.find({}).sort({ createdAt: -1 });
    res.status(200).json(registers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

// Delete a test
const deleteRegister = async (req, res) => {
  try {
    const { id } = req.params;
    await Register.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete test" });
  }
};

const updateRegister = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const register = await Register.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated document
  );
  if (!register) {
    return res.status(404).json({ error: "Application not found" });
  }
  // Prepare email content

  res.status(200).json(register);
};

const getRegisterCount = async (req, res) => {
  try {
    const count = await Register.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRegisterStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Ensure to accept status in the request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such register" });
  }

  const register = await Register.findOneAndUpdate(
    { _id: id },
    {
      status: status, // Update status based on request
    },
    { new: true } // Return the updated complaint
  );

  if (!register) {
    return res.status(404).json({ error: "No such register" });
  }
  res.status(200).json(register);
};

module.exports = {
  upload,
  uploadFile,
  getRegisters,
  deleteRegister,
  updateRegister,
  getRegisterCount,
  updateRegisterStatus,
};
