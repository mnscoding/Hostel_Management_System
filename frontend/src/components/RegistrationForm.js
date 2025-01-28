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
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");

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
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      const res = await fetch("http://localhost:3000/api/register/register", {
        method: "POST",
        body: formData,
      });

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
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 0, paddingTop: "0px" }}>
      <Typography variant="h4" gutterBottom>
        Registration
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
          label="Gender"
          variant="outlined"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registering Year"
          variant="outlined"
          value={registeringYear}
          onChange={(e) => setRegisteringYear(e.target.value)}
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
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Parent's Contact No."
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
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
/*11.03
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
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");

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
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      const res = await fetch("http://localhost:3000/api/register/register", {
        method: "POST",
        body: formData,
      });

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
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 0, paddingTop: "0px" }}>
      <Typography variant="h4" gutterBottom>
        Registration
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
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
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
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No."
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        Paymentslip:
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
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");

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
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      const res = await fetch("http://localhost:3000/api/register/register", {
        method: "POST",
        body: formData,
      });

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
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Hostel Registration
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
          label="Registration No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
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
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
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
            <MenuItem value="Faculty of Medicine">Faculty of Medicine</MenuItem>
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
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No"
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
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
          label="Parent's Contact No"
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Slip:
          </Typography>
          <input type="file" onChange={handleFileChange} required />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;
