/*import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ComplaintDetails = ({ complaint, onDelete }) => {
  if (!complaint) return null;

  const formattedCreatedAt = new Date(complaint.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "visible",
        position: "relative", // Enable positioning for the delete button
      }}
    >
      <CardContent>
        {onDelete && (
          <IconButton
            onClick={() => onDelete(complaint._id)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "inherit", // Inherit color from the theme
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}

        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {complaint.hostel}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          paragraph
          sx={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {complaint.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" align="right">
          {formattedCreatedAt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComplaintDetails;*/
//2
/*import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ComplaintDetails = ({ complaint, onDelete, onEdit, onResolve }) => {
  if (!complaint) return null;

  const formattedCreatedAt = new Date(complaint.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  const handleToggleResolve = () => {
    const newStatus =
      complaint.status === "unresolved" ? "resolved" : "unresolved";
    onResolve(complaint._id, newStatus);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "visible",
        position: "relative",
      }}
    >
      <CardContent>
        {onDelete && (
          <IconButton
            onClick={() => onDelete(complaint._id)}
            sx={{ position: "absolute", top: 8, right: 40, color: "inherit" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {onEdit && (
          <IconButton
            onClick={() => onEdit(complaint)}
            sx={{ position: "absolute", top: 8, right: 8, color: "inherit" }}
          >
            <EditIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {complaint.hostel}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          paragraph
          sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        >
          {complaint.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" align="right">
          {formattedCreatedAt}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ marginLeft: "8px" }} // Added margin for spacing
        >
          Status: {complaint.status}
        </Typography>
        {onResolve && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleToggleResolve}
              variant="contained"
              color={complaint.status === "unresolved" ? "success" : "error"}
              sx={{ fontSize: "10px" }}
            >
              {complaint.status === "unresolved"
                ? "Mark as Resolved"
                : "Mark as Unresolved"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplaintDetails;
*/
/*2025.01.30
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon

const ComplaintDetails = ({ complaint, onDelete, onEdit, onResolve }) => {
  if (!complaint) return null;

  const formattedCreatedAt = new Date(complaint.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  const handleToggleResolve = () => {
    const newStatus =
      complaint.status === "unresolved" ? "resolved" : "unresolved";
    onResolve(complaint._id, newStatus);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "visible",
        position: "relative",
      }}
    >
      <CardContent>
        {onDelete && (
          <IconButton
            onClick={() => onDelete(complaint._id)}
            sx={{ position: "absolute", top: 8, right: 40, color: "inherit" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {onEdit && (
          <IconButton
            onClick={() => onEdit(complaint)}
            sx={{ position: "absolute", top: 8, right: 8, color: "inherit" }}
          >
            <EditIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {complaint.hostel}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          paragraph
          sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        >
          {complaint.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" align="right">
          {formattedCreatedAt}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginLeft: "8px" }} // Added margin for spacing
          >
            Status: {complaint.status}
          </Typography>
          {complaint.status === "resolved" && (
            <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
          )}
        </Box>
        {onResolve && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleToggleResolve}
              variant="contained"
              color={complaint.status === "unresolved" ? "success" : "error"}
              sx={{ fontSize: "10px" }}
            >
              {complaint.status === "unresolved"
                ? "Mark as Resolved"
                : "Mark as Unresolved"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplaintDetails;*/

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Import hourglass icon for processing

const ComplaintDetails = ({ complaint, onDelete, onEdit, onResolve }) => {
  if (!complaint) return null;

  const formattedCreatedAt = new Date(complaint.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  const handleToggleResolve = () => {
    let newStatus;
    if (complaint.status === "unresolved") {
      newStatus = "processing";
    } else if (complaint.status === "processing") {
      newStatus = "resolved";
    } else {
      newStatus = "unresolved";
    }
    onResolve(complaint._id, newStatus);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "visible",
        position: "relative",
      }}
    >
      <CardContent>
        {onDelete && (
          <IconButton
            onClick={() => onDelete(complaint._id)}
            sx={{ position: "absolute", top: 8, right: 40, color: "inherit" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {onEdit && (
          <IconButton
            onClick={() => onEdit(complaint)}
            sx={{ position: "absolute", top: 8, right: 8, color: "inherit" }}
          >
            <EditIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {complaint.hostel}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          paragraph
          sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        >
          {complaint.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" align="right">
          {formattedCreatedAt}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginLeft: "8px" }}
          >
            Status: {complaint.status}
          </Typography>
          {complaint.status === "resolved" && (
            <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
          )}
          {complaint.status === "processing" && (
            <HourglassEmptyIcon sx={{ color: "orange", ml: 1 }} />
          )}
        </Box>
        {onResolve && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleToggleResolve}
              variant="contained"
              color={
                complaint.status === "unresolved"
                  ? "success"
                  : complaint.status === "processing"
                  ? "warning"
                  : "error"
              }
              sx={{ fontSize: "10px" }}
            >
              {complaint.status === "unresolved"
                ? "Mark as Processing"
                : complaint.status === "processing"
                ? "Mark as Resolved"
                : "Mark as Unresolved"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplaintDetails;
