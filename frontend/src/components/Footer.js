import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgb(81, 1, 2)",
        color: "white",
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Hostel Management System</Typography>
      <Typography variant="body2" sx={{ my: 1 }}>
        Sabaragamuwa University of Sri Lanka
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" color="inherit" sx={{ mx: 1 }}>
          Home
        </Link>
        <Link href="/about" color="inherit" sx={{ mx: 1 }}>
          About
        </Link>
        <Link href="/notices" color="inherit" sx={{ mx: 1 }}>
          Notices
        </Link>
        <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
          Contact Us
        </Link>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Hostel Management System. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
