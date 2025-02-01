/*const Complaint = require("../models/complaintModel");
const mongoose = require("mongoose");

//get all complaints
const getComplaints = async (req, res) => {
  const complaints = await Complaint.find({}).sort({ createdAt: -1 });

  res.status(200).json(complaints);
};

//get a single complaint
const getComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

//create new complaint
const createComplaint = async (req, res) => {
  const { date, hostel, description, user_id } = req.body;

  //add doc to db
  try {
    const complaint = await Complaint.create({
      date,
      hostel,
      description,
      user_id,
    });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a complaint
const deleteComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findOneAndDelete({ _id: id });

  if (!complaint) {
    res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

//update a complaint
const updateComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true } // Return the updated notice
  );

  if (!complaint) {
    res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

const getComplaintCount = async (req, res) => {
  try {
    const count = await Complaint.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  updateComplaint,
  getComplaintCount,
};
*/
const Complaint = require("../models/complaintModel");
const mongoose = require("mongoose");

// Get all complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single complaint
const getComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    return res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

// Create new complaint
const createComplaint = async (req, res) => {
  const { date, hostel, description, user_id } = req.body;

  try {
    const complaint = await Complaint.create({
      date,
      hostel,
      description,
      user_id,
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findOneAndDelete({ _id: id });

  if (!complaint) {
    return res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

// Update a complaint
const updateComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!complaint) {
    return res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};
// Update a complaint
// Update a complaint status (resolved/unresolved)

const updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Ensure to accept status in the request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findOneAndUpdate(
    { _id: id },
    {
      status: status, // Update status based on request
    },
    { new: true } // Return the updated complaint
  );

  if (!complaint) {
    return res.status(404).json({ error: "No such complaint" });
  }
  res.status(200).json(complaint);
};

/*const getComplaintCount = async (req, res) => {
  try {
    const count = await Complaint.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};*/
const getComplaintCount = async (req, res) => {
  try {
    // Get total count of all complaints
    const totalCount = await Complaint.countDocuments();

    // Get count of resolved complaints
    const resolvedCount = await Complaint.countDocuments({
      status: "resolved",
    });

    // Get count of unresolved complaints
    const unresolvedCount = await Complaint.countDocuments({
      status: "unresolved",
    });

    // Get count of unresolved complaints
    const processingCount = await Complaint.countDocuments({
      status: "processing",
    });

    // Send the counts as response
    res.status(200).json({
      totalCount,
      resolvedCount,
      unresolvedCount,
      processingCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  updateComplaint,
  getComplaintCount,
  updateComplaintStatus,
};
