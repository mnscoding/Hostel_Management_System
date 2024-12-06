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

const StaffUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [hostel, setHostel] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
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
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("hostel", hostel);
    formData.append("position", position);
    formData.append("email", email);

    try {
      const res = await fetch("http://localhost:3000/api/staff/staff", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Staff ID: ${result._id}`);
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
        Add Staff Member
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
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
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
          label="Hostel"
          variant="outlined"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Position</InputLabel>
          <Select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <MenuItem value="Warden">Warden</MenuItem>
            <MenuItem value="Sub Warden">Sub Warden</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        Attach relevant document (e.g., ID, resume):
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

export default StaffUpload;
