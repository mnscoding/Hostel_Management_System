/*2025.02.01
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="main-content">
      <Card style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mb: 1, marginBottom: "20px", fontWeight: "bold" }}
          >
            Login
          </Typography>
          <form className="newLogin" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              margin="none" // No additional margin on top
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input": {
                  color: "black",
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input": {
                  color: "black",
                },
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
                marginTop: "16px",
                width: "100%",
              }}
            >
              Log in
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

export default Login;*/
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom"; // We'll use this for navigation
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to the Forgot Password page
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
            Login
          </Typography>
          <form className="newLogin" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              margin="none"
              required
            />
            <TextField
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              margin="normal"
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
              Log in
            </Button>
            {error && (
              <Typography color="error" style={{ marginTop: "10px" }}>
                {error}
              </Typography>
            )}
          </form>
          <Button
            onClick={handleForgotPassword}
            sx={{ textTransform: "none", marginTop: "16px", width: "100%" }}
          >
            Forgot Password?
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
