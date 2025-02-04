import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import hostel1 from "../images/hostel1.jpg"; // Import images
import hostel2 from "../images/hostel4.jpg";
import hostel3 from "../images/hostel3.jpg";

const GallerySection = () => {
  // Array of images with their alt text
  const galleryImages = [
    { src: hostel1, alt: "Hostel Room" },
    { src: hostel2, alt: "Hostel Cafeteria" },
    { src: hostel3, alt: "Hostel Study Area" },
  ];

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "rgb(81,1,2)", textAlign: "center" }}
        >
          GALLERY
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "30px" }}>
          {galleryImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  "&:hover img": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GallerySection;
