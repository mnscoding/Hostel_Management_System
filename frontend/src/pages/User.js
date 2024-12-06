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
      <Button onClick={handleBack}>BACK</Button>
      <div>
        <UserDetails />
      </div>
    </div>
  );
};

export default User;
