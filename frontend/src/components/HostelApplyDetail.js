/*import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (filepath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${filepath}`;
    link.download = filepath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      if (!response.ok) throw new Error("Failed to approve application");

      // Update the uploads state
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "accepted" } : upload
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      if (!response.ok) throw new Error("Failed to reject application");

      // Update the uploads state
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "rejected" } : upload
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submitted Applications
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {uploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1" display="inline">
                        Reg. No: {upload.regNo} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Name: {upload.name} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Status: {upload.status}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => toggleExpand(upload._id)}
                        sx={{ mr: 1 }}
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDownload(upload.filepath)}
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      District: {upload.district}
                    </Typography>
                    <Typography variant="body2">City: {upload.city}</Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Distance: {upload.distanceFromHome}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">Year: {upload.year}</Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Income: {upload.income}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(upload._id)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(upload._id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TestUploads;
*/

/*02.05
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (filepath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${filepath}`;
    link.download = filepath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      if (!response.ok) throw new Error("Failed to approve application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "accepted" } : upload
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      if (!response.ok) throw new Error("Failed to reject application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "rejected" } : upload
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter uploads based on selected status
  const filteredUploads = uploads.filter((upload) => {
    if (statusFilter === "All") return true;
    return upload.status === statusFilter.toLowerCase();
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submitted Applications
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <Card variant="outlined" sx={{ mb: 0 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1" display="inline">
                        Reg. No: {upload.regNo} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Name: {upload.name} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Status: {upload.status}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => toggleExpand(upload._id)}
                        sx={{ mr: 1 }}
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDownload(upload.filepath)}
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      District: {upload.district}
                    </Typography>
                    <Typography variant="body2">City: {upload.city}</Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Distance: {upload.distanceFromHome}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">Year: {upload.year}</Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Income: {upload.income}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(upload._id)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(upload._id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TestUploads;*/

/*02.08
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (filepath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${filepath}`;
    link.download = filepath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      if (!response.ok) throw new Error("Failed to approve application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "accepted" } : upload
        )
      );
      setSnackbarMessage("Application approved successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to approve application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      if (!response.ok) throw new Error("Failed to reject application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "rejected" } : upload
        )
      );
      setSnackbarMessage("Application rejected successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to reject application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUploadId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${selectedUploadId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete application");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== selectedUploadId)
      );
      setSnackbarMessage("Application deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to delete application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUploadId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredUploads = uploads.filter((upload) => {
    if (statusFilter === "All") return true;
    return upload.status === statusFilter.toLowerCase();
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: "2rem",
          color: "#333",
          letterSpacing: "0.5px",
          lineHeight: 1.3,
          marginBottom: "1.5rem",
          // Increased font size for title
        }}
      >
        Submitted Applications
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <Card variant="outlined" sx={{ mb: 0 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1" display="inline">
                        Reg. No: {upload.regNo} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Name: {upload.name} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Status: {upload.status}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => toggleExpand(upload._id)}
                        variant="outlined"
                        color="primary"
                        sx={{
                          mt: 2,
                          marginRight: 1,
                          borderColor: "rgb(81,1,2)",
                          color: "rgb(81,1,2)",
                          "&:hover": {
                            borderColor: "rgb(81,1,2)",
                            backgroundColor: "rgba(81,1,2, 0.1)",
                          },
                        }}
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                      <Button
                        onClick={() => handleDownload(upload.filepath)}
                        variant="outlined"
                        color="primary"
                        sx={{
                          mt: 2,
                          borderColor: "rgb(81,1,2)",
                          color: "rgb(81,1,2)",
                          "&:hover": {
                            borderColor: "rgb(81,1,2)",
                            backgroundColor: "rgba(81,1,2, 0.1)",
                          },
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(upload._id)}
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 2,
                          marginLeft: 1,
                          backgroundColor: "rgb(81,1,2)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(81,1,2, 0.1)",
                            color: "black",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      District: {upload.district}
                    </Typography>
                    <Typography variant="body2">City: {upload.city}</Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Distance: {upload.distanceFromHome}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">Year: {upload.year}</Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Income: {upload.income}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(upload._id)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(upload._id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;*/
