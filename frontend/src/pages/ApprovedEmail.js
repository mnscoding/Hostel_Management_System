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
      <Button onClick={handleBack} sx={{ mb: 0, pb: 0 }}>
        BACK
      </Button>
      <div>
        <ApprovedEmails />
      </div>
    </div>
  );
};

export default ApprovedEmail;
