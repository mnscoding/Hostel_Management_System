import React from "react";
import ApprovedEmails from "../components/ApprovedEmails";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ApprovedEmail = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <div className="main-content">
      <Button
        onClick={handleBack}
        variant="outlined"
        color="primary"
        sx={{
          mb: 3,
          border: "none",
          color: "rgb(81,1,2)", // Custom border color
          "&:hover": {
            borderColor: "rgb(81,1,2)", // Ensure border color stays the same on hover
            backgroundColor: "rgba(81,1,2, 0.1)", // Optional: add a subtle background color on hover
          },
        }}
      >
        BACK
      </Button>
      <div>
        <ApprovedEmails />
      </div>
    </div>
  );
};

export default ApprovedEmail;
