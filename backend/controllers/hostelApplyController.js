const multer = require("multer");
const path = require("path");
const HostelApply = require("../models/hostelApplyModel");
const ApprovedEmail = require("../models/approvedEmailModel");
const { sendMail } = require("../services/emailService");

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
    address,
    district,
    city,
    contactNo,
    distance,
    email,
    year,
    faculty,
    department,
    income,
  } = req.body;
  /*02.08 commented for add photoPath
  const filepath = req.file ? req.file.path : null;*/ // Get file path

  const filepath = req.files && req.files.file ? req.files.file[0].path : null; // 'file' field
  const photoPath =
    req.files && req.files.photo ? req.files.photo[0].path : null; // 'photo

  try {
    const newHostelApply = await HostelApply.create({
      name,
      regNo,
      address,
      district,
      city,
      contactNo,
      distance,
      email,
      year,
      faculty,
      department,
      income,
      filepath,
      photoPath,
    });
    res.status(201).json(newHostelApply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tests
const getHostelApplies = async (req, res) => {
  try {
    const hostelApplies = await HostelApply.find({});
    res.status(200).json(hostelApplies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

// Delete a test
const deleteHostelApply = async (req, res) => {
  try {
    const { id } = req.params;
    await HostelApply.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete test" });
  }
};
/*
const updateHostelApplyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expecting status to be passed in the body

  try {
    const updatedApply = await HostelApply.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    if (!updatedApply) {
      return res.status(404).json({ error: "Application not found" });
    }
    // Prepare email content
    const subject = `Your application has been ${status.toLowerCase()}`;
    const message = `Dear ${
      updatedApply.name
    },Your application has been ${status.toLowerCase()}`;

    // Send email to the applicant
    await sendMail(updatedApply.email, subject, message);
    if (status.toLowerCase() === "accepted") {
      await ApprovedEmail.create({
        email: updatedApply.email,
        category: "Student",
      });
    }

    res.status(200).json(updatedApply);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};*/

const updateHostelApplyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate inputs
  if (!id || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const normalizedStatus = status.toLowerCase();
  const allowedStatuses = ["accepted", "rejected"]; // Add other statuses if needed

  if (!allowedStatuses.includes(normalizedStatus)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedApply = await HostelApply.findByIdAndUpdate(
      id,
      { status: normalizedStatus },
      { new: true }
    );

    if (!updatedApply) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Prepare email content
    let subject = `Your application has been ${normalizedStatus}`;
    let message = `Dear ${updatedApply.name},\n\nYour application has been ${normalizedStatus}.`;

    if (normalizedStatus === "accepted") {
      message += `\n\nNow you can sign up to the system with this email.`;
    }

    // Send email to the applicant
    try {
      await sendMail(updatedApply.email, subject, message);
    } catch (mailError) {
      console.error("Failed to send email:", mailError);
    }

    // If accepted, save the email to ApprovedEmail collection
    if (normalizedStatus === "accepted") {
      try {
        await ApprovedEmail.create({
          email: updatedApply.email,
          category: "Student",
        });
      } catch (approvalError) {
        console.error("Failed to save approved email:", approvalError);
      }
    }

    res.status(200).json(updatedApply);
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};

const getHostelApplyCount = async (req, res) => {
  try {
    // Get total count of all complaints
    const totalCount = await HostelApply.countDocuments();

    // Get count of resolved complaints
    const acceptedCount = await HostelApply.countDocuments({
      status: "accepted",
    });

    // Get count of unresolved complaints

    const rejectedCount = await HostelApply.countDocuments({
      status: "rejected",
    });
    const pendingCount = await HostelApply.countDocuments({
      status: "pending",
    });
    // Send the counts as response
    res.status(200).json({
      totalCount,
      acceptedCount,
      rejectedCount,
      pendingCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  upload,
  uploadFile,
  getHostelApplies,
  deleteHostelApply,
  updateHostelApplyStatus,
  getHostelApplyCount,
};
