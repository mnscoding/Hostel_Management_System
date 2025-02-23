/*11.03
import React, { useEffect, useState } from "react";
import StudentHostelDetails from "../components/StudentHostelDetails";
import { Grid, Snackbar, Button } from "@mui/material";
import TestUpload from "../components/RegistrationForm";

const StudentHostel = () => {
  const [hostels, setHostels] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const json = await response.json();

    if (response.ok) {
      setHostels(json);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const handleFormSubmitSuccess = () => {
    setSubmissionSuccess(true); // Show success message
    setShowForm(false); // Go back to hostel details
  };

  return (
    <div className="main-content">
      {!showForm ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyClick}
            sx={{ mb: 2 }}
          >
            Register
          </Button>
          <Grid container spacing={3}>
            {hostels &&
              hostels.map((hostel) => (
                <Grid item xs={12} sm={6} md={4} key={hostel._id}>
                  <StudentHostelDetails hostel={hostel} />
                </Grid>
              ))}
          </Grid>
        </>
      ) : (
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackClick}
            sx={{ mb: 2 }}
          >
            Back to Hostel Details
          </Button>
          <TestUpload onSuccess={handleFormSubmitSuccess} />{" "}
          
        </div>
      )}

      <Snackbar
        open={submissionSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Your Request Sent Successfully."
      />
    </div>
  );
};

export default StudentHostel;*/

