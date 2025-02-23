import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StudentRequestForm from "../components/StudentRequestForm";

const StudentRequest = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/hostels");
  };
  return (
    <div className="main-content">
      <Button
        onClick={handleBack}
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
        BACK
      </Button>
      <StudentRequestForm />
    </div>
  );
};

export default StudentRequest;
