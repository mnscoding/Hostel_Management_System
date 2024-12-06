/*import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import AddNoticeForm from "../components/NoticeForm";

const NewHome = () => {
  return (
    <div className="main-content">
      <ImageCarousel />
    </div>
  );
};

export default NewHome;*/
import React, { useState } from "react";
import img1 from "../images/img10.jpg";
import img2 from "../images/img11.jpg"; // Image for Notices
import img3 from "../images/img12.webp"; // New image for Complaints
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const NewHome = () => {
  const [expandedRegister, setExpandedRegister] = useState(false);
  const [expandedNotice, setExpandedNotice] = useState(false);
  const [expandedComplaints, setExpandedComplaints] = useState(false);

  const handleExpandToggleRegister = () => {
    setExpandedRegister(!expandedRegister);
  };

  const handleExpandToggleNotice = () => {
    setExpandedNotice(!expandedNotice);
  };

  const handleExpandToggleComplaints = () => {
    setExpandedComplaints(!expandedComplaints);
  };

  return (
    <div className="main-content">
      <ImageCarousel />

      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Hostel Management System
        </Typography>
        <Typography variant="h6" sx={{ mb: "20px" }} gutterBottom>
          Your one-stop solution for managing hostel operations at Sabaragamuwa
          University of Sri Lanka.
        </Typography>

        <Grid container spacing={4}>
          {/* Register Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                src={img1}
                alt="Register illustration"
                sx={{ width: "100%", height: 200, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Register
                </Typography>
                <Typography variant="body2">
                  Easily register new students for hostel accommodations and
                  manage their details effectively.
                </Typography>

                {expandedRegister && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Students can easily apply for hostel accommodations for the
                    upcoming academic year. Visit the registration page to
                    complete the application process and secure a place in the
                    hostel.Visit
                    <Button
                      component={Link}
                      to="/hostels"
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      Hostels
                    </Button>
                  </Typography>
                )}

                <Button
                  onClick={handleExpandToggleRegister}
                  variant="outlined"
                  sx={{ mt: "auto" }}
                >
                  {expandedRegister ? "View Less" : "Learn More"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Notices Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                src={img2}
                alt="Notices illustration"
                sx={{ width: "100%", height: 200, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Notices
                </Typography>
                <Typography variant="body2">
                  Stay updated with the latest announcements and notices related
                  to hostel management.
                </Typography>

                {expandedNotice && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Students can stay informed about essential updates,
                    schedules, and notifications related to hostel activities
                    and regulations. Important notices are also sent directly to
                    students' emails, ensuring they never miss an announcement
                    impacting hostel life.Visit
                    <Button
                      component={Link}
                      to="/notices"
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      Notices
                    </Button>
                  </Typography>
                )}

                <Button
                  onClick={handleExpandToggleNotice}
                  variant="outlined"
                  sx={{ mt: "auto" }}
                >
                  {expandedNotice ? "View Less" : "Learn More"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Complaints Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                src={img3} // Use the new image for Complaints
                alt="Complaints illustration"
                sx={{ width: "100%", height: 200, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Complaints
                </Typography>
                <Typography variant="body2">
                  File and track complaints related to hostel facilities and
                  services efficiently.
                </Typography>

                {expandedComplaints && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Students can submit complaints about issues within the
                    hostel premises, including maintenance requests, service
                    concerns, or any other grievances. We ensure all complaints
                    are addressed promptly to maintain a comfortable living
                    environment. Visit
                    <Button
                      component={Link}
                      to="/complaints"
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      Complaints
                    </Button>
                  </Typography>
                )}

                <Button
                  onClick={handleExpandToggleComplaints}
                  variant="outlined"
                  sx={{ mt: "auto" }}
                >
                  {expandedComplaints ? "View Less" : "Learn More"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default NewHome;
