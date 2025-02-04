/*02.04
import React from "react";
import UserDetails from "../components/UserDetails";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const User = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="main-content">
      <Button onClick={handleBack} sx={{ mb: 0, pb: 0 }}>
        BACK
      </Button>
      <div>
        <UserDetails />
      </div>
    </div>
  );
};

export default User;*/

import React from "react";
import UserDetails from "../components/UserDetails";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";

const User = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleAddUser = () => navigate("/adduser");

  const handleViewAllApprovedEmails = () => navigate("/approvedEmails");

  return (
    <div className="main-content">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Ensure content starts from top
          minHeight: "100vh",
          bgcolor: "#f4f4f4", // Light grey background for a fresh look
          padding: 5,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 3,
            boxShadow: 4,
            bgcolor: "white",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Ensure proper alignment within the card
            height: "auto", // Allow card height to adjust based on content
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: "rgb(81,1,2)", // Soft Navy Blue for the heading
                textAlign: "center",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              User Dashboard
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 4,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {/* Buttons */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{
                  width: "calc(33% - 8px)",
                  textTransform: "none",
                  borderRadius: 2,
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "10px 20px",
                  bgcolor: "#2980B9", // Soft Navy Blue button color
                  color: "#fff",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#002244", // Darker Navy Blue on hover
                  },
                }}
              >
                BACK
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleViewAllApprovedEmails}
                sx={{
                  width: "calc(33% - 8px)",
                  textTransform: "none",
                  borderRadius: 2,
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "10px 20px",
                  bgcolor: "#66b3b3", // Fresh Mint Green button color
                  color: "#fff",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#4d8f8f", // Darker Mint Green on hover
                  },
                }}
              >
                View Approved Emails
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddUser}
                sx={{
                  width: "calc(33% - 8px)",
                  textTransform: "none",
                  borderRadius: 2,
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "10px 20px",
                  bgcolor: "#f1c27d", // Soft Gold accent color
                  color: "#fff",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#e0b175", // Darker Gold on hover
                  },
                }}
              >
                Add User
              </Button>
            </Box>

            {/* Divider for a cleaner separation */}
            <Divider sx={{ mb: 4 }} />

            {/* Adjust the layout when user details are shown */}
            <Box sx={{ textAlign: "center" }}>
              <UserDetails />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default User;
