const StudentRequest = require("../models/studentRequestModel");
const mongoose = require("mongoose");
const { sendMail } = require("../services/emailService");

// Get all
const getStudentRequests = async (req, res) => {
  try {
    const studentRequests = await StudentRequest.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(studentRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single
const getStudentRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const studentRequest = await StudentRequest.findById(id);

  if (!studentRequest) {
    return res.status(404).json({ error: "No such request" });
  }
  res.status(200).json(studentRequest);
};

// Create new
const createStudentRequest = async (req, res) => {
  const { date, regNo, name, currentHostel, reason, user_id } = req.body;

  try {
    const studentRequest = await StudentRequest.create({
      date,
      regNo,
      name,
      currentHostel,
      reason,
      user_id,
    });

    // Send an email to the student
    const email = studentRequest.user_id; // Assuming user_id is the student's email
    const subject = `Transer request`;
    const text = `Dear ${studentRequest.regNo},\n\nYour request for transfering hostel has been successfully submitted. We will inform your about the approvance as soon as possible.`;

    await sendMail(email, subject, text);

    res.status(201).json(studentRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteStudentRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const studentRequest = await StudentRequest.findOneAndDelete({ _id: id });

  if (!studentRequest) {
    return res.status(404).json({ error: "No such request" });
  }
  res.status(200).json(studentRequest);
};

// Update
const updateStudentRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const studentRequest = await StudentRequest.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!studentRequest) {
    return res.status(404).json({ error: "No such request" });
  }
  res.status(200).json(studentRequest);
};

/*const updateStudentRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const studentRequest = await StudentRequest.findOneAndUpdate(
    { _id: id },
    {
      status: status, // Update status based on request
    },
    { new: true } // Return the updated
  );

  if (!complaint) {
    return res.status(404).json({ error: "No such reuqest" });
  }
  res.status(200).json(studentRequest);
};*/
const updateStudentRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  try {
    // Find the student request by ID
    const studentRequest = await StudentRequest.findById(id);

    if (!studentRequest) {
      return res.status(404).json({ error: "No such request" });
    }

    // Update the status
    studentRequest.status = status;
    await studentRequest.save();

    // Send an email to the student
    const email = studentRequest.user_id; // Assuming user_id is the student's email
    const subject = `Your Request Status Has Been Updated`;
    const text = `Dear ${studentRequest.regNo},\n\nYour request for transfering hostel has been ${status}.`;

    await sendMail(email, subject, text);

    // Return the updated request
    res.status(200).json(studentRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentRequestCount = async (req, res) => {
  try {
    // Get total count of all complaints
    const totalCount = await StudentRequest.countDocuments();

    // Get count of resolved complaints
    const acceptedCount = await StudentRequest.countDocuments({
      status: "approved",
    });

    // Get count of unresolved complaints
    const rejectedCount = await StudentRequest.countDocuments({
      status: "rejected",
    });

    // Get count of unresolved complaints
    const pendingCount = await StudentRequest.countDocuments({
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
  getStudentRequests,
  getStudentRequest,
  createStudentRequest,
  deleteStudentRequest,
  updateStudentRequest,
  getStudentRequestCount,
  updateStudentRequestStatus,
};
