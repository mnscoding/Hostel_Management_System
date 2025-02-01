import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading, error, message } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
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
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "rgb(81, 1, 2)",
                marginTop: "16px",
                width: "100%",
              }}
            >
              Send Reset Link
            </Button>
            {error && (
              <Typography color="error" style={{ marginTop: "10px" }}>
                {error}
              </Typography>
            )}
            {message && (
              <Typography color="rgb(81,1,2)" style={{ marginTop: "10px" }}>
                {message}
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
