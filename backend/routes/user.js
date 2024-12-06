const express = require("express");

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

module.exports = router;
