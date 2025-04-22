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

/*2025.02.02
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

export default ComplaintDetails;*/

/*2025.04.21
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
  Avatar,
  Tooltip,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { styled, keyframes } from "@mui/system";

// Keyframe for subtle pulse animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  margin: "20px auto",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  overflow: "visible",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  marginLeft: "8px",
  backgroundColor:
    status === "resolved"
      ? "#81c784" // Light green
      : status === "processing"
      ? "#ffb74d" // Light orange
      : "#e57373", // Light red
  color:
    status === "resolved"
      ? "#1b5e20" // Dark green
      : status === "processing"
      ? "#e65100" // Dark orange
      : "#c62828", // Dark red
  fontWeight: "bold",
  animation: `${pulse} 2s infinite`,
}));

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
    <StyledCard>
      <CardContent>
        {onDelete && (
          <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
            <IconButton
              onClick={() => onDelete(complaint._id)}
              sx={{ position: "absolute", top: 8, right: 40, color: "inherit" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {onEdit && (
          <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
            <IconButton
              onClick={() => onEdit(complaint)}
              sx={{ position: "absolute", top: 8, right: 8, color: "inherit" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
          sx={{ color: "black" }}
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
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Status:
          </Typography>
          <StatusChip
            avatar={
              <Avatar>
                {complaint.status === "resolved" ? (
                  <CheckCircleIcon />
                ) : complaint.status === "processing" ? (
                  <HourglassEmptyIcon />
                ) : null}
              </Avatar>
            }
            label={complaint.status}
            status={complaint.status}
          />
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
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
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
    </StyledCard>
  );
};

export default ComplaintDetails;*/

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
  Avatar,
  Tooltip,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { styled, keyframes } from "@mui/system";

// Keyframe for subtle pulse animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  margin: "20px auto",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  overflow: "visible",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  marginLeft: "8px",
  backgroundColor:
    status === "resolved"
      ? "#81c784" // Light green
      : status === "processing"
      ? "#ffb74d" // Light orange
      : "#e57373", // Light red
  color:
    status === "resolved"
      ? "#1b5e20" // Dark green
      : status === "processing"
      ? "#e65100" // Dark orange
      : "#c62828", // Dark red
  fontWeight: "bold",
  animation: `${pulse} 2s infinite`,
}));

const ComplaintDetails = ({ complaint, onDelete, onEdit, onResolve }) => {
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleDelete = () => {
    onDelete(complaint._id); // Delete the complaint
    setOpenDialog(false); // Close the confirmation dialog
  };

  const handleOpenDialog = () => {
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the confirmation dialog without deleting
  };

  return (
    <StyledCard>
      <CardContent>
        {onDelete && (
          <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
            <IconButton
              onClick={handleOpenDialog} // Open confirmation dialog
              sx={{ position: "absolute", top: 8, right: 40, color: "inherit" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {onEdit && (
          <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
            <IconButton
              onClick={() => onEdit(complaint)}
              sx={{ position: "absolute", top: 8, right: 8, color: "inherit" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
          sx={{ color: "black" }}
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
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Status:
          </Typography>
          <StatusChip
            avatar={
              <Avatar>
                {complaint.status === "resolved" ? (
                  <CheckCircleIcon />
                ) : complaint.status === "processing" ? (
                  <HourglassEmptyIcon />
                ) : null}
              </Avatar>
            }
            label={complaint.status}
            status={complaint.status}
          />
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
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
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

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          {"Are you sure you want to delete this complaint?"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This action cannot be undone. Please confirm if you wish to delete
            this complaint.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default ComplaintDetails;
