/*import React from "react";
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

export default Footer;*/

import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  Email,
  Phone,
  Home,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#400000", color: "white", padding: 6 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h6" fontWeight="bold">
              CONTACT INFO
            </Typography>
            <Typography variant="body2" mt={1}>
              <Home sx={{ verticalAlign: "middle", marginRight: 1 }} />
              Sabaragamuwa University of Sri Lanka, P.O. Box 02, Belihuloya,
              70140, Sri Lanka
            </Typography>
            <Typography variant="body2" mt={1}>
              <Phone sx={{ verticalAlign: "middle", marginRight: 1 }} />
              +94-45-2280014 / +94-45-2280087
            </Typography>
            <Typography variant="body2" mt={1}>
              <Email sx={{ verticalAlign: "middle", marginRight: 1 }} />
              info@sab.ac.lk
            </Typography>
            <Box mt={2}>
              {[Facebook, Twitter, LinkedIn, YouTube].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ display: "inline-block", marginRight: 10 }}
                >
                  <IconButton color="inherit">
                    <Icon />
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h6" fontWeight="bold">
              STUDENT ACCOMMODATION
            </Typography>
            <Typography variant="body2" mt={1} textAlign="justify">
              The University provides good quality accommodation facilities by
              its own in-campus large hostel complexes and the others, located
              in the immediate neighborhood of the main premises. Student
              accommodation is administered by the Student Affairs Branch in
              accordance with the rules and regulations articulated by the
              University.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
