import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const ApplyForm = ({ onSubmit }) => {
  // Accept onSubmit prop
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [distanceFromHome, setDistanceFromHome] = useState("");
  const [income, setIncome] = useState("");
  const [error, setError] = useState(null);
  const user_id = user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applyData = {
      name,
      regNo,
      email,
      year,
      faculty,
      department,
      contactNo,
      gender,
      distanceFromHome,
      income,
      user_id,
    };

    const response = await fetch("/api/apply", {
      method: "POST",
      body: JSON.stringify(applyData),
      headers: {
        "Content-Type": "application/json",
      },
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
      setGender("");
      setDistanceFromHome("");
      setIncome("");
      setError(null);
      console.log("New application submitted", json);

      // Call the onSubmit prop to notify the parent component
      onSubmit();
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Apply Now
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

          {/* Year Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>

          {/* Faculty Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Faculty</InputLabel>
            <Select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <MenuItem value="Faculty A">Faculty A</MenuItem>
              <MenuItem value="Faculty B">Faculty B</MenuItem>
              <MenuItem value="Faculty C">Faculty C</MenuItem>
            </Select>
          </FormControl>

          {/* Department Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Department</InputLabel>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="Department A">Department A</MenuItem>
              <MenuItem value="Department B">Department B</MenuItem>
              <MenuItem value="Department C">Department C</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Contact No"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          {/* Gender Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Distance from Home (in km)"
            type="number"
            value={distanceFromHome}
            onChange={(e) => setDistanceFromHome(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            fullWidth
            margin="normal"
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

export default ApplyForm;
