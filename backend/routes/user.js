/*const express = require("express");

//controller function
const {
  signupUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

//login routes
router.post("/login", loginUser);

//signup routes
router.post("/signup", signupUser);

router.get("/", getUsers);

router.patch("/:id", updateUser); // Update user by ID

router.delete("/:id", deleteUser); // Delete user by ID

module.exports = router;*/

const express = require("express");
const {
  signupUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  forgotPassword, // Add forgotPassword route
  resetPassword, // Add resetPassword route
} = require("../controllers/userController");

const router = express.Router();

// Existing routes
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

// New routes for forgot password and reset password
router.post("/forgot-password", forgotPassword); // Handle forgot password
router.post("/reset-password", resetPassword); // Handle reset password

module.exports = router;
