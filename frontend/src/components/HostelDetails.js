/*import { useHostelsContext } from "../hooks/useHostelsContext"; // Adjust the import path as needed
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon

const HostelDetails = ({ hostel, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useHostelsContext();

  const handleDelete = async () => {
    const response = await fetch("/api/hostels/" + hostel._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSTEL", payload: json });
      onDeleteSuccess(); // Call the callback to refresh hostels
    }
  };

  if (!hostel) return null;

  const formattedCreatedAt = new Date(hostel.createdAt).toLocaleString(
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
        maxWidth: 1000,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "visible",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {hostel.name}
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          <strong>Location:</strong> {hostel.location}
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          <strong>Gender:</strong> {hostel.gender}
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          <strong>Warden:</strong> {hostel.warden}
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          <strong>Room Count:</strong> {hostel.roomCount}
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          <strong>Max Students:</strong> {hostel.maxStudents}
        </Typography>
        {hostel.existingStudents && hostel.existingStudents.length > 0 && (
          <div>
            <strong>Existing Students:</strong>
            {hostel.existingStudents.map((student, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {student.year} - {student.faculty}: {student.count} students
              </Typography>
            ))}
          </div>
        )}

        <Typography variant="caption" color="textSecondary" align="right">
          Created at: {formattedCreatedAt}
        </Typography>

        {canEditDelete && (
          <>
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute", top: 8, right: 40 }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => onEdit(hostel)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HostelDetails;
*/

/*2024.10.21
import React, { useState } from "react";
import { useHostelsContext } from "../hooks/useHostelsContext"; // Adjust the import path as needed
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const HostelDetails = ({ hostel, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useHostelsContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState(null);

  const handleDelete = async () => {
    if (!hostelToDelete) return;

    const response = await fetch("/api/hostels/" + hostelToDelete, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSTEL", payload: json });
      onDeleteSuccess(); // Call the callback to refresh hostels
    }
    setOpenConfirmDialog(false);
    setHostelToDelete(null);
  };

  const formattedCreatedAt = new Date(hostel.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  if (!hostel) return null;

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 1000,
          margin: "20px auto",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "visible",
          position: "relative",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            gutterBottom
            noWrap
          >
            {hostel.name}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Location:</strong> {hostel.location}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Gender:</strong> {hostel.gender}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Warden:</strong> {hostel.warden}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Room Count:</strong> {hostel.roomCount}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Max Students:</strong> {hostel.maxStudents}
          </Typography>
          {hostel.existingStudents && hostel.existingStudents.length > 0 && (
            <div>
              <strong>Existing Students:</strong>
              {hostel.existingStudents.map((student, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {student.year} - {student.faculty}: {student.count} students
                </Typography>
              ))}
            </div>
          )}
          <Typography variant="caption" color="textSecondary" align="right">
            Created at: {formattedCreatedAt}
          </Typography>

          {canEditDelete && (
            <>
              <IconButton
                onClick={() => {
                  setHostelToDelete(hostel._id);
                  setOpenConfirmDialog(true);
                }}
                sx={{ position: "absolute", top: 8, right: 40 }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => onEdit(hostel)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this hostel?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HostelDetails;
*/

/*2025
import React, { useState } from "react";
import { useHostelsContext } from "../hooks/useHostelsContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const HostelDetails = ({ hostel, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useHostelsContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState(null);

  // Function to calculate total existing students
  const calculateTotalStudents = () => {
    return hostel.existingStudents.reduce(
      (acc, student) => acc + student.count,
      0
    );
  };

  const totalStudents = calculateTotalStudents();
  const isFull = totalStudents >= hostel.maxStudents;

  const handleDelete = async () => {
    if (!hostelToDelete) return;

    const response = await fetch("/api/hostels/" + hostelToDelete, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSTEL", payload: json });
      onDeleteSuccess();
    }
    setOpenConfirmDialog(false);
    setHostelToDelete(null);
  };

  const formattedCreatedAt = new Date(hostel.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  if (!hostel) return null;

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 1000,
          margin: "20px auto",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "visible",
          position: "relative",
          backgroundColor: isFull ? "#f8d7da" : "#ffffff", // Light red if full
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            gutterBottom
            noWrap
          >
            {hostel.name}
            {isFull && (
              <Chip
                label="Full"
                color="error"
                size="small"
                sx={{ marginLeft: 1 }}
              />
            )}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Location:</strong> {hostel.location}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Gender:</strong> {hostel.gender}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Warden:</strong> {hostel.warden}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Room Count:</strong> {hostel.roomCount}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Max Students:</strong> {hostel.maxStudents}
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            <strong>Total Students:</strong> {totalStudents}
          </Typography>
          {hostel.existingStudents && hostel.existingStudents.length > 0 && (
            <div>
              <strong>Existing Students:</strong>
              {hostel.existingStudents.map((student, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {student.year} - {student.faculty}: {student.count} students
                </Typography>
              ))}
            </div>
          )}
          <Typography variant="caption" color="textSecondary" align="right">
            Created at: {formattedCreatedAt}
          </Typography>

          {canEditDelete && (
            <>
              <IconButton
                onClick={() => {
                  setHostelToDelete(hostel._id);
                  setOpenConfirmDialog(true);
                }}
                sx={{ position: "absolute", top: 8, right: 40 }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => onEdit(hostel)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this hostel?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HostelDetails;*/
