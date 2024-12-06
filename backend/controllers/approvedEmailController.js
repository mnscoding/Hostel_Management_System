const ApprovedEmail = require("../models/approvedEmailModel");
const mongoose = require("mongoose");

// Get all emails
const getApprovedEmails = async (req, res) => {
  const approvedEmails = await ApprovedEmail.find({}).sort({ createdAt: -1 });
  res.status(200).json(approvedEmails);
};

// Get a single email
const getApprovedEmail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such email" });
  }

  const approvedEmail = await ApprovedEmail.findById(id);
  if (!email) {
    return res.status(404).json({ error: "No such email" });
  }
  res.status(200).json(approvedEmail);
};

// Create new email
const createApprovedEmail = async (req, res) => {
  const { email, category } = req.body;

  try {
    const approvedEmail = await ApprovedEmail.create({ email, category });
    res.status(200).json(approvedEmail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a email
const deleteApprovedEmail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such email" });
  }

  const approvedEmail = await ApprovedEmail.findOneAndDelete({ _id: id });
  if (!approvedEmail) {
    return res.status(404).json({ error: "No such email" });
  }
  res.status(200).json(approvedEmail);
};

// Update a email
const updateApprovedEmail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such email" });
  }

  const approvedEmail = await ApprovedEmail.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated email
  );

  if (!email) {
    return res.status(404).json({ error: "No such email" });
  }
  res.status(200).json(approvedEmail);
};

const getApprovedEmailCount = async (req, res) => {
  try {
    const count = await ApprovedEmail.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getApprovedEmails,
  getApprovedEmail,
  createApprovedEmail,
  deleteApprovedEmail,
  updateApprovedEmail,
  getApprovedEmailCount,
};
