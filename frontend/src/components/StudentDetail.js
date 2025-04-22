/*import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
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

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      // Update local state
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? currentStudent : upload
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Students
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
                        onClick={() => handleEditClick(upload)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Last Registered Year: {upload.registeringYear}
                    </Typography>
                    <Typography variant="body2">
                      Hostel: {upload.hostel}
                    </Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">
                      Parent Contact No: {upload.parentNo}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={currentStudent.name}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Registration No"
                fullWidth
                value={currentStudent.regNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    regNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Gender"
                fullWidth
                value={currentStudent.gender}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    gender: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Registering Year"
                fullWidth
                value={currentStudent.registeringYear}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    registeringYear: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Hostel"
                fullWidth
                value={currentStudent.hostel}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    hostel: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Faculty"
                fullWidth
                value={currentStudent.faculty}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    faculty: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Department"
                fullWidth
                value={currentStudent.department}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    department: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={currentStudent.address}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Contact No"
                fullWidth
                value={currentStudent.contactNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    contactNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={currentStudent.email}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Parent Contact No"
                fullWidth
                value={currentStudent.parentNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    parentNo: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

////////////////////////////2222222222222222222////////////////////////
/*
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
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

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery)
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? currentStudent : upload
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Students
        </Typography>

        {// Search Box in the top right corner }
        <TextField
          variant="outlined"
          placeholder="Search by name or reg no...."
          size="small" // Smaller size
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "250px" }} // Adjust width as needed
        />
      </Box>

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
                        onClick={() => handleEditClick(upload)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Last Registered Year: {upload.registeringYear}
                    </Typography>
                    <Typography variant="body2">
                      Hostel: {upload.hostel}
                    </Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">
                      Parent Contact No: {upload.parentNo}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {// Dialog for Editing Student }
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={currentStudent.name}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Registration No"
                fullWidth
                value={currentStudent.regNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    regNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Gender"
                fullWidth
                value={currentStudent.gender}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    gender: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Registering Year"
                fullWidth
                value={currentStudent.registeringYear}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    registeringYear: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Hostel"
                fullWidth
                value={currentStudent.hostel}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    hostel: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Faculty"
                fullWidth
                value={currentStudent.faculty}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    faculty: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Department"
                fullWidth
                value={currentStudent.department}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    department: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={currentStudent.address}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Contact No"
                fullWidth
                value={currentStudent.contactNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    contactNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={currentStudent.email}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Parent Contact No"
                fullWidth
                value={currentStudent.parentNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    parentNo: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/
/*import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
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

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery)
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? currentStudent : upload
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== studentId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Students
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by name or reg no...."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "250px" }}
        />
      </Box>

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
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleDelete(upload._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(upload)}>
                        <EditIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={() => toggleExpand(upload._id)}
                        sx={{ ml: 1 }} // Add margin to the left for spacing
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Last Registered Year: {upload.registeringYear}
                    </Typography>
                    <Typography variant="body2">
                      Hostel: {upload.hostel}
                    </Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">
                      Parent Contact No: {upload.parentNo}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {// Dialog for Editing Student }
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={currentStudent.name}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Registration No"
                fullWidth
                value={currentStudent.regNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    regNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Gender"
                fullWidth
                value={currentStudent.gender}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    gender: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Registering Year"
                fullWidth
                value={currentStudent.registeringYear}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    registeringYear: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Hostel"
                fullWidth
                value={currentStudent.hostel}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    hostel: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Faculty"
                fullWidth
                value={currentStudent.faculty}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    faculty: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Department"
                fullWidth
                value={currentStudent.department}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    department: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={currentStudent.address}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Contact No"
                fullWidth
                value={currentStudent.contactNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    contactNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={currentStudent.email}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Parent Contact No"
                fullWidth
                value={currentStudent.parentNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    parentNo: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

/*2025
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
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

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery)
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? currentStudent : upload
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== studentId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Students
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by name or reg no...."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "250px" }}
        />
      </Box>

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
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleDelete(upload._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(upload)}>
                        <EditIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={() => toggleExpand(upload._id)}
                        sx={{ ml: 1 }} // Add margin to the left for spacing
                      >
                        {expandedId === upload._id ? "Show Less" : "View"}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                {expandedId === upload._id && (
                  <CardContent>
                    <Typography variant="body2">
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Last Registered Year: {upload.registeringYear}
                    </Typography>
                    <Typography variant="body2">
                      Hostel: {upload.hostel}
                    </Typography>
                    <Typography variant="body2">
                      Faculty: {upload.faculty}
                    </Typography>
                    <Typography variant="body2">
                      Department: {upload.department}
                    </Typography>
                    <Typography variant="body2">
                      Address: {upload.address}
                    </Typography>
                    <Typography variant="body2">
                      Contact No: {upload.contactNo}
                    </Typography>
                    <Typography variant="body2">
                      Email: {upload.email}
                    </Typography>
                    <Typography variant="body2">
                      Parent Contact No: {upload.parentNo}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={currentStudent.name}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Registration No"
                fullWidth
                value={currentStudent.regNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    regNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Gender"
                fullWidth
                value={currentStudent.gender}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    gender: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Registering Year"
                fullWidth
                value={currentStudent.registeringYear}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    registeringYear: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Hostel"
                fullWidth
                value={currentStudent.hostel}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    hostel: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Faculty"
                fullWidth
                value={currentStudent.faculty}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    faculty: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Department"
                fullWidth
                value={currentStudent.department}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    department: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={currentStudent.address}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Contact No"
                fullWidth
                value={currentStudent.contactNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    contactNo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={currentStudent.email}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Parent Contact No"
                fullWidth
                value={currentStudent.parentNo}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    parentNo: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

/*02.04
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import colors from "../config/colors";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
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

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery)
  );

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? currentStudent : upload
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== studentId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewDetails = (student) => {
    setCurrentStudent(student);
    setOpenDetailView(true);
  };

  const handleCloseDetailView = () => {
    setOpenDetailView(false);
    setCurrentStudent(null);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600, // Bold but not too heavy
            fontSize: "2rem", // Slightly larger font for prominence
            color: "#333", // Dark color for better readability
            letterSpacing: "0.5px", // Subtle letter spacing for a cleaner appearance
            lineHeight: 1.3, // Adjusted line height for better spacing
            marginBottom: "1.5rem",
            mt: 0, // Spacing below the title
          }}
        >
          Students
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search by name or reg no..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "250px",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary,
                borderWidth: "3px",
              },
              "&:hover fieldset": {
                borderColor: "darkred",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary,
                borderWidth: "3px",
              },
            },
            "& input": {
              color: "black",
            },
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    mb: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    display: "flex",
                    background: "linear-gradient(145deg, #f3f4f6, #e5e7eb)",
                    borderLeft: "20px solid #6e2026",
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body1">
                        <b>Reg. No:</b> {upload.regNo} &nbsp; <b>Name:</b>{" "}
                        {upload.name}
                      </Typography>
                      <Box>
                        <IconButton onClick={() => handleDelete(upload._id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEditClick(upload)}>
                          <EditIcon />
                        </IconButton>
                        <Button
                          variant="outlined"
                          style={{
                            borderColor: colors.primary,
                            color: colors.secondary,
                          }}
                          onClick={() => handleViewDetails(upload)}
                          sx={{ ml: 1 }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box
              component="table"
              sx={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                {[
                  {
                    label: "Name",
                    value: "name",
                  },
                  { label: "Registration No", value: "regNo" },
                  { label: "Gender", value: "gender" },
                  { label: "Registering Year", value: "registeringYear" },
                  { label: "Hostel", value: "hostel" },
                  { label: "Faculty", value: "faculty" },
                  { label: "Department", value: "department" },
                  { label: "Address", value: "address" },
                  { label: "Contact No", value: "contactNo" },
                  { label: "Email", value: "email" },
                  { label: "Parent Contact No", value: "parentNo" },
                ].map(({ label, value }) => (
                  <tr key={value}>
                    <td
                      style={{
                        padding: "8px",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {label}:
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <TextField
                        fullWidth
                        value={currentStudent[value]}
                        onChange={(e) =>
                          setCurrentStudent({
                            ...currentStudent,
                            [value]: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={openDetailView}
        onClose={handleCloseDetailView}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Full Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box sx={{ overflowY: "auto", height: "400px" }}>
              <Typography variant="h6">
                Reg. No: {currentStudent.regNo}
              </Typography>
              <Typography variant="body1">
                <b>Name:</b> {currentStudent.name}
              </Typography>
              <Typography variant="body1">
                <b>Gender:</b> {currentStudent.gender}
              </Typography>
              <Typography variant="body1">
                <b>Hostel:</b> {currentStudent.hostel}
              </Typography>
              <Typography variant="body1">
                <b>Faculty:</b> {currentStudent.faculty}
              </Typography>
              <Typography variant="body1">
                <b>Department:</b> {currentStudent.department}
              </Typography>
              <Typography variant="body1">
                <b>Contact No:</b> {currentStudent.contactNo}
              </Typography>
              <Typography variant="body1">
                <b>Email:</b> {currentStudent.email}
              </Typography>
              <Typography variant="body1">
                <b>Parent Contact No:</b> {currentStudent.parentNo}
              </Typography>
              <Typography variant="body1">
                <b>Address:</b> {currentStudent.address}
              </Typography>
              <Typography variant="body1">
                <b>Registering Year:</b> Year {currentStudent.registeringYear}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

/*02.11
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../config/colors";

// Icons for details
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkIcon from "@mui/icons-material/Work";
import WcIcon from "@mui/icons-material/Wc";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery)
  );

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? currentStudent : upload
        )
      );

      handleCloseDialog();
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== studentId)
      );
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleViewDetails = (student) => {
    setCurrentStudent(student);
    setOpenDetailView(true);
  };

  const handleCloseDetailView = () => {
    setOpenDetailView(false);
    setCurrentStudent(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: "2rem",
            color: "#333",
            letterSpacing: "0.5px",
            lineHeight: 1.3,
            marginBottom: "1.5rem",
          }}
        >
          Students
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search by name or reg no..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "250px",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary,
                borderWidth: "3px",
              },
              "&:hover fieldset": {
                borderColor: "darkred",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary,
                borderWidth: "3px",
              },
            },
            "& input": {
              color: "black",
            },
          }}
        />
      </Box>

      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <AnimatePresence>
            {filteredUploads.map((upload) => (
              <Grid item xs={12} key={upload._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      background: "linear-gradient(145deg, #f3f4f6, #e5e7eb)",
                      borderLeft: "10px solid #6e2026",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body1">
                          <b>Reg. No:</b> {upload.regNo} &nbsp; <b>Name:</b>{" "}
                          {upload.name}
                        </Typography>
                        <Box>
                          <IconButton
                            onClick={() => handleDelete(upload._id)}
                            sx={{ color: colors.primary }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditClick(upload)}
                            sx={{ color: colors.primary }}
                          >
                            <EditIcon />
                          </IconButton>
                          <Button
                            variant="outlined"
                            style={{
                              borderColor: colors.primary,
                              color: colors.secondary,
                            }}
                            onClick={() => handleViewDetails(upload)}
                            sx={{ ml: 1 }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box
              component="table"
              sx={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                {[
                  { label: "Name", value: "name", icon: <PersonIcon /> },
                  {
                    label: "Registration No",
                    value: "regNo",
                    icon: <SchoolIcon />,
                  },
                  { label: "Gender", value: "gender", icon: <PersonIcon /> },
                  {
                    label: "Registering Year",
                    value: "registeringYear",
                    icon: <DateRangeIcon />,
                  },
                  { label: "Hostel", value: "hostel", icon: <HotelIcon /> },
                  {
                    label: "Faculty",
                    value: "faculty",
                    icon: <AccountBalanceIcon />,
                  },
                  {
                    label: "Department",
                    value: "department",
                    icon: <SchoolIcon />,
                  },
                  {
                    label: "Address",
                    value: "address",
                    icon: <LocationOnIcon />,
                  },
                  {
                    label: "Contact No",
                    value: "contactNo",
                    icon: <PhoneIcon />,
                  },
                  { label: "Email", value: "email", icon: <EmailIcon /> },
                  {
                    label: "Parent Contact No",
                    value: "parentNo",
                    icon: <PhoneIcon />,
                  },
                ].map(({ label, value, icon }) => (
                  <tr key={value}>
                    <td
                      style={{
                        padding: "8px",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>} {label}:
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <TextField
                        fullWidth
                        value={currentStudent[value]}
                        onChange={(e) =>
                          setCurrentStudent({
                            ...currentStudent,
                            [value]: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={openDetailView}
        onClose={handleCloseDetailView}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Full Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box sx={{ overflowY: "auto", height: "400px" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reg. No: {currentStudent.regNo}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {[
                  {
                    label: "Name",
                    value: currentStudent.name,
                    icon: <PersonIcon />,
                  },
                  {
                    label: "Gender",
                    value: currentStudent.gender,
                    icon: <WcIcon />,
                  },
                  {
                    label: "Hostel",
                    value: currentStudent.hostel,
                    icon: <HotelIcon />,
                  },
                  {
                    label: "Faculty",
                    value: currentStudent.faculty,
                    icon: <AccountBalanceIcon />,
                  },
                  {
                    label: "Department",
                    value: currentStudent.department,
                    icon: <SchoolIcon />,
                  },
                  {
                    label: "Contact No",
                    value: currentStudent.contactNo,
                    icon: <PhoneIcon />,
                  },
                  {
                    label: "Email",
                    value: currentStudent.email,
                    icon: <EmailIcon />,
                  },
                  {
                    label: "Parent Contact No",
                    value: currentStudent.parentNo,
                    icon: <PhoneIcon />,
                  },
                  {
                    label: "Address",
                    value: currentStudent.address,
                    icon: <LocationOnIcon />,
                  },
                  {
                    label: "Registering Year",
                    value: `Year ${currentStudent.registeringYear}`,
                    icon: <DateRangeIcon />,
                  },
                ].map(({ label, value, icon }) => (
                  <Box key={label}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>} {label}:
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "Operation successful!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;*/

