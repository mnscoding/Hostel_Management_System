/*import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AddNoticeForm = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notice = { date, title, description };

    const response = await fetch("/api/notices", {
      method: "POST",
      body: JSON.stringify(notice),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      // Check if response is OK
      setError(json.error);
    } else {
      setDate("");
      setTitle("");
      setDescription("");
      setError(null);
      console.log("New notice added", json);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Notice
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", // Active outline color set to black
                },
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label color when inactive
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black", // Label color when focused (active)
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input": {
                color: "black", // Input text color when focused (active)
              },
            }}
            required
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", // Active outline color set to black
                },
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label color when inactive
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black", // Label color when focused (active)
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input": {
                color: "black", // Input text color when focused (active)
              },
            }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", // Active outline color set to black
                },
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label color when inactive
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black", // Label color when focused (active)
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input": {
                color: "black", // Input text color when focused (active)
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgb(81, 1, 2)",
              "&:hover": {
                backgroundColor: "rgba(81, 1, 2, 0.9)", // Slightly lighter on hover
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

export default AddNoticeForm;*/
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AddNoticeForm = ({ onSubmit, initialValues = {} }) => {
  const [date, setDate] = useState(initialValues.date || "");
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    setDate(initialValues.date || "");
    setTitle(initialValues.title || "");
    setDescription(initialValues.description || "");
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notice = { date, title, description };
    const method = initialValues._id ? "PATCH" : "POST";
    const url = initialValues._id
      ? `/api/notices/${initialValues._id}`
      : "/api/notices";

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(notice),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setDate("");
      setTitle("");
      setDescription("");
      setError(null);
      console.log("Notice saved", json);
      onSubmit(); // Call the onSubmit function to refresh the notices
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {initialValues._id ? "Edit Notice" : "Add New Notice"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />
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

export default AddNoticeForm;
