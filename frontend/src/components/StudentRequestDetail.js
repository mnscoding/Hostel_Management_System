/*02.13
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { CheckCircle, Cancel, PendingActions } from "@mui/icons-material";
import colors from "../config/colors";
const StudentRequestDetail = () => {
  const [studentRequests, setStudentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch all student requests
  const fetchStudentRequests = async () => {
    try {
      const response = await fetch("/api/studentrequests");
      if (response.ok) {
        const data = await response.json();
        setStudentRequests(data);
      } else {
        setErrorMessage("Failed to load student requests.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching student requests.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student requests when the component mounts
  useEffect(() => {
    fetchStudentRequests();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    setLoading(true);
    const updatedRequest = { status };

    try {
      const response = await fetch(`/api/studentrequests/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify(updatedRequest),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccessMessage(
          `Request ${status === "approved" ? "approved" : "rejected"}`
        );
        setOpenSnackbar(true);

        // Fetch the updated list of requests after status change
        setTimeout(() => {
          fetchStudentRequests();
        }, 2000);
      } else {
        const json = await response.json();
        setErrorMessage(json.error || "Failed to update request status.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the request status.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (studentRequests.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No student requests found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 4, pt: 0 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4, color: "black" }}
      >
        Student Requests Management
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <List>
          {studentRequests.map((request) => (
            <Card
              key={request._id}
              sx={{
                marginBottom: 2,
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "black" }}
                      >
                        Registration No: {request.regNo}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Name: {request.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current Hostel: {request.currentHostel}
                        </Typography>
                      </>
                    }
                  />
                  <Chip
                    label={request.status}
                    color={
                      request.status === "approved"
                        ? "success"
                        : request.status === "rejected"
                        ? "error"
                        : "warning"
                    }
                    icon={
                      request.status === "approved" ? (
                        <CheckCircle />
                      ) : request.status === "rejected" ? (
                        <Cancel />
                      ) : (
                        <PendingActions />
                      )
                    }
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="outlined"
                    style={{
                      borderColor: colors.primary,
                      color: colors.secondary,
                    }}
                    onClick={() => handleViewDetails(request)}
                  >
                    View Details
                  </Button>
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "rgb(81,1,2)", color: "white" }}>
          Request Details
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "black" }}
              >
                Registration No: {selectedRequest.regNo}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Name:</strong> {selectedRequest.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Current Hostel:</strong> {selectedRequest.currentHostel}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Reason:</strong> {selectedRequest.reason}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Status:</strong>{" "}
                <Chip
                  label={selectedRequest.status}
                  color={
                    selectedRequest.status === "approved"
                      ? "success"
                      : selectedRequest.status === "rejected"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleStatusChange(selectedRequest._id, "approved");
              handleCloseDialog();
            }}
            disabled={selectedRequest?.status === "approved"}
            startIcon={<CheckCircle />}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleStatusChange(selectedRequest._id, "rejected");
              handleCloseDialog();
            }}
            disabled={selectedRequest?.status === "rejected"}
            startIcon={<Cancel />}
          >
            Reject
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRequestDetail;*/

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  PendingActions,
  Delete,
} from "@mui/icons-material";
import colors from "../config/colors";

