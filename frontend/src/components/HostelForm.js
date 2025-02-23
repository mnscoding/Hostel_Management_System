/*02.05
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

export default AddHostelForm;*/

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Divider,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
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
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    setLoading(true);
    setError(null);
    setOpenSnackbar(false);

    const hostel = {
      name,
      location,
      gender,
      warden: `${wardenPrefix} ${wardenName}`,
      roomCount,
      maxStudents,
      existingStudents: existingStudents.length ? existingStudents : [],
    };
    const method = initialValues._id ? "PATCH" : "POST";
    const url = initialValues._id
      ? `/api/hostels/${initialValues._id}`
      : "/api/hostels";

    try {
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
        setOpenSnackbar(true);
      } else {
        setName("");
        setLocation("");
        setGender("");
        setWardenPrefix("");
        setWardenName("");
        setRoomCount("");
        setMaxStudents("");
        setExistingStudents([]);
        setError(null);
        onSubmit();
      }
    } catch (error) {
      setError(error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        {initialValues._id ? "Edit Hostel" : "Add New Hostel"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Hostel Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Warden Prefix</InputLabel>
              <Select
                value={wardenPrefix}
                onChange={(e) => setWardenPrefix(e.target.value)}
              >
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Warden Name"
              variant="outlined"
              value={wardenName}
              onChange={(e) => setWardenName(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Room Count"
          variant="outlined"
          type="number"
          value={roomCount}
          onChange={(e) => setRoomCount(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Max Students"
          variant="outlined"
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1" gutterBottom>
          Existing Students
        </Typography>
        {existingStudents.map((student, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={student.year}
                  onChange={(e) =>
                    handleExistingStudentChange(index, "year", e.target.value)
                  }
                >
                  <MenuItem value="1st Year">1st Year</MenuItem>
                  <MenuItem value="2nd Year">2nd Year</MenuItem>
                  <MenuItem value="3rd Year">3rd Year</MenuItem>
                  <MenuItem value="4th Year">4th Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Faculty</InputLabel>
                <Select
                  value={student.faculty}
                  onChange={(e) =>
                    handleExistingStudentChange(
                      index,
                      "faculty",
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="Faculty of Applied Sciences">
                    Faculty of Applied Sciences
                  </MenuItem>
                  <MenuItem value="Faculty of Computing">
                    Faculty of Computing
                  </MenuItem>
                  <MenuItem value="Faculty of Agricultural Sciences">
                    Faculty of Agricultural Sciences
                  </MenuItem>
                  <MenuItem value="Faculty of Geomatics">
                    Faculty of Geomatics
                  </MenuItem>
                  <MenuItem value="Faculty of Management Studies">
                    Faculty of Management Studies
                  </MenuItem>
                  <MenuItem value="Faculty of Social Sciences and Languages">
                    Faculty of Social Sciences and Languages
                  </MenuItem>
                  <MenuItem value="Faculty of Technology">
                    Faculty of Technology
                  </MenuItem>
                  <MenuItem value="Faculty of Medicine">
                    Faculty of Medicine
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Count"
                variant="outlined"
                type="number"
                value={student.count}
                onChange={(e) =>
                  handleExistingStudentChange(index, "count", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => removeExistingStudent(index)}>
                <RemoveIcon sx={{ color: "rgb(81, 1, 2)" }} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          onClick={addExistingStudent}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            mb: 2,
            borderColor: "rgb(81, 1, 2)",
            color: "rgb(81, 1, 2)",
            "&:hover": { borderColor: "rgba(81, 1, 2, 0.7)" },
          }}
        >
          Add Existing Student
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "rgb(81, 1, 2)",
            "&:hover": { backgroundColor: "rgba(81, 1, 2, 0.9)" },
            mb: 2,
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddHostelForm;
