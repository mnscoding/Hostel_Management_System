import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AddHostelForm = ({ onSubmit, initialValues = {} }) => {
  const [name, setName] = useState(initialValues.name || "");
  const [location, setLocation] = useState(initialValues.location || "");
  const [gender, setGender] = useState(initialValues.gender || "");
  const [wardenPrefix, setWardenPrefix] = useState(
    initialValues.wardenPrefix || "Ms"
  );
  const [wardenName, setWardenName] = useState(initialValues.wardenName || "");
  const [roomCount, setRoomCount] = useState(initialValues.roomCount || "");
  const [maxStudents, setMaxStudents] = useState(
    initialValues.maxStudents || ""
  );
  const [existingStudents, setExistingStudents] = useState(
    initialValues.existingStudents || []
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(initialValues.name || "");
    setLocation(initialValues.location || "");
    setGender(initialValues.gender || "");
    setWardenPrefix(initialValues.wardenPrefix || "Ms");
    setWardenName(initialValues.wardenName || "");
    setRoomCount(initialValues.roomCount || "");
    setMaxStudents(initialValues.maxStudents || "");
    setExistingStudents(initialValues.existingStudents || []);
  }, [initialValues]);

  const handleExistingStudentChange = (index, field, value) => {
    const updatedStudents = [...existingStudents];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value,
    };
    setExistingStudents(updatedStudents);
  };

  const addExistingStudent = () => {
    setExistingStudents([
      ...existingStudents,
      { year: "", faculty: "", count: 0 },
    ]);
  };

  const removeExistingStudent = (index) => {
    const updatedStudents = existingStudents.filter((_, i) => i !== index);
    setExistingStudents(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hostel = {
      name,
      location,
      gender,
      warden: `${wardenPrefix} ${wardenName}`,
      roomCount,
      maxStudents,
      existingStudents: existingStudents.length ? existingStudents : [], // Ensure it's submitted as an empty array if no students
    };
    const method = initialValues._id ? "PATCH" : "POST";
    const url = initialValues._id
      ? `/api/hostels/${initialValues._id}`
      : "/api/hostels";

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(hostel),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // Reset form fields
      setName("");
      setLocation("");
      setGender("");
      setWardenPrefix("Ms");
      setWardenName("");
      setRoomCount("");
      setMaxStudents("");
      setExistingStudents([]);
      setError(null);
      console.log("Hostel saved", json);
      onSubmit();
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {initialValues._id ? "Edit Hostel" : "Add New Hostel"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Hostel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <Grid container spacing={2} alignItems="center" marginTop={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="Warden Prefix"
                value={wardenPrefix}
                onChange={(e) => setWardenPrefix(e.target.value)}
                fullWidth
              >
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Warden Name"
                value={wardenName}
                onChange={(e) => setWardenName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <TextField
            label="Room Count"
            type="number"
            value={roomCount}
            onChange={(e) => setRoomCount(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Max Students"
            type="number"
            value={maxStudents}
            onChange={(e) => setMaxStudents(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Typography variant="subtitle1" gutterBottom>
            Existing Students
          </Typography>
          {existingStudents.map((student, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Year"
                  value={student.year}
                  onChange={(e) =>
                    handleExistingStudentChange(index, "year", e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem value="1st Year">1st Year</MenuItem>
                  <MenuItem value="2nd Year">2nd Year</MenuItem>
                  <MenuItem value="3rd Year">3rd Year</MenuItem>
                  <MenuItem value="4th Year">4th Year</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Faculty"
                  value={student.faculty}
                  onChange={(e) =>
                    handleExistingStudentChange(
                      index,
                      "faculty",
                      e.target.value
                    )
                  }
                  fullWidth
                >
                  <MenuItem value="Faculty 1">Faculty 1</MenuItem>
                  <MenuItem value="Faculty 2">Faculty 2</MenuItem>
                  <MenuItem value="Faculty 3">Faculty 3</MenuItem>
                  <MenuItem value="Faculty 4">Faculty 4</MenuItem>
                  <MenuItem value="Faculty 5">Faculty 5</MenuItem>
                  <MenuItem value="Faculty 6">Faculty 6</MenuItem>
                  <MenuItem value="Faculty 7">Faculty 7</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Count"
                  type="number"
                  value={student.count}
                  onChange={(e) =>
                    handleExistingStudentChange(index, "count", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton onClick={() => removeExistingStudent(index)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            onClick={addExistingStudent}
            variant="outlined"
            startIcon={<AddIcon />}
            style={{ marginTop: "16px" }}
          >
            Add Existing Student
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgb(81, 1, 2)",
              "&:hover": { backgroundColor: "rgba(81, 1, 2, 0.9)" },
              marginTop: "16px",
            }}
          >
            Submit
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
      </CardContent>
    </Card>
  );
};

export default AddHostelForm;
