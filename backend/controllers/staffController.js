const multer = require("multer");
const path = require("path");
const Staff = require("../models/staffModel");
const mongoose = require("mongoose");
const ApprovedEmail = require("../models/approvedEmailModel");

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

const getStaffs = async (req, res) => {
  const staffs = await Staff.find({});
  res.status(200).json(staffs);
};

const getStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such staff" });
  }

  const staff = await Staff.findById(id);

  if (!staff) {
    return res.status(404).json({ error: "No such staff" });
  }
  res.status(200).json(staff);
};

const uploadFile = async (req, res) => {
  const {
    name,
    gender,
    maritalStatus,
    address,
    contactNo,
    hostel,
    position,
    email,
  } = req.body;
  const filepath = req.file ? req.file.path : null; // Get file path

  try {
    const newStaff = await Staff.create({
      name,
      gender,
      maritalStatus,
      address,
      contactNo,
      hostel,
      position,
      email,
      filepath,
    });
    await ApprovedEmail.create({
      email,
      category: "Staff",
    });

    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete test" });
  }
};

const updateStaff = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such staff" });
  }

  // Prepare the update data
  const updateData = req.body;

  try {
    // Update the staff member
    const updatedStaff = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStaff) {
      return res.status(404).json({ error: "No such staff" });
    }

    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStaffCount = async (req, res) => {
  try {
    const count = await Staff.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  upload,
  uploadFile,
  getStaffs,
  getStaff,
  deleteStaff,
  updateStaff,
  getStaffCount,
};
