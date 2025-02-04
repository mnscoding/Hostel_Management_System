import React from "react";
import { Box, Typography } from "@mui/material";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CountNumber = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only triggers animation once
    threshold: 0.5, // Starts animation when 50% of the section is visible
  });

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: "rgb(81,1,2)" }}>
        HOSTEL FACILITIES
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxWidth: "800px", margin: "10px auto", color: "#666" }}
      >
        The University hostels provide enormous facilities aiming at creating a
        good learning environment for residential students. Internal hostels are
        equipped with high-standard bedrooms, meeting areas, a common area, a
        playing area (carom), and a canteen.
      </Typography>

      {/* Statistics Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "30px",
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            {inView ? <CountUp start={0} end={10} duration={2} /> : 0}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            FACULTIES
          </Typography>
        </Box>

        <Box>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            {inView ? <CountUp start={0} end={6000} duration={3} /> : 0}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            STUDENTS
          </Typography>
        </Box>

        <Box>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            {inView ? <CountUp start={0} end={20} duration={2.5} /> : 0}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            SUB-WARDENS
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CountNumber;
