const Hostel = require("../models/hostelModel");
const mongoose = require("mongoose");

// Get all hostels
const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({}).sort({ createdAt: -1 });
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single hostel
const getHostel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hostel" });
  }

  const hostel = await Hostel.findById(id);

  if (!hostel) {
    return res.status(404).json({ error: "No such hostel" });
  }

  res.status(200).json(hostel);
};

// Create new hostel
const createHostel = async (req, res) => {
  const {
    name,
    location,
    gender,
    warden,
    roomCount,
    maxStudents,
    existingStudents,
  } = req.body;

  // Add doc to db
  try {
    const hostel = await Hostel.create({
      name,
      location,
      gender,
      warden,
      roomCount,
      maxStudents,
      existingStudents,
    });
    res.status(201).json(hostel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a hostel
const updateHostel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hostel" });
  }

  const hostel = await Hostel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true } // Return the updated document
  );

  if (!hostel) {
    return res.status(404).json({ error: "No such hostel" });
  }

  res.status(200).json(hostel);
};

// Delete a hostel
const deleteHostel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hostel" });
  }

  const hostel = await Hostel.findOneAndDelete({ _id: id });

  if (!hostel) {
    return res.status(404).json({ error: "No such hostel" });
  }

  res.status(200).json(hostel);
};

const getHostelCount = async (req, res) => {
  try {
    const count = await Hostel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getHostelCounts = async (req, res) => {
  try {
    const hostels = await Hostel.find({});

    const filledCount = hostels.filter(
      (hostel) =>
        hostel.existingStudents.reduce(
          (acc, student) => acc + student.count,
          0
        ) >= hostel.maxStudents
    ).length;

    const notFilledCount = hostels.length - filledCount;

    res.status(200).json({
      totalCount: hostels.length,
      filledCount,
      notFilledCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getHostels,
  getHostel,
  createHostel,
  updateHostel,
  deleteHostel,
  getHostelCount,
  getHostelCounts,
};
