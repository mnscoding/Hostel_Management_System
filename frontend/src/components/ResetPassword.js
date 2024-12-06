import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useSendResetLink } from "../hooks/useSendResetLink"; // Custom hook to handle sending reset email

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { sendResetLink, isLoading, error } = useSendResetLink();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendResetLink(email);
  };

  return (
    <div className="main-content">
      <Card style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ marginTop: "16px", width: "100%" }}
            >
              Send Reset Link
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
