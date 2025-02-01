import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // For displaying success/error messages
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Reset any previous messages before sending request

    try {
      const response = await fetch(
        "http://localhost:3000/api/forgot-password/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Check if the response status is OK (200)
      if (response.ok) {
        const data = await response.json();
        setMessage(
          data.message || "A password reset link has been sent to your email!"
        ); // Use the success message from backend
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.error || "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error during password reset request:", error); // Log any errors
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            marginBottom: "16px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: "rgb(81, 1, 2)",
            "&:hover": {
              backgroundColor: "rgba(81, 1, 2, 0.9)",
            },
            width: "100%",
          }}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      {message && (
        <Typography
          sx={{
            marginTop: "16px",
            color: message.includes("sent") ? "green" : "red",
          }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default ForgotPassword;
