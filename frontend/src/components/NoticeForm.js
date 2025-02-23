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

/*2025
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

export default AddNoticeForm;*/
/*02.04
import React, { useEffect, useState } from "react";
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

const AddNoticeForm = ({ onSubmit, initialValues = {} }) => {
  const [date, setDate] = useState(initialValues.date || "");
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [hostel, setHostel] = useState(initialValues.hostel || "");
  const [hostels, setHostels] = useState([]); // State to store hostel names
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err?.message || "An unknown error occurred");
      }
    };

    fetchHostels();
    if (initialValues._id) {
      setDate(initialValues.date || "");
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setHostel(initialValues.hostel || "");
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!date || !title || !description || !hostel) {
      setError("All fields are required");
      return;
    }

    const notice = { date, title, description, hostel };
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
      setError(json.error || "An error occurred while saving the notice");
    } else {
      // Reset form fields after successful submission
      setDate("");
      setTitle("");
      setDescription("");
      setHostel(""); // Reset hostel selection
      setError(null);
      console.log("Notice saved", json);
      onSubmit(); // Refresh the notices list
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (hostels.length === 0) {
    return <Typography>Loading hostels...</Typography>;
  }

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
          <FormControl fullWidth margin="normal">
            <InputLabel>Hostel</InputLabel>
            <Select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              label="Hostel"
            >
              <MenuItem value="All">All Hostels</MenuItem>
              {hostels.map((hostel) => (
                <MenuItem key={hostel.name} value={hostel.name}>
                  {hostel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
      </CardContent>
    </Card>
  );
};

export default AddNoticeForm;*/

/*02.05
import React, { useEffect, useState } from "react";
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

const AddNoticeForm = ({ onSubmit, initialValues = {} }) => {
  const [date, setDate] = useState(initialValues.date || "");
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [hostel, setHostel] = useState(initialValues.hostel || "");
  const [hostels, setHostels] = useState([]); // State to store hostel names
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State to store file

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err?.message || "An unknown error occurred");
      }
    };

    fetchHostels();
    if (initialValues._id) {
      setDate(initialValues.date || "");
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setHostel(initialValues.hostel || "");
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!date || !title || !description || !hostel) {
      setError("All fields are required");
      return;
    }

    const notice = { date, title, description, hostel };

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("date", date);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hostel", hostel);

    if (file) {
      formData.append("file", file);
    }

    const method = initialValues._id ? "PATCH" : "POST";
    const url = initialValues._id
      ? `/api/notices/${initialValues._id}`
      : "/api/notices";

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "An error occurred while saving the notice");
      } else {
        // Reset form fields after successful submission
        setDate("");
        setTitle("");
        setDescription("");
        setHostel(""); // Reset hostel selection
        setFile(null); // Reset file input
        setError(null);
        console.log("Notice saved", json);
        onSubmit(); // Refresh the notices list
      }
    } catch (err) {
      setError("An error occurred while submitting the notice");
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (hostels.length === 0) {
    return <Typography>Loading hostels...</Typography>;
  }

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
          <FormControl fullWidth margin="normal">
            <InputLabel>Hostel</InputLabel>
            <Select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              label="Hostel"
            >
              <MenuItem value="All">All Hostels</MenuItem>
              {hostels.map((hostel) => (
                <MenuItem key={hostel.name} value={hostel.name}>
                  {hostel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          
          <TextField
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            fullWidth
            margin="normal"
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const AddNoticeForm = ({ onSubmit, initialValues = {} }) => {
  const [date, setDate] = useState(initialValues.date || "");
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [hostel, setHostel] = useState(initialValues.hostel || "");
  const [hostels, setHostels] = useState([]); // State to store hostel names
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State to store file

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err?.message || "An unknown error occurred");
      }
    };

    fetchHostels();
    if (initialValues._id) {
      setDate(initialValues.date || "");
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setHostel(initialValues.hostel || "");
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!date || !title || !description || !hostel) {
      setError("All fields are required");
      return;
    }

    const notice = { date, title, description, hostel };

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("date", date);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hostel", hostel);

    if (file) {
      formData.append("file", file);
    }

    const method = initialValues._id ? "PATCH" : "POST";
    const url = initialValues._id
      ? `/api/notices/${initialValues._id}`
      : "/api/notices";

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "An error occurred while saving the notice");
      } else {
        // Reset form fields after successful submission
        setDate("");
        setTitle("");
        setDescription("");
        setHostel(""); // Reset hostel selection
        setFile(null); // Reset file input
        setError(null);
        console.log("Notice saved", json);
        onSubmit(); // Refresh the notices list
      }
    } catch (err) {
      setError("An error occurred while submitting the notice");
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (hostels.length === 0) {
    return <Typography>Loading hostels...</Typography>;
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
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
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
                backgroundColor: "#f4f6f8",
              },
            }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Hostel</InputLabel>
            <Select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              label="Hostel"
              sx={{
                "& .MuiSelect-select": {
                  backgroundColor: "#f4f6f8",
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="All">All Hostels</MenuItem>
              {hostels.map((hostel) => (
                <MenuItem key={hostel.name} value={hostel.name}>
                  {hostel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
                backgroundColor: "#f4f6f8",
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
              "& .MuiInputBase-root": {
                borderRadius: 2,
                backgroundColor: "#f4f6f8",
              },
            }}
          />

          {/* File input field */}
          <TextField
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
                backgroundColor: "#f4f6f8",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="rgb(81,1,2)"
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNoticeForm;
