import image1 from "../images/img1.jpg";
import image2 from "../images/img2.jpeg";
import image3 from "../images/img3.jpg";

import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [image1, image2, image3];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("forward"); // State to track the direction of the carousel

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, direction]);

  const handleNextSlide = () => {
    if (direction === "forward") {
      if (currentIndex === images.length - 1) {
        setDirection("backward"); // Change direction when reaching the last image
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex === 0) {
        setDirection("forward"); // Change direction when reaching the first image
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const goToPreviousSlide = () => {
    if (currentIndex === 0) {
      setDirection("forward"); // Change direction to forward when going back to first slide
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 1) {
      setDirection("backward"); // Change direction to backward when going forward from last slide
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "90%",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(${-currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Box key={index} sx={{ minWidth: "100%", height: "400px" }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>

      {/* Previous and Next Buttons */}
      <IconButton
        onClick={goToPreviousSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={goToNextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Slide Indicators */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index ? "rgb(81, 1, 2)" : "grey.400", // Use custom color for active dot
              margin: "0 5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
