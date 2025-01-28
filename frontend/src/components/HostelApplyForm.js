/*import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const TestUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [distance, setDistance] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [income, setIncome] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);

    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("contactNo", contactNo);
    formData.append("distance", distance);
    formData.append("email", email);
    formData.append("year", year);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("income", income);

    try {
      const res = await fetch(
        "http://localhost:3000/api/hostelApply/hostelApply",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        setResponse("Upload successful! Test ID: ${result._id}");
      } else {
        setResponse("Error: ${result.error}");
      }
    } catch (error) {
      setResponse("Error: ${error.message}");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload a File
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reg. No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="District"
          variant="outlined"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No."
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Distance from home"
          variant="outlined"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Year"
          variant="outlined"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Faculty"
          variant="outlined"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Income"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;*/

//////2
/*import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [distance, setDistance] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [income, setIncome] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("contactNo", contactNo);
    formData.append("distance", distance);
    formData.append("email", email);
    formData.append("year", year);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("income", income);

    try {
      const res = await fetch(
        "http://localhost:3000/api/hostelApply/hostelApply",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Test ID: ${result._id}`);
        onSuccess(); // Call the success callback
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>
        Apply for Hostel
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reg. No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="District"
          variant="outlined"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No."
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Distance from home"
          variant="outlined"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Year"
          variant="outlined"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Faculty"
          variant="outlined"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Income"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "16px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "rgb(81, 1, 2)",
            "&:hover": { backgroundColor: "rgba(81, 1, 2, 0.9)" },
            marginTop: "16px",
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;*/

/*2025
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [distance, setDistance] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [income, setIncome] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("contactNo", contactNo);
    formData.append("distance", distance);
    formData.append("email", email);
    formData.append("year", year);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("income", income);

    try {
      const res = await fetch(
        "http://localhost:3000/api/hostelApply/hostelApply",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Test ID: ${result._id}`);
        onSuccess(); // Call the success callback
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Apply for Hostel
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reg. No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="District"
          variant="outlined"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No."
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Distance from home"
          variant="outlined"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty 1">Faculty 1</MenuItem>
            <MenuItem value="Faculty 2">Faculty 2</MenuItem>
            <MenuItem value="Faculty 3">Faculty 3</MenuItem>
            <MenuItem value="Faculty 4">Faculty 4</MenuItem>
            <MenuItem value="Faculty 5">Faculty 5</MenuItem>
            <MenuItem value="Faculty 6">Faculty 6</MenuItem>
            <MenuItem value="Faculty 7">Faculty 7</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth required sx={{ mb: 2 }}>
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
        <TextField
          fullWidth
          label="Income"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        Attach the income details PDF:
        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "16px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "rgb(81, 1, 2)",
            "&:hover": { backgroundColor: "rgba(81, 1, 2, 0.9)" },
            marginTop: "16px",
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;*/

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
} from "@mui/material";

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [distance, setDistance] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [income, setIncome] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("contactNo", contactNo);
    formData.append("distance", distance);
    formData.append("email", email);
    formData.append("year", year);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("income", income);

    try {
      const res = await fetch(
        "http://localhost:3000/api/hostelApply/hostelApply",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Test ID: ${result._id}`);
        onSuccess(); // Call the success callback
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: "auto",
        mt: 0,
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "#2c3e50",
        }}
      >
        Apply for Hostel
      </Typography>
      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reg. No"
                variant="outlined"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                variant="outlined"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact No."
                variant="outlined"
                value={contactNo}
                onChange={(e) => {
                  // Remove non-numeric characters
                  const newValue = e.target.value.replace(/[^0-9]/g, "");

                  // Allow only 10 digits
                  if (newValue.length <= 10) {
                    setContactNo(newValue);
                  }
                }}
                required
                error={contactNo.length !== 10 && contactNo !== ""}
                helperText={
                  contactNo.length !== 10 && contactNo !== ""
                    ? "Contact number must be exactly 10 digits."
                    : ""
                }
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Distance from home (in km)"
                variant="outlined"
                value={distance}
                onChange={(e) =>
                  setDistance(e.target.value.replace(/[^0-9]/g, ""))
                } // Only allows numbers
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary", paddingRight: "8px" }}
                    >
                      km
                    </Typography>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email" // Enforces the email format validation
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                helperText={
                  email &&
                  !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                    email
                  )
                    ? "Please enter a valid email"
                    : ""
                }
                error={
                  email &&
                  !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                    email
                  )
                } // Show error if invalid
              />
            </Grid>

            {/* Year Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Year</InputLabel>
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                  <MenuItem value="1">1st Year</MenuItem>
                  <MenuItem value="2">2nd Year</MenuItem>
                  <MenuItem value="3">3rd Year</MenuItem>
                  <MenuItem value="4">4th Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Faculty Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Faculty</InputLabel>
                <Select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
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
            {/* Department Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Income (in LKR)"
                variant="outlined"
                value={income}
                onChange={(e) =>
                  setIncome(e.target.value.replace(/[^0-9.]/g, ""))
                } // Only allows numbers and a decimal point
                required
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary", paddingRight: "8px" }}
                    >
                      LKR
                    </Typography>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              padding: "12px 0",
              backgroundColor: "rgb(81, 1, 2)",
              "&:hover": {
                backgroundColor: "rgba(81, 1, 2, 0.9)",
              },
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload"
            )}
          </Button>
        </form>
      </Paper>
      {response && (
        <Typography
          variant="body1"
          sx={{
            mt: 3,
            textAlign: "center",
            fontSize: "1rem",
            color: "#e74c3c",
          }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;
