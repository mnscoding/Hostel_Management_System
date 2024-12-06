import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useHostelsContext } from "../hooks/useHostelsContext";

const StudentHostelDetails = ({ hostel }) => {
  const { dispatch } = useHostelsContext();

  return (
    <Card sx={{ maxWidth: 500, mb: 2, wordWrap: "break-word" }}>
      <CardContent>
        {/* Ensure long text breaks to prevent overflow */}
        <Box mb={2}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              overflow: "hidden",
              textOverflow: "ellipsis", // Ensures text doesn't overflow
              whiteSpace: "normal", // Ensures wrapping if necessary
              wordBreak: "break-word", // Break long words if necessary
            }}
          >
            {hostel.name}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            Location: {hostel.location}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            Warden: {hostel.warden}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentHostelDetails;