const StudentRequestDetail = () => {
  const [studentRequests, setStudentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");

  // Fetch all student requests
  const fetchStudentRequests = async () => {
    try {
      const response = await fetch("/api/studentrequests");
      if (response.ok) {
        const data = await response.json();
        setStudentRequests(data);
      } else {
        setErrorMessage("Failed to load student requests.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching student requests.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hostels
  const fetchHostels = async () => {
    try {
      const response = await fetch("/api/hostels");
      if (response.ok) {
        const data = await response.json();
        setHostels(data);
      } else {
        setErrorMessage("Failed to load hostels.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching hostels.");
      setOpenSnackbar(true);
    }
  };

  // Fetch student requests and hostels when the component mounts
  useEffect(() => {
    fetchStudentRequests();
    fetchHostels();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    setLoading(true);
    const updatedRequest = { status };

    try {
      const response = await fetch(`/api/studentrequests/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify(updatedRequest),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccessMessage(
          `Request ${status === "approved" ? "approved" : "rejected"}`
        );
        setOpenSnackbar(true);

        // Fetch the updated list of requests after status change
        setTimeout(() => {
          fetchStudentRequests();
        }, 2000);
      } else {
        const json = await response.json();
        setErrorMessage(json.error || "Failed to update request status.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the request status.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
    setSelectedHostel("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleHostelChange = (event) => {
    setSelectedHostel(event.target.value);
  };

  const handleApproveRequest = async () => {
    if (!selectedHostel) {
      setErrorMessage("Please select a hostel.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      // Validate student details
      const validationResponse = await fetch("/api/students/validate", {
        method: "POST",
        body: JSON.stringify({
          regNo: selectedRequest.regNo,
          name: selectedRequest.name,
          currentHostel: selectedRequest.currentHostel,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!validationResponse.ok) {
        const errorData = await validationResponse.json();
        setErrorMessage(errorData.error || "Student details do not match.");
        setOpenSnackbar(true);
        return;
      }

      const validationData = await validationResponse.json();
      const studentData = validationData.student;

      // Update student hostel
      const updateResponse = await fetch(`/api/students/${studentData._id}`, {
        method: "PATCH",
        body: JSON.stringify({ hostel: selectedHostel }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        setErrorMessage(errorData.error || "Failed to update student hostel.");
        setOpenSnackbar(true);
        return;
      }

      // Approve the request
      await handleStatusChange(selectedRequest._id, "approved");
      handleCloseDialog();
    } catch (error) {
      setErrorMessage("An error occurred while approving the request.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (studentRequests.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No student requests found.
      </Typography>
    );
  }

  //delete request
  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/studentrequests/${selectedRequest._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSuccessMessage("Request deleted successfully.");
        setOpenSnackbar(true);
        setOpenDialog(false);

        // Refresh the list of student requests after deletion
        setTimeout(() => {
          fetchStudentRequests();
        }, 2000);
      } else {
        const json = await response.json();
        setErrorMessage(json.error || "Failed to delete request.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while deleting the request.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 4, pt: 0 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4, color: "black" }}
      >
        Student Requests Management
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <List>
          {studentRequests.map((request) => (
            <Card
              key={request._id}
              sx={{
                marginBottom: 2,
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "black" }}
                      >
                        Registration No: {request.regNo}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Name: {request.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current Hostel: {request.currentHostel}
                        </Typography>
                      </>
                    }
                  />
                  <Chip
                    label={request.status}
                    color={
                      request.status === "approved"
                        ? "success"
                        : request.status === "rejected"
                        ? "error"
                        : "warning"
                    }
                    icon={
                      request.status === "approved" ? (
                        <CheckCircle />
                      ) : request.status === "rejected" ? (
                        <Cancel />
                      ) : (
                        <PendingActions />
                      )
                    }
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="outlined"
                    style={{
                      borderColor: colors.primary,
                      color: colors.secondary,
                    }}
                    onClick={() => handleViewDetails(request)}
                  >
                    View Details
                  </Button>
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "rgb(81,1,2)", color: "white" }}>
          Request Details
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "black" }}
              >
                Registration No: {selectedRequest.regNo}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Name:</strong> {selectedRequest.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Current Hostel:</strong> {selectedRequest.currentHostel}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Reason:</strong> {selectedRequest.reason}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                <strong>Status:</strong>{" "}
                <Chip
                  label={selectedRequest.status}
                  color={
                    selectedRequest.status === "approved"
                      ? "success"
                      : selectedRequest.status === "rejected"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="hostel-select-label">Select Hostel</InputLabel>
                <Select
                  labelId="hostel-select-label"
                  id="hostel-select"
                  value={selectedHostel}
                  label="Select Hostel"
                  onChange={handleHostelChange}
                >
                  {hostels.map((hostel) => (
                    <MenuItem key={hostel._id} value={hostel.name}>
                      {hostel.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleApproveRequest}
            disabled={selectedRequest?.status === "approved"}
            startIcon={<CheckCircle />}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleStatusChange(selectedRequest._id, "rejected");
              handleCloseDialog();
            }}
            disabled={selectedRequest?.status === "rejected"}
            startIcon={<Cancel />}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="white"
            onClick={handleDeleteRequest}
            startIcon={<Delete />}
          >
            Delete
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRequestDetail;