/*02.23
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (filepath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${filepath}`;
    link.download = filepath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      if (!response.ok) throw new Error("Failed to approve application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "accepted" } : upload
        )
      );
      setSnackbarMessage("Application approved successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to approve application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      if (!response.ok) throw new Error("Failed to reject application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "rejected" } : upload
        )
      );
      setSnackbarMessage("Application rejected successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to reject application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUploadId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${selectedUploadId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete application");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== selectedUploadId)
      );
      setSnackbarMessage("Application deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to delete application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUploadId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredUploads = uploads.filter((upload) => {
    if (statusFilter === "All") return true;
    return upload.status === statusFilter.toLowerCase();
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: "2rem",
          color: "#333",
          letterSpacing: "0.5px",
          lineHeight: 1.3,
          marginBottom: "1.5rem",
        }}
      >
        Submitted Applications
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <Card variant="outlined" sx={{ mb: 0 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1" display="inline">
                        Reg. No: {upload.regNo} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Name: {upload.name} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Status: {upload.status}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => toggleExpand(upload._id)}
                        variant="outlined"
                        color="primary"
                        sx={{
                          mt: 2,
                          marginRight: 1,
                          borderColor: "rgb(81,1,2)",
                          color: "rgb(81,1,2)",
                          "&:hover": {
                            borderColor: "rgb(81,1,2)",
                            backgroundColor: "rgba(81,1,2, 0.1)",
                          },
                        }}
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                      <Button
                        onClick={() => handleDownload(upload.filepath)}
                        variant="outlined"
                        color="primary"
                        sx={{
                          mt: 2,
                          borderColor: "rgb(81,1,2)",
                          color: "rgb(81,1,2)",
                          "&:hover": {
                            borderColor: "rgb(81,1,2)",
                            backgroundColor: "rgba(81,1,2, 0.1)",
                          },
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(upload._id)}
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 2,
                          marginLeft: 1,
                          backgroundColor: "rgb(81,1,2)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(81,1,2, 0.1)",
                            color: "black",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2">
                          Address: {upload.address}
                        </Typography>
                        <Typography variant="body2">
                          District: {upload.district}
                        </Typography>
                        <Typography variant="body2">
                          City: {upload.city}
                        </Typography>
                        <Typography variant="body2">
                          Contact No: {upload.contactNo}
                        </Typography>
                        <Typography variant="body2">
                          Distance: {upload.distanceFromHome}
                        </Typography>
                        <Typography variant="body2">
                          Email: {upload.email}
                        </Typography>
                        <Typography variant="body2">
                          Year: {upload.year}
                        </Typography>
                        <Typography variant="body2">
                          Faculty: {upload.faculty}
                        </Typography>
                        <Typography variant="body2">
                          Department: {upload.department}
                        </Typography>
                        <Typography variant="body2">
                          Income: {upload.income}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleApprove(upload._id)}
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleReject(upload._id)}
                          >
                            Reject
                          </Button>
                        </Box>
                      </Box>
                      {upload.photoPath && (
                        <Box sx={{ ml: 2, mr: 2 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Photo:
                          </Typography>
                          <Avatar
                            src={`http://localhost:4000/${upload.photoPath}`}
                            alt="Applicant Photo"
                            sx={{ width: 150, height: 150 }}
                            variant="rounded"
                          />
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;*/

