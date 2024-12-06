const User = require("../models/userModel");
const ApprovedEmail = require("../models/approvedEmailModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../services/emailService");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);
    const category = user.category;

    res.status(200).json({ email, token, category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
// Import ApprovedEmail model

const signupUser = async (req, res) => {
  const { email, password } = req.body; // category will be retrieved from ApprovedEmail

  try {
    // Check if the email is in approved emails
    const approvedEmail = await ApprovedEmail.findOne({ email });

    if (!approvedEmail) {
      return res.status(403).json({ error: "Your email has no permission." });
    }

    const category = approvedEmail.category; // Get the category from the approved email

    // Create the user
    const user = await User.signup(email, password, category);

    // Create a token
    const token = createToken(user._id);

    const subject = `Hostel Management System`;
    const message = ` You have been signed in to Hostel Management System from your email. Welcome to Hostel Management System!`;

    // Send email to the applicant
    await sendMail(email, subject, message);

    res.status(200).json({ email, token, category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*const getUserCount = async (req, res) => {
  console.log("Fetching student count..."); // Add this line
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching user count:", error); // Add this line
    res.status(500).json({ error: "Internal Server Error" });
  }
};*/
// Make sure you import the correct User model

const getUserCount = async (req, res) => {
  try {
    // Get total count of all users
    const totalCount = await User.countDocuments(); // Use User model

    // Get count of admins
    const adminCount = await User.countDocuments({ category: "Admin" });

    // Get count of staff
    const staffCount = await User.countDocuments({ category: "Staff" });

    // Get count of students
    const studentCount = await User.countDocuments({ category: "Student" });

    // Send the counts as response
    res.status(200).json({
      totalCount,
      adminCount,
      staffCount,
      studentCount,
    });
  } catch (error) {
    console.error("Error fetching user counts:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Adjust the query as needed
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Get user ID from request params
  const updates = req.body; // Get updated data from request body

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the model schema
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params; // Get user ID from request params

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUserCount,
  getUsers,
  updateUser,
  deleteUser,
};
