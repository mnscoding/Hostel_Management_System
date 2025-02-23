/*02.12
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

const StudentRequestForm = () => {
  const [date, setDate] = useState(""); // New state for the date field
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [currentHostel, setCurrentHostel] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Add your form submission logic here (e.g., validate and send to backend)

    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 0,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Transfer Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        
        <TextField
          fullWidth
          label="Date"
          variant="outlined"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true, // Ensures the label is always above the input field
          }}
        />

        
        <TextField
          fullWidth
          label="Registration No."
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

       
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        
        <TextField
          fullWidth
          label="Current Hostel"
          variant="outlined"
          value={currentHostel}
          onChange={(e) => setCurrentHostel(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        
        <TextField
          fullWidth
          label="Reason for Transfer"
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="rgb(81,1,2)"
          fullWidth
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRequestForm;*/

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const StudentRequestForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [currentHostel, setCurrentHostel] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hostels, setHostels] = useState([]);
  const [user_id] = useState(user.email);

  // Fetch hostels when the component mounts
  useEffect(() => {
    const fetchHostels = async () => {
      const response = await fetch("/api/hostels");
      const data = await response.json();
      if (response.ok) {
        setHostels(data);
      } else {
        console.error("Failed to fetch hostels");
      }
    };
    fetchHostels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const studentRequestData = {
      date,
      regNo,
      name,
      currentHostel,
      reason,
      user_id,
    };

    try {
      const response = await fetch("/api/studentrequests", {
        method: "POST",
        body: JSON.stringify(studentRequestData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear the form fields after successful submission
        setDate("");
        setRegNo("");
        setName("");
        setCurrentHostel("");
        setReason("");

        // Set success message for Snackbar
        setSuccessMessage("Request submitted successfully!");

        // Show Snackbar with success message
        setOpenSnackbar(true);

        // Delay navigation to the hostels page
        setTimeout(() => {
          navigate("/hostels");
        }, 2000); // Wait 2 seconds to allow the Snackbar to show before navigating
      } else {
        const json = await response.json();
        setErrorMessage(json.error || "Failed to submit request");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting your request.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 0,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Transfer Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Date Field */}
        <TextField
          fullWidth
          label="Date"
          variant="outlined"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Registration No. Field */}
        <TextField
          fullWidth
          label="Registration No."
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Hostel Field */}
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Current Hostel</InputLabel>
          <Select
            value={currentHostel}
            onChange={(e) => setCurrentHostel(e.target.value)}
            label="Current Hostel"
            sx={{
              "& .MuiSelect-select": {
                backgroundColor: "#f4f6f8",
              },
            }}
          >
            {hostels.map((hostel) => (
              <MenuItem key={hostel.name} value={hostel.name}>
                {hostel.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Reason for Transfer Field */}
        <TextField
          fullWidth
          label="Reason for Transfer"
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="rgb(81,1,2)"
          fullWidth
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage || successMessage || "Request submitted successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRequestForm;