/*2025.02.02
import React, { useState } from "react";
import { useHostelsContext } from "../hooks/useHostelsContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

const HostelDetails = ({ hostel, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useHostelsContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState(null);

  // Function to calculate total existing students
  const calculateTotalStudents = () => {
    return hostel.existingStudents.reduce(
      (acc, student) => acc + student.count,
      0
    );
  };

  const totalStudents = calculateTotalStudents();
  const isFull = totalStudents >= hostel.maxStudents;

  const handleDelete = async () => {
    if (!hostelToDelete) return;

    const response = await fetch("/api/hostels/" + hostelToDelete, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSTEL", payload: json });
      onDeleteSuccess();
    }
    setOpenConfirmDialog(false);
    setHostelToDelete(null);
  };

  const formattedCreatedAt = new Date(hostel.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  if (!hostel) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1000,
            margin: "20px auto",
            borderRadius: 3,
            boxShadow: 5,
            overflow: "visible",
            position: "relative",
            backgroundColor: isFull ? "#f8d7da" : "#ffffff", // Light red if full
          }}
        >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom noWrap>
              {hostel.name}
              {isFull && (
                <Chip
                  label="Full"
                  color="error"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    fontWeight: "bold",
                  }}
                />
              )}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textPrimary">
                  <strong>Location:</strong> {hostel.location}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  <strong>Gender:</strong> {hostel.gender}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  <strong>Warden:</strong> {hostel.warden}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textPrimary">
                  <strong>Room Count:</strong> {hostel.roomCount}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  <strong>Max Students:</strong> {hostel.maxStudents}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  <strong>Total Students:</strong> {totalStudents}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {hostel.existingStudents && hostel.existingStudents.length > 0 && (
              <Box mb={2}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Existing Students:
                </Typography>
                {hostel.existingStudents.map((student, index) => (
                  <Typography key={index} variant="body2" color="textSecondary">
                    Year {student.year} - {student.faculty}: {student.count}{" "}
                    students
                  </Typography>
                ))}
              </Box>
            )}
          </CardContent>

          {canEditDelete && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <IconButton
                onClick={() => {
                  setHostelToDelete(hostel._id);
                  setOpenConfirmDialog(true);
                }}
                sx={{ marginRight: 1 }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => onEdit(hostel)}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Card>

        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 2,
              minWidth: 300,
            },
          }}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this hostel?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default HostelDetails;*/
