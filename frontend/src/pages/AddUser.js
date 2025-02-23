import React from "react";
import UserForm from "../components/UserForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
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
      <UserForm />
    </div>
  );
};

export default AddUser;
