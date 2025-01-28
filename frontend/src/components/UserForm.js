/*import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const ApprovedEmailForm = () => {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/approvedEmails", {
        email,
        category,
      });
      setSuccess("Approved email added successfully");
      setEmail("");
      setCategory("");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Approved Email
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "rgb(81, 1, 2)",
            "&:hover": { bgcolor: "rgb(61, 1, 1)" },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ApprovedEmailForm;*/

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const ApprovedEmailForm = () => {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/approvedEmails", {
        email,
        category,
      });
      setSuccess("Approved email added successfully");
      setEmail("");
      setCategory("");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="main-content">
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 8,
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add Approved Email
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            type="email" // Ensures the field only accepts a valid email format
            error={!!error} // Set error state if there's an issue with email format
            helperText={error && "Please enter a valid email address"} // Shows helper text if invalid
          />

          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "rgb(81, 1, 2)",
              "&:hover": { bgcolor: "rgb(61, 1, 1)" },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ApprovedEmailForm;
