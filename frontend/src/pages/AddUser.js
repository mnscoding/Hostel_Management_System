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
      <Button onClick={handleBack} sx={{ mb: 0, pb: 0 }}>
        BACK
      </Button>
      <UserForm />
    </div>
  );
};

export default AddUser;