/*2025.04.21
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [duplicateRegNos, setDuplicateRegNos] = useState([]); // To store duplicate regNos

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();

        // Find duplicate regNos
        const regNoCount = data.reduce((acc, upload) => {
          acc[upload.regNo] = (acc[upload.regNo] || 0) + 1;
          return acc;
        }, {});

        const duplicates = Object.keys(regNoCount).filter(
          (regNo) => regNoCount[regNo] > 1
        );

        setUploads(data);
        setDuplicateRegNos(duplicates); // Set duplicates
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (filepath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${filepath}`;
    link.download = filepath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      if (!response.ok) throw new Error("Failed to approve application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "accepted" } : upload
        )
      );
      setSnackbarMessage("Application approved successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to approve application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      if (!response.ok) throw new Error("Failed to reject application");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: "rejected" } : upload
        )
      );
      setSnackbarMessage("Application rejected successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to reject application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUploadId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${selectedUploadId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete application");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== selectedUploadId)
      );
      setSnackbarMessage("Application deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to delete application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUploadId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredUploads = uploads.filter((upload) => {
    if (statusFilter === "All") return true;
    return upload.status === statusFilter.toLowerCase();
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: "2rem",
          color: "#333",
          letterSpacing: "0.5px",
          lineHeight: 1.3,
          marginBottom: "1.5rem",
        }}
      >
        Submitted Applications
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <Card variant="outlined" sx={{ mb: 0 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1" display="inline">
                        Reg. No: {upload.regNo} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Name: {upload.name} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Status: {upload.status}
                      </Typography>
                    </Box>
                    <Box>
                      {duplicateRegNos.includes(upload.regNo) && (
                        <Typography
                          variant="body2"
                          color="error"
                          fontWeight="bold"
                        >
                          Duplicate Registration Number!
                        </Typography>
                      )}
                      <Button
                        onClick={() => toggleExpand(upload._id)}
                        variant="outlined"
                        color="primary"
                        sx={{
                          mt: 2,
                          marginRight: 1,
                          borderColor: "rgb(81,1,2)",
                          color: "rgb(81,1,2)",
                          "&:hover": {
                            borderColor: "rgb(81,1,2)",
                            backgroundColor: "rgba(81,1,2, 0.1)",
                          },
                        }}
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                      <Button
                        onClick={() => handleDownload(upload.filepath)}
                        variant="outlined"
                        color="primary"
                        sx={{
                          mt: 2,
                          borderColor: "rgb(81,1,2)",
                          color: "rgb(81,1,2)",
                          "&:hover": {
                            borderColor: "rgb(81,1,2)",
                            backgroundColor: "rgba(81,1,2, 0.1)",
                          },
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(upload._id)}
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 2,
                          marginLeft: 1,
                          backgroundColor: "rgb(81,1,2)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(81,1,2, 0.1)",
                            color: "black",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2">
                          Address: {upload.address}
                        </Typography>
                        <Typography variant="body2">
                          District: {upload.district}
                        </Typography>
                        <Typography variant="body2">
                          City: {upload.city}
                        </Typography>
                        <Typography variant="body2">
                          Contact No: {upload.contactNo}
                        </Typography>
                        <Typography variant="body2">
                          Distance: {upload.distanceFromHome}
                        </Typography>
                        <Typography variant="body2">
                          Email: {upload.email}
                        </Typography>
                        <Typography variant="body2">
                          Year: {upload.year}
                        </Typography>
                        <Typography variant="body2">
                          Faculty: {upload.faculty}
                        </Typography>
                        <Typography variant="body2">
                          Department: {upload.department}
                        </Typography>
                        <Typography variant="body2">
                          Income: {upload.income}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleApprove(upload._id)}
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleReject(upload._id)}
                          >
                            Reject
                          </Button>
                        </Box>
                      </Box>
                      {upload.photoPath && (
                        <Box sx={{ ml: 2, mr: 2 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Photo:
                          </Typography>
                          <Avatar
                            src={`http://localhost:4000/${upload.photoPath}`}
                            alt="Applicant Photo"
                            sx={{ width: 150, height: 150 }}
                            variant="rounded"
                          />
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;*/

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  Paper,
  Divider,
  IconButton,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Download,
  Delete,
  CheckCircle,
  Cancel,
  Visibility,
  Person,
  Home,
  Phone,
  Email,
  School,
  AttachMoney,
  Warning,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  textTransform: "capitalize",
  ...(status === "pending" && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  }),
  ...(status === "accepted" && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  ...(status === "rejected" && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
}));

