/*const Notice = require("../models/noticeModel");
const mongoose = require("mongoose");

//get all notices
const getNotices = async (req, res) => {
  const notices = await Notice.find({}).sort({ createdAt: -1 });

  res.status(200).json(notices);
};

//get a single notice
const getNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findById(id);

  if (!notice) {
    res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

//create new notice
const createNotice = async (req, res) => {
  const { date, title, description } = req.body;

  //add doc to db
  try {
    const notice = await Notice.create({ date, title, description });
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a notice
const deleteNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findOneAndDelete({ _id: id });

  if (!notice) {
    res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

//update a notice
const updateNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!notice) {
    res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

const getNoticeCount = async (req, res) => {
  console.log("Fetching notice count..."); // Add this line
  try {
    const count = await Notice.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching notice count:", error); // Add this line
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice,
  getNoticeCount,
};*/

/*02.04
const Notice = require("../models/noticeModel");
const mongoose = require("mongoose");
const User = require("../models/userModel"); // Adjust the path as necessary
const { sendMail } = require("../services/emailService"); // Adjust the path as necessary

// Get all notices
const getNotices = async (req, res) => {
  const notices = await Notice.find({}).sort({ createdAt: -1 });
  res.status(200).json(notices);
};

// Get a single notice
const getNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findById(id);
  if (!notice) {
    return res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

// Create new notice
const createNotice = async (req, res) => {
  const { date, hostel, title, description } = req.body;

  try {
    const notice = await Notice.create({ date, hostel, title, description });
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


  // Fetch all users
  const users = await User.find(); // Fetch all users
  const emails = users.map((user) => user.email); // Extract emails

  // Prepare email content
  const subject = `New Notice: ${title}`;
  const message = `
    <h1>${title}</h1>
    <p>Date: ${date}</p>
    <p>${description}</p>
  `;

  // Send emails to all users
  const emailPromises = emails.map((email) =>
    sendMail(email, subject, message)
  );
  await Promise.all(emailPromises); // Wait for all emails to be sent
};

// Delete a notice
const deleteNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findOneAndDelete({ _id: id });
  if (!notice) {
    return res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

// Update a notice
const updateNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated notice
  );

  if (!notice) {
    return res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

const getNoticeCount = async (req, res) => {
  try {
    const count = await Notice.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice,
  getNoticeCount,
};*/

const Notice = require("../models/noticeModel");
const mongoose = require("mongoose");
const User = require("../models/userModel"); // Adjust the path as necessary
const { sendMail } = require("../services/emailService"); // Adjust the path as necessary
const multer = require("multer");
const path = require("path");

///////new
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

//////new
const upload = multer({ storage });

// Get all notices
const getNotices = async (req, res) => {
  const notices = await Notice.find({}).sort({ createdAt: -1 });
  res.status(200).json(notices);
};

// Get a single notice
const getNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findById(id);
  if (!notice) {
    return res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

// Create new notice
const createNotice = async (req, res) => {
  const { date, hostel, title, description } = req.body;

  //new
  const filepath = req.file ? req.file.path : null; // Get file path

  try {
    const notice = await Notice.create({
      date,
      hostel,
      title,
      description,
      filepath,
    });
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //************************************* */
  // Fetch all users
  const users = await User.find(); // Fetch all users
  const emails = users.map((user) => user.email); // Extract emails

  // Prepare email content
  const subject = `New Notice: ${title}`;
  const message = `
    <h1>${title}</h1>
    <p>Date: ${date}</p>
    <p>${description}</p>
  `;

  // Send emails to all users
  const emailPromises = emails.map((email) =>
    sendMail(email, subject, message)
  );
  await Promise.all(emailPromises); // Wait for all emails to be sent
};

// Delete a notice
const deleteNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findOneAndDelete({ _id: id });
  if (!notice) {
    return res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

// Update a notice
const updateNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such notice" });
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated notice
  );

  if (!notice) {
    return res.status(404).json({ error: "No such notice" });
  }
  res.status(200).json(notice);
};

const getNoticeCount = async (req, res) => {
  try {
    const count = await Notice.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  upload,
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice,
  getNoticeCount,
};
