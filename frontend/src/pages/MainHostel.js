import React, { useEffect, useState } from "react";
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

export default StudentHostel;
