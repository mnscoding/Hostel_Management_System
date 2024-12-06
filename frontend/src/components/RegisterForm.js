import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const RegisterForm = ({ onSubmit }) => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [error, setError] = useState(null);

  const user_id = user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("email", email);
    formData.append("year", year);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("contactNo", contactNo);
    formData.append("parentNo", parentNo);
    formData.append("paymentSlip", paymentSlip);

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // Clear form fields
      setName("");
      setRegNo("");
      setEmail("");
      setYear("");
      setFaculty("");
      setDepartment("");
      setContactNo("");
      setParentNo("");
      setPaymentSlip(null);
      setError(null);
      console.log("New registration submitted", json);

      // Call the onSubmit prop to notify the parent component
      onSubmit();
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Register Now
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Registration No"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contact No"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Parent No"
            value={parentNo}
            onChange={(e) => setParentNo(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setPaymentSlip(e.target.files[0])}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgb(81, 1, 2)",
              "&:hover": {
                backgroundColor: "rgba(81, 1, 2, 0.9)",
              },
              marginTop: "16px",
            }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
