import React from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import HostelApplyForm from "../components/HostelApplyForm";
import { CssBaseline, Button } from "@mui/material";
import AdminUploads from "../components/AdminUploads";
import TestUpload from "../components/TestUpload";
import RegisterDetail from "../components/RegistrationDetail";

const Register = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="main-content">
      <Button onClick={handleBack}>BACK</Button>
      <div>
        <RegisterDetail />
      </div>
    </div>
  );
};

export default Register;
