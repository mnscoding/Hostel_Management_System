import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <div className="main-content">
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the University Hostel Management System!
          </Typography>
          <Typography variant="body1" paragraph>
            At our hostel, we strive to create an efficient and supportive
            living environment for all students. Our system is designed to
            streamline and accelerate hostel management processes, reducing
            manual effort and minimizing time delays.
          </Typography>
          <Typography variant="body1" paragraph>
            With our platform, you can efficiently manage and update information
            for both residents and staff, ensuring that everyone has access to
            accurate and timely details. Communication is key, which is why we
            provide a robust platform that facilitates clear information sharing
            and interaction between students, wardens, and administrators.
          </Typography>
          <Typography variant="body1" paragraph>
            Additionally, our system allows students to easily submit and track
            complaints, significantly reducing the need for manual follow-ups
            and ensuring that your concerns are addressed promptly.
          </Typography>
          <Typography variant="body1">
            Join us in making your stay more comfortable and connected. Welcome
            to your home away from home!
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default AboutUs;
