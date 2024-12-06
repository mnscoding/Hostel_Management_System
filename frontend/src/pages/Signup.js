import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio, // Import Radio here
} from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [category, setCategory] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }
    await signup(email, password);
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
            Sign up
          </Typography>
          <form className="newsignup" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
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
              required
              sx={{
                marginTop: "16px",
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
              label="Confirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              fullWidth
              required
              sx={{
                marginTop: "16px",
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
              {isLoading ? <CircularProgress size={24} /> : "Signup"}
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

export default Signup;