/*2025.04.22
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../config/colors";

// Icons for details
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkIcon from "@mui/icons-material/Work";
import WcIcon from "@mui/icons-material/Wc";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery)
  );

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  //04.22
  //const handleUpdate = async () => {
    //try {
      //const response = await fetch(
        //`http://localhost:3000/api/students/${currentStudent._id}`,
        //{
          //method: "PATCH",
          //headers: {
            //"Content-Type": "application/json",
          //},
          //body: JSON.stringify(currentStudent),
        //}
      //);

      //if (!response.ok) throw new Error("Failed to update student");

      //setUploads((prevUploads) =>
        //prevUploads.map((upload) =>
          //upload._id === currentStudent._id ? currentStudent : upload
        //)
      //);

      //handleCloseDialog();
      //setSnackbarOpen(true);
    //} catch (err) {
      //setError(err.message);
      //setSnackbarOpen(true);
    //}
  //};
  const handleUpdate = async () => {
    try {
      // First, update the student record
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      const updatedStudent = await response.json();

      // Update the local state
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? updatedStudent : upload
        )
      );

      handleCloseDialog();
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== studentId)
      );
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleViewDetails = (student) => {
    setCurrentStudent(student);
    setOpenDetailView(true);
  };

  const handleCloseDetailView = () => {
    setOpenDetailView(false);
    setCurrentStudent(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: "2rem",
            color: "#333",
            letterSpacing: "0.5px",
            lineHeight: 1.3,
            marginBottom: "1.5rem",
          }}
        >
          Students
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search by name or reg no..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "250px",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary,
                borderWidth: "3px",
              },
              "&:hover fieldset": {
                borderColor: "darkred",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary,
                borderWidth: "3px",
              },
            },
            "& input": {
              color: "black",
            },
          }}
        />
      </Box>

      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <AnimatePresence>
            {filteredUploads.map((upload) => (
              <Grid item xs={12} key={upload._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      background: "linear-gradient(145deg, #f3f4f6, #e5e7eb)",
                      borderLeft: "10px solid #6e2026",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body1">
                          <b>Reg. No:</b> {upload.regNo} &nbsp; <b>Name:</b>{" "}
                          {upload.name}
                        </Typography>
                        <Box>
                          <IconButton
                            onClick={() => handleDelete(upload._id)}
                            sx={{ color: colors.primary }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditClick(upload)}
                            sx={{ color: colors.primary }}
                          >
                            <EditIcon />
                          </IconButton>
                          <Button
                            variant="outlined"
                            style={{
                              borderColor: colors.primary,
                              color: colors.secondary,
                            }}
                            onClick={() => handleViewDetails(upload)}
                            sx={{ ml: 1 }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      //Dialog for Editing Student 
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box
              component="table"
              sx={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                {[
                  { label: "Name", value: "name", icon: <PersonIcon /> },
                  {
                    label: "Registration No",
                    value: "regNo",
                    icon: <SchoolIcon />,
                  },
                  { label: "Gender", value: "gender", icon: <PersonIcon /> },
                  {
                    label: "Registering Year",
                    value: "registeringYear",
                    icon: <DateRangeIcon />,
                  },
                  { label: "Hostel", value: "hostel", icon: <HotelIcon /> },
                  {
                    label: "Faculty",
                    value: "faculty",
                    icon: <AccountBalanceIcon />,
                  },
                  {
                    label: "Department",
                    value: "department",
                    icon: <SchoolIcon />,
                  },
                  {
                    label: "Address",
                    value: "address",
                    icon: <LocationOnIcon />,
                  },
                  {
                    label: "Contact No",
                    value: "contactNo",
                    icon: <PhoneIcon />,
                  },
                  { label: "Email", value: "email", icon: <EmailIcon /> },
                  {
                    label: "Parent Contact No",
                    value: "parentNo",
                    icon: <PhoneIcon />,
                  },
                ].map(({ label, value, icon }) => (
                  <tr key={value}>
                    <td
                      style={{
                        padding: "8px",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>} {label}:
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <TextField
                        fullWidth
                        value={currentStudent[value]}
                        onChange={(e) =>
                          setCurrentStudent({
                            ...currentStudent,
                            [value]: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      //Modal for Viewing Full Details 
      <Dialog
        open={openDetailView}
        onClose={handleCloseDetailView}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Full Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box
              sx={{ overflowY: "auto", height: "400px", position: "relative" }}
            >
              //Image Section 
              {currentStudent.image && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: 3,
                  }}
                >
                  <img
                    src={`http://localhost:3000/${currentStudent.image}`} // Adjust the path as needed
                    alt="Student"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              //Student Details Section 
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reg. No: {currentStudent.regNo}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {[
                  {
                    label: "Name",
                    value: currentStudent.name,
                    icon: <PersonIcon />,
                  },
                  {
                    label: "Gender",
                    value: currentStudent.gender,
                    icon: <WcIcon />,
                  },
                  {
                    label: "Hostel",
                    value: currentStudent.hostel,
                    icon: <HotelIcon />,
                  },
                  {
                    label: "Faculty",
                    value: currentStudent.faculty,
                    icon: <AccountBalanceIcon />,
                  },
                  {
                    label: "Department",
                    value: currentStudent.department,
                    icon: <SchoolIcon />,
                  },
                  {
                    label: "Contact No",
                    value: currentStudent.contactNo,
                    icon: <PhoneIcon />,
                  },
                  {
                    label: "Email",
                    value: currentStudent.email,
                    icon: <EmailIcon />,
                  },
                  {
                    label: "Parent Contact No",
                    value: currentStudent.parentNo,
                    icon: <PhoneIcon />,
                  },
                  {
                    label: "Address",
                    value: currentStudent.address,
                    icon: <LocationOnIcon />,
                  },
                  {
                    label: "Registering Year",
                    value: `Year ${currentStudent.registeringYear}`,
                    icon: <DateRangeIcon />,
                  },
                ].map(({ label, value, icon }) => (
                  <Box key={label}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>} {label}:
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      //Snackbar for error/success messages 
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "Operation successful!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;*/

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Skeleton,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../config/colors";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WcIcon from "@mui/icons-material/Wc";
import FilterListIcon from "@mui/icons-material/FilterList";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [hostelFilter, setHostelFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch students
        const studentsResponse = await fetch(
          "http://localhost:3000/api/students"
        );
        if (!studentsResponse.ok) throw new Error("Failed to fetch students");
        const studentsData = await studentsResponse.json();
        setUploads(studentsData);

        // Fetch hostels
        const hostelsResponse = await fetch(
          "http://localhost:3000/api/hostels"
        );
        if (!hostelsResponse.ok) throw new Error("Failed to fetch hostels");
        const hostelsData = await hostelsResponse.json();
        setHostels(hostelsData);
      } catch (err) {
        setError(err.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUploads = uploads.filter((upload) => {
    const matchesSearch =
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.regNo.includes(searchQuery);

    const matchesHostel =
      hostelFilter === "all" || upload.hostel === hostelFilter;

    return matchesSearch && matchesHostel;
  });

  // Count students per hostel
  const countStudentsByHostel = () => {
    const counts = {};
    uploads.forEach((student) => {
      counts[student.hostel] = (counts[student.hostel] || 0) + 1;
    });
    return counts;
  };

  const hostelCounts = countStudentsByHostel();

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStudent),
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      const updatedStudent = await response.json();

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === currentStudent._id ? updatedStudent : upload
        )
      );

      handleCloseDialog();
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== studentId)
      );
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleViewDetails = (student) => {
    setCurrentStudent(student);
    setOpenDetailView(true);
  };

  const handleCloseDetailView = () => {
    setOpenDetailView(false);
    setCurrentStudent(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: "2rem",
            color: "#333",
            letterSpacing: "0.5px",
            lineHeight: 1.3,
            marginBottom: "1.5rem",
          }}
        >
          Students
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel id="hostel-filter-label">
              <Box display="flex" alignItems="center">
                <FilterListIcon sx={{ mr: 1 }} />
                Filter by Hostel
              </Box>
            </InputLabel>
            <Select
              labelId="hostel-filter-label"
              value={hostelFilter}
              onChange={(e) => setHostelFilter(e.target.value)}
              label="Filter by Hostel"
              sx={{
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
              }}
            >
              <MenuItem value="all">All Hostels</MenuItem>
              {hostels.map((hostel) => (
                <MenuItem key={hostel._id} value={hostel.name}>
                  {hostel.name} ({hostelCounts[hostel.name] || 0})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            placeholder="Search by name or reg no..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "250px",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.primary,
                  borderWidth: "1.5px",
                },
                "&:hover fieldset": {
                  borderColor: "darkred",
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                  borderWidth: "3px",
                },
              },
              "& input": {
                color: "black",
              },
            }}
          />
        </Box>
      </Box>

      {/* Hostel Filter Indicator */}
      {hostelFilter !== "all" && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={`Showing students from: ${hostelFilter}`}
            color="black"
            onDelete={() => setHostelFilter("all")}
            deleteIcon={<FilterListIcon />}
            sx={{ fontWeight: "bold" }}
          />
          <Typography variant="body2" color="text.secondary">
            ({filteredUploads.length} students)
          </Typography>
        </Box>
      )}

      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <AnimatePresence>
            {filteredUploads.map((upload) => (
              <Grid item xs={12} key={upload._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 0,
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      background: "linear-gradient(145deg, #f3f4f6, #e5e7eb)",
                      borderLeft: "10px solid #6e2026",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography variant="body1">
                            <b>Reg. No:</b> {upload.regNo} &nbsp; <b>Name:</b>{" "}
                            {upload.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <HotelIcon fontSize="small" sx={{ mr: 0.5 }} />
                            {upload.hostel}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            onClick={() => handleDelete(upload._id)}
                            sx={{ color: colors.primary }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditClick(upload)}
                            sx={{ color: colors.primary }}
                          >
                            <EditIcon />
                          </IconButton>
                          <Button
                            variant="outlined"
                            style={{
                              borderColor: colors.primary,
                              color: colors.secondary,
                            }}
                            onClick={() => handleViewDetails(upload)}
                            sx={{ ml: 1 }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      {/* Edit Student Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box
              component="table"
              sx={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                {[
                  { label: "Name", value: "name", icon: <PersonIcon /> },
                  {
                    label: "Registration No",
                    value: "regNo",
                    icon: <SchoolIcon />,
                  },
                  { label: "Gender", value: "gender", icon: <PersonIcon /> },
                  {
                    label: "Registering Year",
                    value: "registeringYear",
                    icon: <DateRangeIcon />,
                  },
                  {
                    label: "Hostel",
                    value: "hostel",
                    icon: <HotelIcon />,
                    select: true,
                    options: hostels.map((h) => h.name),
                  },
                  {
                    label: "Faculty",
                    value: "faculty",
                    icon: <AccountBalanceIcon />,
                  },
                  {
                    label: "Department",
                    value: "department",
                    icon: <SchoolIcon />,
                  },
                  {
                    label: "Address",
                    value: "address",
                    icon: <LocationOnIcon />,
                  },
                  {
                    label: "Contact No",
                    value: "contactNo",
                    icon: <PhoneIcon />,
                  },
                  { label: "Email", value: "email", icon: <EmailIcon /> },
                  {
                    label: "Parent Contact No",
                    value: "parentNo",
                    icon: <PhoneIcon />,
                  },
                ].map(({ label, value, icon, select, options }) => (
                  <tr key={value}>
                    <td
                      style={{
                        padding: "8px",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>} {label}:
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {select ? (
                        <FormControl fullWidth size="small">
                          <Select
                            value={currentStudent[value]}
                            onChange={(e) =>
                              setCurrentStudent({
                                ...currentStudent,
                                [value]: e.target.value,
                              })
                            }
                          >
                            {options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          value={currentStudent[value]}
                          onChange={(e) =>
                            setCurrentStudent({
                              ...currentStudent,
                              [value]: e.target.value,
                            })
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student Details Dialog */}
      <Dialog
        open={openDetailView}
        onClose={handleCloseDetailView}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Full Student Details</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <Box
              sx={{ overflowY: "auto", height: "400px", position: "relative" }}
            >
              {currentStudent.image && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: 3,
                  }}
                >
                  <img
                    src={`http://localhost:3000/${currentStudent.image}`}
                    alt="Student"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              <Typography variant="h6" sx={{ mb: 2 }}>
                Reg. No: {currentStudent.regNo}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {[
                  {
                    label: "Name",
                    value: currentStudent.name,
                    icon: <PersonIcon />,
                  },
                  {
                    label: "Gender",
                    value: currentStudent.gender,
                    icon: <WcIcon />,
                  },
                  {
                    label: "Hostel",
                    value: currentStudent.hostel,
                    icon: <HotelIcon />,
                  },
                  {
                    label: "Faculty",
                    value: currentStudent.faculty,
                    icon: <AccountBalanceIcon />,
                  },
                  {
                    label: "Department",
                    value: currentStudent.department,
                    icon: <SchoolIcon />,
                  },
                  {
                    label: "Contact No",
                    value: currentStudent.contactNo,
                    icon: <PhoneIcon />,
                  },
                  {
                    label: "Email",
                    value: currentStudent.email,
                    icon: <EmailIcon />,
                  },
                  {
                    label: "Parent Contact No",
                    value: currentStudent.parentNo,
                    icon: <PhoneIcon />,
                  },
                  {
                    label: "Address",
                    value: currentStudent.address,
                    icon: <LocationOnIcon />,
                  },
                  {
                    label: "Registering Year",
                    value: `Year ${currentStudent.registeringYear}`,
                    icon: <DateRangeIcon />,
                  },
                ].map(({ label, value, icon }) => (
                  <Box key={label}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>} {label}:
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "Operation successful!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestUploads;
