import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirming password
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(search).get("token"); // Extract the token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/user/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const result = await response.json();

    if (response.ok) {
      navigate("/login"); // Redirect to login page
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <Card style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              sx={{ marginTop: "16px" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgb(81, 1, 2)",
                marginTop: "16px",
                width: "100%",
              }}
            >
              Reset Password
            </Button>
            {error && (
              <Typography color="error" style={{ marginTop: "10px" }}>
                {error}
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
