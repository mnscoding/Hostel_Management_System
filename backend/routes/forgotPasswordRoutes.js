const express = require("express");
const router = express.Router();
const { forgotPassword } = require("../controllers/forgotPasswordController");

router.post("/forgot-password", forgotPassword); // Add the forgot password route

module.exports = router;