/*02.11
import React, { useEffect, useState } from "react";
import StudentHostelDetails from "../components/StudentHostelDetails";
import {
  Grid,
  Snackbar,
  Button,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TestUpload from "../components/RegistrationForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentHostel = () => {
  const [hostels, setHostels] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [filteredHostels, setFilteredHostels] = useState(null);

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    filterHostels();
  }, [hostels, filter]);

  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const json = await response.json();
    if (response.ok) {
      setHostels(json);
      setFilteredHostels(json);
    }
  };

  const filterHostels = () => {
    if (filter === "All") {
      setFilteredHostels(hostels);
    } else {
      setFilteredHostels(hostels?.filter((hostel) => hostel.gender === filter));
    }
  };

  const handleCloseSnackbar = () => setSubmissionSuccess(false);
  const handleApplyClick = () => setShowForm(true);
  const handleBackClick = () => setShowForm(false);
  const handleFormSubmitSuccess = () => {
    setSubmissionSuccess(true);
    setShowForm(false);
  };

  return (
    <div className="main-content">
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!showForm && (
          <>
            <Button
              onClick={handleApplyClick}
              variant="contained"
              startIcon={<SendIcon />}
              sx={{
                margin: "0px",
                padding: "8px 16px", // Simple padding for better spacing
                fontSize: "1rem", // Standard font size
                fontWeight: "500", // Semi-bold for clarity without being too heavy
                backgroundColor: "rgb(81, 1, 2)", // Deep red background
                color: "white", // White text for good contrast
                borderRadius: "4px", // Slightly rounded corners
                textTransform: "none", // Preserve the button text's casing
                border: "none", // No border for a cleaner look
                "&:hover": {
                  backgroundColor: "rgb(81, 1, 2)", // Keep same color on hover for simplicity
                },
              }}
            >
              Register
            </Button>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 220 }}>
              <InputLabel sx={{ fontSize: "0.9rem" }}>
                Filter by Gender
              </InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter by Gender"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </div>

      {!showForm ? (
        <Grid container spacing={3}>
          {filteredHostels &&
            filteredHostels.map((hostel) => (
              <Grid item xs={12} sm={6} md={4} key={hostel._id}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {hostel.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Location: {hostel.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    {hostel.gender === "Male" ? (
                      <MaleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <FemaleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    Gender: {hostel.gender}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Warden: {hostel.warden}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      ) : (
        <div>
          <Button
            // You can change this to any color that fits your theme
            onClick={handleBackClick}
            variant="outlined"
            color="primary"
            sx={{
              mb: 0,
              border: "none",
              color: "rgb(81,1,2)", // Custom border color
              "&:hover": {
                borderColor: "rgb(81,1,2)", // Ensure border color stays the same on hover
                backgroundColor: "rgba(81,1,2, 0.1)", // Optional: add a subtle background color on hover
              },
            }}
          >
            Back to Hostel Details
          </Button>
          <TestUpload onSuccess={handleFormSubmitSuccess} />
        </div>
      )}

      <Snackbar
        open={submissionSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Your Request Sent Successfully."
      />
    </div>
  );
};

export default StudentHostel;*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import StudentHostelDetails from "../components/StudentHostelDetails";
import {
  Grid,
  Snackbar,
  Button,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TestUpload from "../components/RegistrationForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentHostel = () => {
  const [hostels, setHostels] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [filteredHostels, setFilteredHostels] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    filterHostels();
  }, [hostels, filter]);

  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const json = await response.json();
    if (response.ok) {
      setHostels(json);
      setFilteredHostels(json);
    }
  };

  const filterHostels = () => {
    if (filter === "All") {
      setFilteredHostels(hostels);
    } else {
      setFilteredHostels(hostels?.filter((hostel) => hostel.gender === filter));
    }
  };

  const handleCloseSnackbar = () => setSubmissionSuccess(false);
  const handleApplyClick = () => setShowForm(true);
  const handleBackClick = () => setShowForm(false);
  const handleFormSubmitSuccess = () => {
    setSubmissionSuccess(true);
    setShowForm(false);
  };

  const handleRequestTransferClick = () => {
    // Navigate to the "Request Transfer" page
    navigate("/studentrequests"); // Adjust the path based on your route
  };

  return (
    <div className="main-content">
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!showForm && (
          <>
            {/* Button Container */}
            <div style={{ display: "flex", gap: "10px", ml: 0 }}>
              {" "}
              {/* Add gap for space between buttons */}
              <Button
                onClick={handleApplyClick}
                variant="contained"
                startIcon={<SendIcon />}
                sx={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  backgroundColor: "rgb(81, 1, 2)", // Deep red
                  color: "white",
                  borderRadius: "4px",
                  textTransform: "none",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "rgb(81, 1, 2)", // Keep the same color on hover
                  },
                }}
              >
                Register
              </Button>
              {/* Request Transfer Button */}
              <Button
                onClick={handleRequestTransferClick} // Handle click
                variant="contained"
                sx={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  backgroundColor: "rgb(81, 1, 2)", // Blue color for this button
                  color: "white",
                  borderRadius: "4px",
                  textTransform: "none",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "rgb(81, 1, 2)", // Keep same color on hover
                  },
                }}
              >
                Request Transfer
              </Button>
            </div>

            {/* Filter by Gender */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 220 }}>
              <InputLabel sx={{ fontSize: "0.9rem" }}>
                Filter by Gender
              </InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter by Gender"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </div>

      {!showForm ? (
        <Grid container spacing={3}>
          {filteredHostels &&
            filteredHostels.map((hostel) => (
              <Grid item xs={12} sm={6} md={4} key={hostel._id}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {hostel.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Location: {hostel.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    {hostel.gender === "Male" ? (
                      <MaleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <FemaleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    Gender: {hostel.gender}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Warden: {hostel.warden}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      ) : (
        <div>
          <Button
            onClick={handleBackClick}
            variant="outlined"
            color="primary"
            sx={{
              mb: 0,
              border: "none",
              color: "rgb(81,1,2)",
              "&:hover": {
                borderColor: "rgb(81,1,2)",
                backgroundColor: "rgba(81,1,2, 0.1)",
              },
            }}
          >
            Back to Hostel Details
          </Button>
          <TestUpload onSuccess={handleFormSubmitSuccess} />
        </div>
      )}

      <Snackbar
        open={submissionSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Your Request Sent Successfully."
      />
    </div>
  );
};

export default StudentHostel;