/*2025.02.02
import React, { useState } from "react";
import { useHostelsContext } from "../hooks/useHostelsContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Grid,
  Box,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

const HostelDetails = ({ hostel, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useHostelsContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState(null);

  // Function to calculate total existing students
  const calculateTotalStudents = () => {
    return hostel.existingStudents.reduce(
      (acc, student) => acc + student.count,
      0
    );
  };

  const totalStudents = calculateTotalStudents();
  const isFull = totalStudents >= hostel.maxStudents;

  const handleDelete = async () => {
    if (!hostelToDelete) return;

    const response = await fetch("/api/hostels/" + hostelToDelete, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSTEL", payload: json });
      onDeleteSuccess();
    }
    setOpenConfirmDialog(false);
    setHostelToDelete(null);
  };

  const formattedCreatedAt = new Date(hostel.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  if (!hostel) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1000,
            margin: "20px auto",
            borderRadius: 3,
            boxShadow: 5,
            overflow: "visible",
            position: "relative",
            backgroundColor: isFull ? "#f8d7da" : "#ffffff", // Light red if full
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold" noWrap>
                {hostel.name}
              </Typography>
              {isFull && (
                <Chip
                  label="Full"
                  color="error"
                  size="small"
                  sx={{
                    fontWeight: "bold",
                  }}
                />
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Basic Information
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Location:</strong> {hostel.location}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Gender:</strong> {hostel.gender}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Warden:</strong> {hostel.warden}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Capacity Details
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Room Count:</strong> {hostel.roomCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Max Students:</strong> {hostel.maxStudents}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Total Students:</strong> {totalStudents}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {hostel.existingStudents && hostel.existingStudents.length > 0 && (
              <Box mb={2}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Existing Students:
                </Typography>
                <Grid container spacing={2}>
                  {hostel.existingStudents.map((student, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Year {student.year}</strong> -{" "}
                          {student.faculty}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {student.count} students
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>

          {canEditDelete && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <IconButton
                onClick={() => {
                  setHostelToDelete(hostel._id);
                  setOpenConfirmDialog(true);
                }}
                sx={{ marginRight: 1 }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => onEdit(hostel)}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Card>

        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 2,
              minWidth: 300,
            },
          }}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this hostel?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default HostelDetails;*/

import React, { useState } from "react";
import { useHostelsContext } from "../hooks/useHostelsContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Grid,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WcIcon from "@mui/icons-material/Wc";
import { motion } from "framer-motion";

const HostelDetails = ({ hostel, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useHostelsContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [hostelToDelete, setHostelToDelete] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Function to calculate total existing students
  const calculateTotalStudents = () => {
    return hostel.existingStudents.reduce(
      (acc, student) => acc + student.count,
      0
    );
  };

  const totalStudents = calculateTotalStudents();
  const isFull = totalStudents >= hostel.maxStudents;

  const handleDelete = async () => {
    if (!hostelToDelete) return;

    const response = await fetch("/api/hostels/" + hostelToDelete, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSTEL", payload: json });
      onDeleteSuccess();
    }
    setOpenConfirmDialog(false);
    setHostelToDelete(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!hostel) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1000,
            margin: "20px auto",
            borderRadius: 3,
            boxShadow: 5,
            overflow: "visible",
            position: "relative",
            backgroundColor: isFull ? "#f8d7da" : "#ffffff",
          }}
        >
          <CardContent>
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold" noWrap>
                {hostel.name}
              </Typography>
              {isFull && (
                <Chip
                  label="Full"
                  color="error"
                  size="small"
                  sx={{
                    fontWeight: "bold",
                  }}
                />
              )}
            </Box>

            {/* Tabs for Navigation */}
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Overview" />
              <Tab label="Students" />
              <Tab label="Details" />
            </Tabs>

            {/* Tab Content */}
            {tabValue === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      "&:hover": { boxShadow: 2 },
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">Location</Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      {hostel.location}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      "&:hover": { boxShadow: 2 },
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <WcIcon sx={{ mr: 1, color: "secondary.main" }} />
                      <Typography variant="h6">Gender</Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      {hostel.gender}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      "&:hover": { boxShadow: 2 },
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <MeetingRoomIcon sx={{ mr: 1, color: "info.main" }} />
                      <Typography variant="h6">Room Count</Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      {hostel.roomCount}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      "&:hover": { boxShadow: 2 },
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <PeopleIcon sx={{ mr: 1, color: "success.main" }} />
                      <Typography variant="h6">Capacity</Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      {totalStudents} / {hostel.maxStudents} students
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Existing Students
                </Typography>
                {hostel.existingStudents.map((student, index) => (
                  <Accordion key={index} elevation={0} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        Year {student.year} - {student.faculty}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{student.count} students</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Warden:</strong> {hostel.warden}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Created At:</strong>{" "}
                  {new Date(hostel.createdAt).toLocaleString()}
                </Typography>
              </Box>
            )}
          </CardContent>

          {/* Edit/Delete Buttons */}
          {canEditDelete && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <IconButton
                onClick={() => {
                  setHostelToDelete(hostel._id);
                  setOpenConfirmDialog(true);
                }}
                sx={{ marginRight: 1 }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => onEdit(hostel)}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 2,
              minWidth: 300,
            },
          }}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this hostel?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default HostelDetails;
