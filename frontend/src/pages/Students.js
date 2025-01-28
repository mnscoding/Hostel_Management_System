import React from "react";
import { useNavigate } from "react-router-dom";
import StudentDetail from "../components/StudentDetail";
import { Button } from "@mui/material";

const Students = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="main-content">
      <Button sx={{ mt: 0 }} onClick={handleBack}>
        BACK
      </Button>
      <div>
        <StudentDetail />
      </div>
    </div>
  );
};

export default Students;
