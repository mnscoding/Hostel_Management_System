/*import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const ComplaintForm = () => {
  const { user } = useAuthContext();

  const [date, setDate] = useState("");
  const [hostel, setHostel] = useState("");
  const [description, setDescription] = useState("");
  const user_id = user.email;
  //const [submittedMessage, setSubmittedMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaint = { date, hostel, description, user_id };

    const response = await fetch("/api/complaints", {
      method: "POST",
      body: JSON.stringify(complaint),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setDate("");
      setHostel("");
      setDescription("");

      //setSubmittedMessage("Your Complaint Submitted");

      // Refresh the page after successful submission
      window.location.reload();
    } else {
      console.error("Failed to submit complaint:", json.error);
      //setSubmittedMessage(""); // Clear message on error
    }
  };

  //const handleAnotherComplaint = () => {
  // setSubmittedMessage(""); // Clear the submitted message
  // };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add a Complaint
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
            required
          />
          <TextField
            label="Hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
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

export default ComplaintForm;*/

/*2025
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const ComplaintForm = ({ complaint, onSubmit }) => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(
    complaint ? complaint.date.split("T")[0] : ""
  ); // Format date for input
  const [hostel, setHostel] = useState(complaint ? complaint.hostel : "");
  const [description, setDescription] = useState(
    complaint ? complaint.description : ""
  );
  const user_id = user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintData = { date, hostel, description, user_id };
    const method = complaint ? "PATCH" : "POST";
    const url = complaint
      ? `/api/complaints/${complaint._id}`
      : "/api/complaints";

    const response = await fetch(url, {
      method,
      body: JSON.stringify(complaintData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      onSubmit(); // Call the parent onSubmit method
    } else {
      const json = await response.json();
      console.error("Failed to submit complaint:", json.error);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {complaint ? "Edit Complaint" : "Add a Complaint"}
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
            label="Hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
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
              "&:hover": {
                backgroundColor: "rgba(81, 1, 2, 0.9)",
              },
              marginTop: "16px",
            }}
          >
            {complaint ? "Update" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;*/

/*02.05 form design updated
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const ComplaintForm = ({ complaint, onSubmit }) => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(
    complaint ? complaint.date.split("T")[0] : ""
  );
  const [hostel, setHostel] = useState(complaint ? complaint.hostel : "");
  const [description, setDescription] = useState(
    complaint ? complaint.description : ""
  );
  const [hostels, setHostels] = useState([]); // State to store list of hostels
  const user_id = user.email;

  // Fetch hostels when the component mounts
  useEffect(() => {
    const fetchHostels = async () => {
      const response = await fetch("/api/hostels"); // Assuming you have an endpoint that returns a list of hostels
      const data = await response.json();
      if (response.ok) {
        setHostels(data); // Assuming the data is an array of hostel names
      } else {
        console.error("Failed to fetch hostels");
      }
    };
    fetchHostels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintData = { date, hostel, description, user_id };
    const method = complaint ? "PATCH" : "POST";
    const url = complaint
      ? `/api/complaints/${complaint._id}`
      : "/api/complaints";

    const response = await fetch(url, {
      method,
      body: JSON.stringify(complaintData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      onSubmit(); // Call the parent onSubmit method
    } else {
      const json = await response.json();
      console.error("Failed to submit complaint:", json.error);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {complaint ? "Edit Complaint" : "Add a Complaint"}
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

          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Hostel</InputLabel>
            <Select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              label="Hostel"
            >
              {hostels.map((hostel) => (
                <MenuItem key={hostel.name} value={hostel.name}>
                  {hostel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
              "&:hover": {
                backgroundColor: "rgba(81, 1, 2, 0.9)",
              },
              marginTop: "16px",
            }}
          >
            {complaint ? "Update" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;*/

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const ComplaintForm = ({ complaint, onSubmit }) => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(
    complaint ? complaint.date.split("T")[0] : ""
  );
  const [hostel, setHostel] = useState(complaint ? complaint.hostel : "");
  const [description, setDescription] = useState(
    complaint ? complaint.description : ""
  );
  const [hostels, setHostels] = useState([]); // State to store list of hostels
  const user_id = user.email;

  // Fetch hostels when the component mounts
  useEffect(() => {
    const fetchHostels = async () => {
      const response = await fetch("/api/hostels"); // Assuming you have an endpoint that returns a list of hostels
      const data = await response.json();
      if (response.ok) {
        setHostels(data); // Assuming the data is an array of hostel names
      } else {
        console.error("Failed to fetch hostels");
      }
    };
    fetchHostels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintData = { date, hostel, description, user_id };
    const method = complaint ? "PATCH" : "POST";
    const url = complaint
      ? `/api/complaints/${complaint._id}`
      : "/api/complaints";

    const response = await fetch(url, {
      method,
      body: JSON.stringify(complaintData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      onSubmit(); // Call the parent onSubmit method
    } else {
      const json = await response.json();
      console.error("Failed to submit complaint:", json.error);
    }
  };

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
          {complaint ? "Edit Complaint" : "Add a Complaint"}
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
                  borderRadius: 2,
                  backgroundColor: "#f4f6f8",
                },
              }}
            >
              {hostels.map((hostel) => (
                <MenuItem key={hostel.name} value={hostel.name}>
                  {hostel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          <Button
            type="submit"
            variant="contained"
            color="rgb(81,1,2)"
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          >
            {complaint ? "Update" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
