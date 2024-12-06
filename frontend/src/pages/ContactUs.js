import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send to an API)

    // Reset the form
    setName("");
    setEmail("");
    setMessage("");
    setOpenSnackbar(true);
  };

  return (
    <div className="main-content">
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We would love to hear from you! Please fill out the form below, and we
          will get back to you as soon as possible.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </form>

        <Box mt={4}>
          <Typography variant="h6">Contact Information</Typography>
          <Typography variant="body2">Email: support@example.com</Typography>
          <Typography variant="body2">Phone: (123) 456-7890</Typography>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          message="Your message has been sent!"
        />
      </Box>
    </div>
  );
};

export default ContactUs;
