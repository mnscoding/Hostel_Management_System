const User = require("../models/userModel");
const { sendMail } = require("../services/emailService"); // Assuming you can't change this
const crypto = require("crypto"); // for generating reset tokens

// Controller function to handle the forgot password request
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  console.log(`Received password reset request for email: ${email}`); // Debug log

  try {
    // Check if user exists with the given email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`); // Debug log
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token (you could use JWT or any other method)
    const resetToken = crypto.randomBytes(32).toString("hex");

    console.log(`Generated reset token for user: ${email}`); // Debug log

    // Save the token in the user model with expiration (e.g., 1 hour expiration)
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // expires in 1 hour

    await user.save();

    console.log(`Saved reset token for user: ${email}`); // Debug log

    // Send the reset email with the reset link
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`; // Frontend link
    const subject = "Password Reset Request";
    const message = `
      <p>Click the link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `;

    // Await the sendMail function to ensure email is sent before responding
    try {
      await sendMail(email, subject, message);
      console.log(`Password reset email sent to: ${email}`); // Debug log
    } catch (emailError) {
      console.error("Error sending reset password email:", emailError); // Log email error
      return res
        .status(500)
        .json({ error: "Failed to send password reset email." });
    }

    res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    console.error("Error processing forgot password:", error); // Log main controller error
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

module.exports = { forgotPassword };
