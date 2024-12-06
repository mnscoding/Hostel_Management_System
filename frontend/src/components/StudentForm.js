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

const AddStudentForm = ({ updateStudentCount }) => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [hostel, setHostel] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = {
      name,
      regNo,
      email,
      year,
      faculty,
      department,
      hostel,
      contactNo,
      parentNo,
    };

    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      updateStudentCount(json.newCount);
      // Clear form fields
      setName("");
      setRegNo("");
      setEmail("");
      setYear("");
      setFaculty("");
      setDepartment("");
      setHostel("");
      setContactNo("");
      setParentNo("");
      setError(null);
      console.log("New student added", json);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Student
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
              <MenuItem value="1">1st Year</MenuItem>
              <MenuItem value="2">2nd Year</MenuItem>
              <MenuItem value="3">3rd Year</MenuItem>
              <MenuItem value="4">4th Year</MenuItem>
            </Select>
          </FormControl>

          {/* Faculty Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Faculty</InputLabel>
            <Select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <MenuItem value="Faculty 1">Faculty 1</MenuItem>
              <MenuItem value="Faculty 2">Faculty 2</MenuItem>
              <MenuItem value="Faculty 3">Faculty 3</MenuItem>
              <MenuItem value="Faculty 4">Faculty 4</MenuItem>
              <MenuItem value="Faculty 5">Faculty 5</MenuItem>
              <MenuItem value="Faculty 6">Faculty 6</MenuItem>
              <MenuItem value="Faculty 7">Faculty 7</MenuItem>
            </Select>
          </FormControl>

          {/* Department Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Department</InputLabel>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="Department 1">Department 1</MenuItem>
              <MenuItem value="Department 2">Department 2</MenuItem>
              <MenuItem value="Department 3">Department 3</MenuItem>
              <MenuItem value="Department 4">Department 4</MenuItem>
              <MenuItem value="Department 5">Department 5</MenuItem>
            </Select>
          </FormControl>

          {/* Hostel Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Hostel</InputLabel>
            <Select value={hostel} onChange={(e) => setHostel(e.target.value)}>
              <MenuItem value="Hostel A">Hostel A</MenuItem>
              <MenuItem value="Hostel B">Hostel B</MenuItem>
              <MenuItem value="Hostel C">Hostel C</MenuItem>
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
          <TextField
            label="Parent's Contact No"
            value={parentNo}
            onChange={(e) => setParentNo(e.target.value)}
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

export default AddStudentForm;
