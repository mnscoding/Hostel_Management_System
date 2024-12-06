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

      {/* Dialog for Editing Student */}
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

export default TestUploads;
