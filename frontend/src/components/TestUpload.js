import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const TestUpload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
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
    formData.append("filename", filename);
    formData.append("name", name);

    try {
      const res = await fetch("http://localhost:3000/api/test/test", {
        method: "POST",
        body: formData,
      });

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
          label="File Name"
          variant="outlined"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
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

export default TestUpload;
