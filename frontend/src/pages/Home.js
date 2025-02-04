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

/*2025
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

export default NewHome;*/
/*2025.02.01
import React, { useState } from "react";
import img1 from "../images/img10.jpg";
import img2 from "../images/img11.jpg";
import img3 from "../images/img12.webp";
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
  Collapse,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
  },
  borderRadius: 15,
  overflow: "hidden",
  height: 420,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const GradientButton = styled(Button)({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: 20,
  padding: "8px 16px",
  textTransform: "none",
  fontSize: "0.9rem",
  boxShadow: "0px 4px 10px rgba(33, 203, 243, 0.5)",
  "&:hover": {
    background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#2196F3",
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
});

const NewHome = () => {
  const [expandedRegister, setExpandedRegister] = useState(false);
  const [expandedNotice, setExpandedNotice] = useState(false);
  const [expandedComplaints, setExpandedComplaints] = useState(false);

  return (
    <div className="main-content">
      <ImageCarousel />

      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Welcome to the Hostel Management System
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ pb: 3 }}>
          Your one-stop solution for managing hostel operations at Sabaragamuwa
          University.
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Register",
              img: img1,
              desc: "Easily register new students for hostel accommodations and manage details.",
              expanded: expandedRegister,
              setExpanded: setExpandedRegister,
              link: "/hostels",
            },
            {
              title: "Notices",
              img: img2,
              desc: "Stay updated with the latest announcements and notices.",
              expanded: expandedNotice,
              setExpanded: setExpandedNotice,
              link: "/notices",
            },
            {
              title: "Complaints",
              img: img3,
              desc: "File and track complaints related to hostel facilities and services.",
              expanded: expandedComplaints,
              setExpanded: setExpandedComplaints,
              link: "/complaints",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard sx={{ backgroundColor: "#bdc3c7" }}>
                <CardMedia
                  component="img"
                  src={item.img}
                  alt={`${item.title} illustration`}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderBottom: "4px solid #2196F3",
                  }}
                />
                <CardContent sx={{ textAlign: "left", pt: 1, pb: 0 }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ mt: 0, mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                  <Collapse in={item.expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      More details about {item.title}. Visit{" "}
                      <StyledLink to={item.link}>{item.title}</StyledLink>
                    </Typography>
                  </Collapse>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <GradientButton
                      onClick={() => item.setExpanded(!item.expanded)}
                    >
                      {item.expanded ? "View Less" : "Learn More"}
                    </GradientButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default NewHome;*/

/*good

import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import img4 from "../images/img1.jpg"; // Background Image
import NoticeCarousel from "../components/NoticeCarousel";
import CountNumber from "../components/CountNumber";

// Styled Components
const BackgroundContainer = styled(Box)({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundImage: `url(${img4})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#fff",
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  overflowX: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 50, 0.5)",
  },
});

const MenuButton = styled(Box)({
  position: "absolute",
  top: "20px",
  right: "20px",
  cursor: "pointer",
  zIndex: 2,
});

const ContentContainer = styled(Box)({
  width: "100%",
  backgroundColor: "#fff",
  padding: "50px 0",
  textAlign: "center",
  boxSizing: "border-box",
  margin: 0,
});

const NewHome = () => {
  return (
    <div className="main-content">
      <Box sx={{ width: "100%", overflowX: "hidden", margin: 0, padding: 0 }}>
        
        <BackgroundContainer>
          
          <Typography variant="h3" fontWeight={700} sx={{ zIndex: 2 }}>
            Welcome to Hostel Management System
          </Typography>
          <Typography variant="body1" sx={{ zIndex: 2, marginTop: "10px" }}>
            Website to manage accommodations at the Sabaragamuwa University of
            Sri Lanka.
          </Typography>
        </BackgroundContainer>

        
        <ContentContainer>
          <NoticeCarousel />
          <CountNumber />
        </ContentContainer>
      </Box>
    </div>
  );
};

export default NewHome;*/

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import img4 from "../images/img1.jpg"; // Background Image
import NoticeCarousel from "../components/NoticeCarousel";
import CountNumber from "../components/CountNumber";
import GallerySection from "../components/GallerySection";

const NewHome = () => {
  return (
    <div className="main-content">
      <Box sx={{ width: "100%", overflowX: "hidden", margin: 0, padding: 0 }}>
        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${img4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            overflowX: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 50, 0.5)",
            },
          }}
        >
          {/* Welcome Text */}
          <Typography variant="h3" fontWeight={700} sx={{ zIndex: 2 }}>
            Welcome to Hostel Management System
          </Typography>
          <Typography
            variant="h5"
            sx={{ zIndex: 2, marginTop: "10px", fontWeight: 400 }}
          >
            A place to manage your accommodation, facilities, and hostel-related
            tasks.
          </Typography>

          {/* Apply Now Button */}
          <Link to="/hostels" style={{ textDecoration: "none", zIndex: 2 }}>
            <Box
              sx={{
                marginTop: "30px",
                backgroundColor: "#fff",
                color: "rgb(81,1,2)",
                padding: "15px 40px",
                borderRadius: "30px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "18px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  transform: "scale(1.05)", // Slight hover scale effect
                },
              }}
            >
              Apply Now
            </Box>
          </Link>
        </Box>

        {/* Section Below Background */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "50px 0",
            textAlign: "center",
            boxSizing: "border-box",
            margin: 0,
          }}
        >
          <NoticeCarousel />
          <CountNumber />
          <GallerySection />
        </Box>
      </Box>
    </div>
  );
};

export default NewHome;
