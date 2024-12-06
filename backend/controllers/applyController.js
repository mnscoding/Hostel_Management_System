const Apply = require("../models/applyModel");
const mongoose = require("mongoose");
const { sendMail } = require("../services/emailService");

// Get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Apply.find({}).sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

// Get a single application
const getApplication = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such application" });
  }

  try {
    const application = await Apply.findById(id);
    if (!application) {
      return res.status(404).json({ error: "No such application" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
};

// Create a new application
const createApplication = async (req, res) => {
  const {
    name,
    regNo,
    email,
    year,
    faculty,
    department,
    contactNo,
    gender,
    distanceFromHome,
    income,
    user_id,
    status,
  } = req.body;

  // Add new application to the database
  try {
    const application = await Apply.create({
      name,
      regNo,
      email,
      year,
      faculty,
      department,
      contactNo,
      gender,
      distanceFromHome,
      income,
      user_id,
      status,
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such application" });
  }

  try {
    const application = await Apply.findOneAndDelete({ _id: id });
    if (!application) {
      return res.status(404).json({ error: "No such application" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
};

// Update an application
const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Extract the status from the request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such application" });
  }

  try {
    const application = await Apply.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // Return the updated document
    );

    if (!application) {
      return res.status(404).json({ error: "No such application" });
    }

    // Prepare email content
    const subject = `Your application has been ${status.toLowerCase()}`;
    const message = `<h1>Your application has been ${status.toLowerCase()}</h1>`;

    // Send email to the applicant
    await sendMail(application.email, subject, message);

    res.status(200).json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Failed to update application" });
  }
};

// Get the total number of applications
const getApplicationCount = async (req, res) => {
  try {
    const count = await Apply.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getApplications,
  getApplication,
  createApplication,
  deleteApplication,
  updateApplication,
  getApplicationCount, // Export the new function
};
