/*2025.01.01
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoticeCarousel = () => {
  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) =>
        notices.length > 0 ? (prevIndex + 1) % notices.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [notices]);

  return (
    <Box
      sx={{
        width: "320px",
        height: "360px",
        backgroundColor: "white",
        color: "black",
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        fontWeight: "bold",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        justifyContent: "space-between",
        border: "1px solid #B5B5B5",
      }}
    >
   
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
      >
        NOTICE
      </Typography>

     
      <Box
        sx={{
          width: "100%",
          padding: "0px",
          margin: "0px",
          fontSize: "16px",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", paddingTop: "0px" }}
        >
          {notices[currentNoticeIndex]?.hostel || "All Hostels"}
        </Typography>
      </Box>

    
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          mt: 1,
          minHeight: "50px",
          color: "#333",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {notices[currentNoticeIndex]?.title || "Important Announcement"}
      </Typography>

     
      <Button
        variant="outlined"
        sx={{
          borderColor: "#4B0000",
          color: "#4B0000",
          fontSize: "14px",
          fontWeight: "bold",

          padding: "8px 10px",
          width: "100%",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "grey",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => navigate("/notices")}
      >
        VIEW ALL NOTICES
      </Button>
    </Box>
  );
};

export default NoticeCarousel;*/

/*
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const NoticeCarousel = () => {
  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) =>
        notices.length > 0 ? (prevIndex + 1) % notices.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [notices]);

  const handlePrevClick = () => {
    setCurrentNoticeIndex((prevIndex) =>
      prevIndex === 0 ? notices.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
  };

  return (
    <Box
      sx={{
        width: "280px",
        height: "320px",
        backgroundColor: "white",
        color: "black",
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        fontWeight: "bold",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        justifyContent: "space-between",
        border: "1px solid #B5B5B5",
        position: "relative", // Important for absolute positioning of the arrows
      }}
    >
    
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          letterSpacing: "0.5px",
          marginBottom: "0px",
          paddingBottom: "0px",
        }}
      >
        NOTICE
      </Typography>

    
      <Box
        sx={{
          width: "100%",
          padding: "0px",
          marginTop: "0px", // Reduced gap between header and hostel category
          fontSize: "16px",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {notices[currentNoticeIndex]?.hostel || "All Hostels"}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          mt: 1,
          minHeight: "50px",
          color: "#333",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {notices[currentNoticeIndex]?.title || "Important Announcement"}
      </Typography>

    
      <Box
        sx={{
          position: "absolute",
          top: "50%", // Vertically center the arrows
          left: "50%",
          transform: "translate(-50%, -50%)", // Adjust position to truly center
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton
          onClick={handlePrevClick}
          sx={{
            color: "#4B0000",
            fontSize: "20px",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        <IconButton
          onClick={handleNextClick}
          sx={{
            color: "#4B0000",
            fontSize: "20px",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

  
      <Button
        variant="outlined"
        sx={{
          borderColor: "#4B0000",
          color: "#4B0000",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "8px 10px",
          width: "100%",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#lightgray",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => navigate("/notices")}
      >
        VIEW ALL NOTICES
      </Button>
    </Box>
  );
};

export default NoticeCarousel;*/
/*02.02
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardContent, Typography } from "@mui/material";

const NoticeCarousel = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch notices from your backend
    axios
      .get("http://localhost:3000/api/notices") // Change to your API endpoint
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Card
      sx={{
        maxWidth: 1400,
        margin: "auto",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          paddingBottom={2}
          sx={{ fontWeight: 700, color: "rgb(81,1,2)" }}
        >
          LATEST NOTICES
        </Typography>
        <Slider {...settings}>
          {notices.map((notice) => (
            <div key={notice._id}>
              <Box
                backgroundColor="rgb(81,1,2)"
                color="white"
                padding={5}
                marginBottom={5}
                boxShadow={4}
                sx={{
                  boxShadow: 5,
                  background: "linear-gradient(to right, #2d0001, #3a0002)",
                }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  marginBottom={4}
                  fontWeight="bold"
                >
                  {notice.hostel || "All Hostels"}
                </Typography>
                <Typography variant="h6" textAlign="center">
                  {notice.title}
                </Typography>
              </Box>
            </div>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default NoticeCarousel;*/
