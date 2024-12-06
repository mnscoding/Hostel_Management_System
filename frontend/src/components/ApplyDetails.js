/*import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ApplyDetails = ({ application }) => {
  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Application Details
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {application.name}
        </Typography>
        <Typography variant="body1">
          <strong>Registration No:</strong> {application.regNo}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {application.email}
        </Typography>
        <Typography variant="body1">
          <strong>Year:</strong> {application.year}
        </Typography>
        <Typography variant="body1">
          <strong>Faculty:</strong> {application.faculty}
        </Typography>
        <Typography variant="body1">
          <strong>Department:</strong> {application.department}
        </Typography>
        <Typography variant="body1">
          <strong>Contact No:</strong> {application.contactNo}
        </Typography>
        <Typography variant="body1">
          <strong>Gender:</strong> {application.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Distance from Home:</strong> {application.distanceFromHome} km
        </Typography>
        <Typography variant="body1">
          <strong>Income:</strong> Rs.{application.income}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {application.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ApplyDetails;*/
import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Snackbar } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext"; // Assuming this hook provides the user info

const ApplyDetails = ({ application }) => {
  const [status, setStatus] = useState(application.status); // Track the application status
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const { user } = useAuthContext(); // Get the current logged-in user

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`/api/apply/${application._id}`, {
        method: "PATCH", // Assuming you're using PATCH to update the status
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status in the request body
      });

      if (response.ok) {
        setStatus(newStatus); // Update the status in the UI
        setSuccessMessage(`Request ${newStatus.toLowerCase()}`); // Show message without 'successfully'
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAccept = () => {
    updateStatus("Accepted"); // Call updateStatus with "Accepted"
  };

  const handleReject = () => {
    updateStatus("Rejected"); // Call updateStatus with "Rejected"
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(""); // Close the message
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Application Details
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {application.name}
        </Typography>
        <Typography variant="body1">
          <strong>Registration No:</strong> {application.regNo}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {application.email}
        </Typography>
        <Typography variant="body1">
          <strong>Year:</strong> {application.year}
        </Typography>
        <Typography variant="body1">
          <strong>Faculty:</strong> {application.faculty}
        </Typography>
        <Typography variant="body1">
          <strong>Department:</strong> {application.department}
        </Typography>
        <Typography variant="body1">
          <strong>Contact No:</strong> {application.contactNo}
        </Typography>
        <Typography variant="body1">
          <strong>Gender:</strong> {application.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Distance from Home:</strong> {application.distanceFromHome} km
        </Typography>
        <Typography variant="body1">
          <strong>Income:</strong> Rs.{application.income}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {status} {/* Display the updated status */}
        </Typography>

        {/* Accept and Reject Buttons - Only show if user is an Admin */}
        {user?.category === "Admin" && (
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAccept}
              style={{ marginRight: "10px" }}
              disabled={status === "Accepted"} // Disable if status is Rejected
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReject}
              disabled={status === "Rejected"} // Disable if status is Accepted
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>

      {/* Snackbar for messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </Card>
  );
};

export default ApplyDetails;
