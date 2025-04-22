/*import React, { useEffect, useState } from "react";
import StudentHostelDetails from "../components/StudentHostelDetails";
import { Button, Grid, Snackbar } from "@mui/material";
import ApplyForm from "../components/ApplyForm";
import { useAuthContext } from "../hooks/useAuthContext";
import ApplyDetails from "../components/ApplyDetails";

const StudentHostel = () => {
  const [hostels, setHostels] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false); // State to show/hide ApplyForm or ApplyDetails
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State to manage submission success message
  const [userApplicationExists, setUserApplicationExists] = useState(false); // State to track if user has applied
  const [userApplication, setUserApplication] = useState(null); // Store the user's application details

  const { user } = useAuthContext(); // Destructure user from the context

  useEffect(() => {
    fetchHostels();
    if (user?.email) {
      checkUserApplication(); // Check if user has already applied
    }
  }, [user]);

  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const json = await response.json();

    if (response.ok) {
      setHostels(json);
    }
  };

  const checkUserApplication = async () => {
    try {
      const response = await fetch("/api/apply"); // Fetch all applications
      const applications = await response.json();

      if (response.ok) {
        // Check if any application exists with user_id matching user.email
        const userApp = applications.find((app) => app.user_id === user.email);
        if (userApp) {
          setUserApplicationExists(true);
          setUserApplication(userApp); // Store the user's application details
        }
      }
    } catch (error) {
      console.error("Error checking user application:", error);
    }
  };

  const handleApplyClick = () => {
    setShowApplyForm((prev) => !prev); // Toggle between showing form or details
  };

  const handleFormSubmit = async () => {
    // Assuming the form submits the application successfully
    setSubmissionSuccess(true); // Show success message
    setShowApplyForm(false); // Hide apply form after submission

    // Check if the user has now applied and update the state
    await checkUserApplication(); // This will re-check the user's application status after submission
  };

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false); // Close the success message
  };

  return (
    <div className="main-content">
      {userApplicationExists ? (
        <Button onClick={handleApplyClick}>
          {showApplyForm ? "Back" : "Check Your Application"}
        </Button>
      ) : (
        <Button onClick={handleApplyClick}>
          {showApplyForm ? "Back" : "Apply"}
        </Button>
      )}

      {showApplyForm ? (
        userApplicationExists ? ( // If application exists, show ApplyDetails
          <ApplyDetails application={userApplication} />
        ) : (
          <ApplyForm onSubmit={handleFormSubmit} /> // Else show ApplyForm
        )
      ) : (
        <Grid container spacing={3}>
          {hostels &&
            hostels.map((hostel) => (
              <Grid item xs={12} sm={6} md={4} key={hostel._id}>
                <StudentHostelDetails hostel={hostel} />
              </Grid>
            ))}
        </Grid>
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

/*11.03
import React, { useEffect, useState } from "react";
import StudentHostelDetails from "../components/StudentHostelDetails";
import { Grid, Snackbar, Button } from "@mui/material";
import TestUpload from "../components/HostelApplyForm";
import { useAuthContext } from "../hooks/useAuthContext";

const StudentHostel = () => {
  const [hostels, setHostels] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuthContext();

  const role = user?.category;

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
          {role !== "Staff" && (
            <Button onClick={handleApplyClick} sx={{ mb: 2 }}>
              Apply
            </Button>
          )}
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
          <Button onClick={handleBackClick} sx={{ margin: "0px" }}>
            Back to Hostel Details
          </Button>
          <TestUpload onSuccess={handleFormSubmitSuccess} />{" "}
          }
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
*/

import React, { useEffect, useState } from "react";
import {
  Grid,
  Snackbar,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAuthContext } from "../hooks/useAuthContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TestUpload from "../components/HostelApplyForm";
import { color } from "@mui/system";
import { motion } from "framer-motion";

const StudentHostel = () => {
  const [hostels, setHostels] = useState(null);
  const [filteredHostels, setFilteredHostels] = useState(null);
  const [filter, setFilter] = useState("All");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthContext();

  const role = user?.category;

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
          padding: "0px",
          paddingTop: "0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!showForm && (
          <>
            {role !== "Staff" && (
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
                Apply for Hostel
              </Button>
            )}
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 220,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "2px", // Make the outline bolder
                    borderColor: "rgb(81, 1, 2)", // Deep red color for the outline
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(81, 1, 2)", // Outline color when hovered
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(81, 1, 2)", // Focused outline color
                    borderWidth: "2px", // Ensures the border stays bold when focused
                  },
                },
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "0.9rem",
                  color: "rgb(81, 1, 2)",
                  fontWeight: "bold",
                }}
              >
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
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
                </motion.div>
              </Grid>
            ))}
        </Grid>
      ) : (
        <div>
          <Button
            onClick={handleBackClick}
            sx={{
              margin: "0px",
              padding: "4px 16px", // Simple padding for better spacing
              fontSize: "1rem", // Standard font size
              fontWeight: "500", // Semi-bold for clarity without being too heavy
              backgroundColor: "white", // Deep red background
              color: "rgb(81, 1, 2)", // White text for good contrast
              borderRadius: "10px", // Slightly rounded corners
              textTransform: "none", // Preserve the button text's casing
              border: "none", // No border for a cleaner look
              "&:hover": {
                backgroundColor: "grey", // Keep same color on hover for simplicity
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
