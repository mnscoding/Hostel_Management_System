/*import React, { useState } from "react";
import StaffForm from "../components/StaffForm";
import StaffDetails from "../components/StaffDetail";
import { Button, Snackbar } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const Staff = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const {user} = useAuthContext()

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  const handleFormSubmitSuccess = () => {
    setSubmissionSuccess(true); // Show success message
    setIsFormVisible(false); // Go back to hostel details
  };

  const handleToggle = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="main-content" style={{ padding: "20px" }}>
      <Button onClick={handleToggle} sx={{ mb: 2 }}>
        {isFormVisible ? "Back to Staff" : "Add New"}
      </Button>

      {isFormVisible ? (
        <StaffForm onSuccess={handleFormSubmitSuccess} />
      ) : (
        <StaffDetails />
      )}

      <Snackbar
        open={submissionSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="New staff member added successfully."
      />
    </div>
  );
};

export default Staff;*/
/*11.03
import React, { useState } from "react";
import StaffForm from "../components/StaffForm";
import StaffDetails from "../components/StaffDetail";
import { Button, Snackbar } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const Staff = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const { user } = useAuthContext();

  const role = user?.category;

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  const handleFormSubmitSuccess = () => {
    setSubmissionSuccess(true); // Show success message
    setIsFormVisible(false); // Go back to staff details
  };

  const handleToggle = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="main-content" style={{ padding: "20px" }}>
      {role === "Admin" && (
        <Button onClick={handleToggle} sx={{ mb: 2 }}>
          {isFormVisible ? "Back to Staff" : "Add New"}
        </Button>
      )}

      {isFormVisible ? (
        <StaffForm onSuccess={handleFormSubmitSuccess} />
      ) : (
        <StaffDetails />
      )}

      <Snackbar
        open={submissionSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="New staff member added successfully."
      />
    </div>
  );
};

export default Staff;*/
import React, { useState } from "react";
import StaffForm from "../components/StaffForm";
import StaffDetail from "../components/StaffDetail";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuthContext } from "../hooks/useAuthContext";

const Staff = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const { user } = useAuthContext();

  const role = user?.category;

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  const handleFormSubmitSuccess = () => {
    setSubmissionSuccess(true);
    setIsFormVisible(false);
  };

  const handleToggle = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="main-content">
      <Box sx={{ padding: "20px", paddingTop: "0px" }}>
        {role === "Admin" && (
          <Button
            onClick={handleToggle}
            sx={{
              mb: 0,
              color: "white",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "grey", color: "black" },
              padding: "8px 16px",
              borderRadius: "8px",
            }}
            startIcon={isFormVisible ? <ArrowBackIcon /> : <AddIcon />}
          >
            {isFormVisible ? "Back to Staff" : "Add New"}
          </Button>
        )}

        {isFormVisible ? (
          <StaffForm onSuccess={handleFormSubmitSuccess} />
        ) : (
          <StaffDetail />
        )}

        <Snackbar
          open={submissionSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="New staff member added successfully."
        />
      </Box>
    </div>
  );
};

export default Staff;