/*
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Custom Left Arrow (Inside Box Corners)
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 15,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        width: 35,
        height: 35,
      }}
    >
      <ArrowBackIos sx={{ fontSize: 20 }} />
    </IconButton>
  );
};

// Custom Right Arrow (Inside Box Corners)
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 15,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        width: 35,
        height: 35,
      }}
    >
      <ArrowForwardIos sx={{ fontSize: 20 }} />
    </IconButton>
  );
};

const NoticeCarousel = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notices")
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Card
      sx={{
        maxWidth: 1400,
        margin: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          paddingBottom={2}
          sx={{ fontWeight: 700, color: "rgb(81,1,2)", textAlign: "center" }}
        >
          LATEST NOTICES
        </Typography>
        <Slider {...settings}>
          {notices.map((notice) => (
            <div key={notice._id}>
              <Box
                backgroundColor="rgb(81,1,2)"
                color="white"
                padding={5}
                marginBottom={5}
                position="relative"
                boxShadow={4}
                sx={{
                  background: "linear-gradient(to right, #2d0001, #3a0002)",
                  borderRadius: 0,
                }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  marginBottom={4}
                  fontWeight="bold"
                >
                  {notice.hostel || "All Hostels"}
                </Typography>
                <Typography variant="h6" textAlign="center">
                  {notice.title}
                </Typography>
              </Box>
            </div>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default NoticeCarousel;*/

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Custom Left Arrow (Inside Box Corners)
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        width: 40,
        height: 40,
        borderRadius: "50%",
      }}
    >
      <ArrowBackIos sx={{ fontSize: 22 }} />
    </IconButton>
  );
};

// Custom Right Arrow (Inside Box Corners)
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        width: 40,
        height: 40,
        borderRadius: "50%",
      }}
    >
      <ArrowForwardIos sx={{ fontSize: 22 }} />
    </IconButton>
  );
};

const NoticeCarousel = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notices")
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: (i) => (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.5,
          "&:hover": { opacity: 1 },
        }}
      />
    ),
  };

  return (
    <Card
      sx={{
        maxWidth: 1200,
        margin: "auto",
        position: "relative",
        overflow: "hidden",
        boxShadow: 12,
        borderRadius: 3,
        backgroundColor: "#f5f5f5", // Light background for the card
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          paddingBottom={3}
          sx={{
            fontWeight: 600,
            color: "rgb(81, 1, 2)", // University color as the main heading color
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          Latest Notices
        </Typography>
        <Slider {...settings}>
          {notices.map((notice) => (
            <div key={notice._id}>
              <Box
                backgroundColor="rgb(81, 1, 2)" // University color as background
                color="white"
                padding={6}
                marginBottom={2} // Reduced gap between notice and button
                position="relative"
                boxShadow={4}
                sx={{
                  borderRadius: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)", // Darker shadow on hover
                  },
                }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  marginBottom={0}
                  fontWeight="600"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: { xs: "1.1rem", sm: "1.4rem" },
                    letterSpacing: 1,
                  }}
                >
                  {notice.hostel || "All Hostels"}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    fontWeight: 500,
                  }}
                >
                  {notice.title}
                </Typography>
              </Box>
            </div>
          ))}
        </Slider>

        {/* View All Notices Button */}
        <Box textAlign="center" marginTop={2}>
          {" "}
          {/* Reduced marginTop for tighter spacing */}
          <Link to="/notices" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white", // University color as button background
                color: "rgb(81, 1, 2)",
                borderColor: "rgb(81, 1, 2)",
                padding: "12px 18px",
                fontSize: "1rem",
                borderRadius: 1,
                boxShadow: 4,
                "&:hover": {
                  backgroundColor: "lightgray", // Darker shade on hover
                },
              }}
              margin={0}
            >
              View All Notices
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoticeCarousel;