const DetailItem = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <Box sx={{ mr: 2, color: "text.secondary" }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value || "N/A"}</Typography>
    </Box>
  </Box>
);

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [duplicateRegNos, setDuplicateRegNos] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();

        const regNoCount = data.reduce((acc, upload) => {
          acc[upload.regNo] = (acc[upload.regNo] || 0) + 1;
          return acc;
        }, {});

        const duplicates = Object.keys(regNoCount).filter(
          (regNo) => regNoCount[regNo] > 1
        );

        setUploads(data);
        setDuplicateRegNos(duplicates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (filepath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${filepath}`;
    link.download = filepath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) throw new Error(`Failed to ${status} application`);

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status } : upload
        )
      );

      setSnackbarMessage(`Application ${status} successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage(`Failed to ${status} application.`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUploadId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/hostelApply/hostelApplies/${selectedUploadId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete application");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== selectedUploadId)
      );
      setSnackbarMessage("Application deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Failed to delete application.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const filteredUploads = uploads.filter((upload) => {
    if (statusFilter === "All") return true;
    return upload.status === statusFilter.toLowerCase();
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", p: 0 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 0,
          color: "text.primary",
          display: "flex",
          alignItems: "center",
        }}
      >
        Hostel Applications
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Filter by Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter by Status"
            sx={{ backgroundColor: "background.paper" }}
          >
            <MenuItem value="All">All Applications</MenuItem>
            <MenuItem value="Accepted">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Pending">Pending Review</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : (
        <Grid container spacing={0}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <Card elevation={3}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mr: 2 }}
                        >
                          {upload.name}
                        </Typography>
                        <StatusChip
                          label={upload.status}
                          status={upload.status}
                          size="small"
                        />
                        {duplicateRegNos.includes(upload.regNo) && (
                          <Tooltip title="Duplicate registration number">
                            <Warning color="error" sx={{ ml: 1 }} />
                          </Tooltip>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {upload.regNo} • {upload.faculty} • {upload.year} Year
                      </Typography>
                    </Box>
                    <Box>
                      <Tooltip
                        title={
                          expandedId === upload._id
                            ? "Collapse"
                            : "View details"
                        }
                      >
                        <IconButton
                          onClick={() => toggleExpand(upload._id)}
                          sx={{
                            transform:
                              expandedId === upload._id
                                ? "rotate(180deg)"
                                : "rotate(0)",
                            transition: "transform 0.3s",
                          }}
                        >
                          {expandedId === upload._id ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>

                <Collapse
                  in={expandedId === upload._id}
                  timeout="auto"
                  unmountOnExit
                >
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={0}
                          sx={{ p: 2, backgroundColor: "background.default" }}
                        >
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                          >
                            Personal Information
                          </Typography>
                          <DetailItem
                            icon={<Person fontSize="small" />}
                            label="Full Name"
                            value={upload.name}
                          />
                          <DetailItem
                            icon={<Email fontSize="small" />}
                            label="Email"
                            value={upload.email}
                          />
                          <DetailItem
                            icon={<Phone fontSize="small" />}
                            label="Contact Number"
                            value={upload.contactNo}
                          />
                          <DetailItem
                            icon={<Home fontSize="small" />}
                            label="Address"
                            value={`${upload.address}, ${upload.city}, ${upload.district}`}
                          />
                          <DetailItem
                            icon={<AttachMoney fontSize="small" />}
                            label="Family Income (LKR)"
                            value={upload.income}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={0}
                          sx={{ p: 2, backgroundColor: "background.default" }}
                        >
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                          >
                            Academic Information
                          </Typography>
                          <DetailItem
                            icon={<School fontSize="small" />}
                            label="Registration No"
                            value={upload.regNo}
                          />
                          <DetailItem
                            icon={<School fontSize="small" />}
                            label="Year of Study"
                            value={upload.year}
                          />
                          <DetailItem
                            icon={<School fontSize="small" />}
                            label="Faculty"
                            value={upload.faculty}
                          />
                          <DetailItem
                            icon={<School fontSize="small" />}
                            label="Department"
                            value={upload.department}
                          />

                          <DetailItem
                            icon={<School fontSize="small" />}
                            label="Distance from Home (km)"
                            value={upload.distance}
                          />
                        </Paper>
                      </Grid>
                    </Grid>

                    {upload.photoPath && (
                      <Box
                        sx={{
                          mt: 3,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          src={`http://localhost:4000/${upload.photoPath}`}
                          alt="Applicant Photo"
                          sx={{ width: 150, height: 150, borderRadius: 2 }}
                          variant="rounded"
                        />
                      </Box>
                    )}

                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<Download />}
                          onClick={() => handleDownload(upload.filepath)}
                          sx={{ mr: 1, mb: 1 }}
                        >
                          Download Documents
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteClick(upload._id)}
                          sx={{ mb: 1 }}
                        >
                          Delete Application
                        </Button>
                      </Box>
                      <Box>
                        {upload.status === "pending" && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              startIcon={<CheckCircle />}
                              onClick={() =>
                                handleStatusChange(upload._id, "accepted")
                              }
                              sx={{ mr: 1, mb: 1 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<Cancel />}
                              onClick={() =>
                                handleStatusChange(upload._id, "rejected")
                              }
                              sx={{ mb: 1 }}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {upload.status === "accepted" && (
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() =>
                              handleStatusChange(upload._id, "rejected")
                            }
                            sx={{ mb: 1 }}
                          >
                            Revoke Approval
                          </Button>
                        )}
                        {upload.status === "rejected" && (
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<CheckCircle />}
                            onClick={() =>
                              handleStatusChange(upload._id, "accepted")
                            }
                            sx={{ mb: 1 }}
                          >
                            Reconsider
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to permanently delete this application? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          elevation={6}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;
