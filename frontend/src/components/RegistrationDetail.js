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
          "http://localhost:3000/api/register/registers"
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

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                      >
                        Assigned to a hostel
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
//2
/*import React, { useEffect, useState } from "react";
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
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set()); // Track assigned students

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      console.log("Student Data:", studentData);

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned
      setAssignedStudents((prev) => new Set(prev).add(id));
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {uploads.map((upload) => (
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) => hostel.gender === upload.gender
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
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
/*2024.10.21
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {uploads.map((upload) => (
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
                      {assignedStudents.has(upload._id) && (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      )}
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) => hostel.gender === upload.gender
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
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
/*import React, { useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function to calculate total students in a hostel
  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {uploads.map((upload) => (
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
                      {assignedStudents.has(upload._id) && (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      )}
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) =>
                                  hostel.gender === upload.gender &&
                                  calculateTotalStudents(
                                    hostel.existingStudents
                                  ) < hostel.maxStudents // Filter out full hostels
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
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
/*import React, { useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function to calculate total students in a hostel
  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {uploads.map((upload) => (
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
                      {assignedStudents.has(upload._id) && (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      )}
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) =>
                                  hostel.gender === upload.gender &&
                                  calculateTotalStudents(
                                    hostel.existingStudents
                                  ) < hostel.maxStudents // Filter out full hostels
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
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
/*import React, { useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned"); // Set default filter to "Not Assigned"

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function to calculate total students in a hostel
  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  // Filter uploads based on selected filter
  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true; // "All" case
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      <FormControl variant="outlined" sx={{ mb: 2, width: "200px" }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
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
                      {assignedStudents.has(upload._id) && (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      )}
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) =>
                                  hostel.gender === upload.gender &&
                                  calculateTotalStudents(
                                    hostel.existingStudents
                                  ) < hostel.maxStudents // Filter out full hostels
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
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
/*11.06
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned"); // Set default filter to "Not Assigned"
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  // Helper function to calculate total students in a hostel
  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  // Filter uploads based on selected filter
  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true; // "All" case
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      <FormControl variant="outlined" sx={{ mb: 2, width: "200px" }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
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
                      {assignedStudents.has(upload._id) && (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      )}
                    </Box>
                    <Box display="flex" alignItems="center">
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "grey", mr: 1 }}
                        onClick={() => openDeleteDialog(upload._id)}
                      />
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) =>
                                  hostel.gender === upload.gender &&
                                  calculateTotalStudents(
                                    hostel.existingStudents
                                  ) < hostel.maxStudents // Filter out full hostels
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                )}
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Downward arrow
import ExpandLessIcon from "@mui/icons-material/ExpandLess"; // Upward arrow

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned"); // Set default filter to "Not Assigned"
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  // Helper function to calculate total students in a hostel
  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  // Filter uploads based on selected filter
  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true; // "All" case
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      <FormControl variant="outlined" sx={{ mb: 2, width: "200px" }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
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
                      {assignedStudents.has(upload._id) && (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      )}
                    </Box>
                    <Box display="flex" alignItems="center">
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "grey", mr: 1 }}
                        onClick={() => openDeleteDialog(upload._id)}
                      />
                      {expandedId === upload._id ? (
                        <ExpandLessIcon
                          sx={{ cursor: "pointer", mr: 1 }}
                          onClick={() => toggleExpand(upload._id)}
                        />
                      ) : (
                        <ExpandMoreIcon
                          sx={{ cursor: "pointer", mr: 1 }}
                          onClick={() => toggleExpand(upload._id)}
                        />
                      )}
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
                      Gender: {upload.gender}
                    </Typography>
                    <Typography variant="body2">
                      Registering Year: {upload.registeringYear}
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

                    <Box sx={{ mt: 2 }}>
                      {assignHostelId === upload._id ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Hostel</InputLabel>
                          <Select
                            value={selectedHostel[upload._id] || ""}
                            onChange={(e) =>
                              setSelectedHostel((prev) => ({
                                ...prev,
                                [upload._id]: e.target.value,
                              }))
                            }
                            label="Hostel"
                          >
                            {hostels
                              .filter(
                                (hostel) =>
                                  hostel.gender === upload.gender &&
                                  calculateTotalStudents(
                                    hostel.existingStudents
                                  ) < hostel.maxStudents // Filter out full hostels
                              )
                              .map((hostel, index) => (
                                <MenuItem
                                  key={index}
                                  value={hostel.name || hostel}
                                >
                                  {hostel.name || hostel}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => handleAssignHostel(upload._id)}
                            sx={{ mt: 1 }}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                          disabled={assignedStudents.has(upload._id)} // Disable if assigned
                        >
                          {assignedStudents.has(upload._id)
                            ? "Assigned"
                            : "Assign to a hostel"}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                )}
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/
/*02.03
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Downward arrow
import ExpandLessIcon from "@mui/icons-material/ExpandLess"; // Upward arrow
import colors from "../config/colors";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned"); // Set default filter to "Not Assigned"
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    // Load assigned students from local storage
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Mark this student as assigned and update local storage
      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });
      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  // Helper function to calculate total students in a hostel
  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  // Filter uploads based on selected filter
  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true; // "All" case
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600, // Bold but not too heavy
          fontSize: "2rem", // Slightly larger font for prominence
          color: "#333", // Dark color for better readability
          letterSpacing: "0.5px", // Subtle letter spacing for a cleaner appearance
          lineHeight: 1.3, // Adjusted line height for better spacing
          marginBottom: "1.5rem", // Spacing below the title
        }}
      >
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black", // Bold outline
              borderWidth: "2px", // Make the border thicker
            },
            "&:hover fieldset": {
              borderColor: "black", // Maintain bold outline on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "black", // Focused state border color
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold", // Bold font for the label
            color: "black", // Optional: Set label color to black
          },
          "& .MuiSelect-root": {
            fontWeight: "bold", // Bold font for the select value
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
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
                    borderLeft: "20px solid #6e2026", // Add red left bar
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body1" display="inline">
                          <b>Reg. No:</b> {upload.regNo} &nbsp;
                        </Typography>
                        <Typography variant="body1" display="inline">
                          <b>Name:</b> {upload.name} &nbsp;
                        </Typography>
                        {assignedStudents.has(upload._id) && (
                          <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center">
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: "grey", mr: 1 }}
                          onClick={() => openDeleteDialog(upload._id)}
                        />
                        {expandedId === upload._id ? (
                          <ExpandLessIcon
                            sx={{ cursor: "pointer", mr: 1 }}
                            onClick={() => toggleExpand(upload._id)}
                          />
                        ) : (
                          <ExpandMoreIcon
                            sx={{ cursor: "pointer", mr: 1 }}
                            onClick={() => toggleExpand(upload._id)}
                          />
                        )}
                        <Button
                          variant="outlined"
                          style={{
                            borderColor: colors.primary,
                            color: colors.secondary,
                          }}
                          sx={{ ml: 1 }}
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
                        Gender: {upload.gender}
                      </Typography>
                      <Typography variant="body2">
                        Registering Year: Year {upload.registeringYear}
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

                      <Box sx={{ mt: 2 }}>
                        {assignHostelId === upload._id ? (
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Hostel</InputLabel>
                            <Select
                              value={selectedHostel[upload._id] || ""}
                              onChange={(e) =>
                                setSelectedHostel((prev) => ({
                                  ...prev,
                                  [upload._id]: e.target.value,
                                }))
                              }
                              label="Hostel"
                            >
                              {hostels
                                .filter(
                                  (hostel) =>
                                    hostel.gender === upload.gender &&
                                    calculateTotalStudents(
                                      hostel.existingStudents
                                    ) < hostel.maxStudents // Filter out full hostels
                                )
                                .map((hostel, index) => (
                                  <MenuItem
                                    key={index}
                                    value={hostel.name || hostel}
                                  >
                                    {hostel.name || hostel}
                                  </MenuItem>
                                ))}
                            </Select>
                            <Button
                              variant="contained"
                              onClick={() => handleAssignHostel(upload._id)}
                              sx={{ mt: 1 }}
                              disabled={assignedStudents.has(upload._id)} // Disable if assigned
                            >
                              {assignedStudents.has(upload._id)
                                ? "Assigned"
                                : "Assign"}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setAssignHostelId(null)}
                              sx={{ mt: 1, ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </FormControl>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => setAssignHostelId(upload._id)}
                            disabled={assignedStudents.has(upload._id)} // Disable if assigned
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign to a hostel"}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import colors from "../config/colors";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels()]);
      setLoading(false);
    };

    fetchData();

    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  //without status
  //const handleAssignHostel = async (id) => {
    //const upload = uploads.find((u) => u._id === id);
    //const studentData = {
      //name: upload.name,
      //regNo: upload.regNo,
      //gender: upload.gender,
      //registeringYear: upload.registeringYear,
      //hostel: selectedHostel[id],
      //faculty: upload.faculty,
      //department: upload.department,
      //address: upload.address,
      //contactNo: upload.contactNo,
      //email: upload.email,
      //parentNo: upload.parentNo,
    //};

    //try {
      //const response = await fetch("http://localhost:3000/api/students", {
        //method: "POST",
        //headers: {
          //"Content-Type": "application/json",
        //},
        //body: JSON.stringify(studentData),
      //});

      //if (!response.ok) throw new Error("Failed to create student");

      //setAssignedStudents((prev) => {
        //const newSet = new Set(prev).add(id);
        //localStorage.setItem(
          //"assignedStudents",
          //JSON.stringify(Array.from(newSet))
        //);
        //return newSet;
      //});
      //setAssignHostelId(null);
      //setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    //} catch (error) {
      //setError(error.message);
    //}
  //};

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      // Assign the student to the hostel
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Update the register's status to 'assigned'
      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }), // Updating the status to "assigned"
        }
      );

      if (!statusResponse.ok) throw new Error("Failed to update status");

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0 }}>
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
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiSelect-root": {
            fontWeight: "bold",
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {upload.regNo}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {upload.name}
                          </Typography>
                        </Box>
                        {assignedStudents.has(upload._id) && (
                          <Chip
                            label="Assigned"
                            color="success"
                            size="small"
                            sx={{ ml: "auto" }}
                          />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => openDeleteDialog(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => toggleExpand(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          {expandedId === upload._id ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                  <Collapse in={expandedId === upload._id}>
                    <CardContent
                      sx={{
                        background: "#f9f9f9",
                        paddingLeft: "72px", // Align with the avatar
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Gender:</b> {upload.gender}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <SchoolIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Faculty:</b> {upload.faculty}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <HomeIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Address:</b> {upload.address}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Contact No:</b> {upload.contactNo}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Email:</b> {upload.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        {assignHostelId === upload._id ? (
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Hostel</InputLabel>
                            <Select
                              value={selectedHostel[upload._id] || ""}
                              onChange={(e) =>
                                setSelectedHostel((prev) => ({
                                  ...prev,
                                  [upload._id]: e.target.value,
                                }))
                              }
                              label="Hostel"
                            >
                              {hostels
                                .filter(
                                  (hostel) =>
                                    hostel.gender === upload.gender &&
                                    calculateTotalStudents(
                                      hostel.existingStudents
                                    ) < hostel.maxStudents
                                )
                                .map((hostel, index) => (
                                  <MenuItem
                                    key={index}
                                    value={hostel.name || hostel}
                                  >
                                    {hostel.name || hostel}
                                  </MenuItem>
                                ))}
                            </Select>
                            <Button
                              variant="contained"
                              onClick={() => handleAssignHostel(upload._id)}
                              sx={{ mt: 1 }}
                              disabled={assignedStudents.has(upload._id)}
                            >
                              {assignedStudents.has(upload._id)
                                ? "Assigned"
                                : "Assign"}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setAssignHostelId(null)}
                              sx={{ mt: 1, ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </FormControl>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => setAssignHostelId(upload._id)}
                            disabled={assignedStudents.has(upload._id)}
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign to Hostel"}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </motion.div>
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  IconButton,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [hostelApplies, setHostelApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostelApplies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch hostel applies");
        const data = await response.json();
        setHostelApplies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels(), fetchHostelApplies()]);
      setLoading(false);
    };

    fetchData();

    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: upload.faculty,
      department: upload.department,
      address: upload.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }),
        }
      );

      if (!statusResponse.ok) throw new Error("Failed to update status");

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const isRegNoMismatched = (upload) => {
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );
    return hostelApply ? hostelApply.regNo !== upload.regNo : false;
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0 }}>
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
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiSelect-root": {
            fontWeight: "bold",
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    backgroundColor: isRegNoMismatched(upload)
                      ? "#ffcccc"
                      : "white", // Highlight mismatched entries
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {upload.regNo}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {upload.name}
                          </Typography>
                        </Box>
                        {assignedStudents.has(upload._id) && (
                          <Chip
                            label="Assigned"
                            color="success"
                            size="small"
                            sx={{ ml: "auto" }}
                          />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => openDeleteDialog(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => toggleExpand(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          {expandedId === upload._id ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                  <Collapse in={expandedId === upload._id}>
                    <CardContent
                      sx={{ background: "#f9f9f9", paddingLeft: "72px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Gender:</b> {upload.gender}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <DateRangeIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Registering Year:</b> Year{" "}
                            {upload.registeringYear}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <SchoolIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Faculty:</b> {upload.faculty}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <HomeIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Address:</b> {upload.address}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Contact No:</b> {upload.contactNo}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Email:</b> {upload.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        {assignHostelId === upload._id ? (
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Hostel</InputLabel>
                            <Select
                              value={selectedHostel[upload._id] || ""}
                              onChange={(e) =>
                                setSelectedHostel((prev) => ({
                                  ...prev,
                                  [upload._id]: e.target.value,
                                }))
                              }
                              label="Hostel"
                            >
                              {hostels
                                .filter(
                                  (hostel) =>
                                    hostel.gender === upload.gender &&
                                    calculateTotalStudents(
                                      hostel.existingStudents
                                    ) < hostel.maxStudents
                                )
                                .map((hostel, index) => (
                                  <MenuItem
                                    key={index}
                                    value={hostel.name || hostel}
                                  >
                                    {hostel.name || hostel}
                                  </MenuItem>
                                ))}
                            </Select>
                            <Button
                              variant="contained"
                              onClick={() => handleAssignHostel(upload._id)}
                              sx={{ mt: 1 }}
                              disabled={assignedStudents.has(upload._id)}
                            >
                              {assignedStudents.has(upload._id)
                                ? "Assigned"
                                : "Assign"}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setAssignHostelId(null)}
                              sx={{ mt: 1, ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </FormControl>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => setAssignHostelId(upload._id)}
                            disabled={assignedStudents.has(upload._id)}
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign to Hostel"}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </motion.div>
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  IconButton,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [hostelApplies, setHostelApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostelApplies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch hostel applies");
        const data = await response.json();
        setHostelApplies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels(), fetchHostelApplies()]);
      setLoading(false);
    };

    fetchData();

    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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


  //commented before 02.23
  /*
  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: hostelApplies.faculty,
      department: hostelApplies.department,
      address: hostelApplies.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }),
        }
      );

      if (!statusResponse.ok) throw new Error("Failed to update status");

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };*/

//commented before 02.23 ended from above

/*
  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );

    if (!hostelApply) {
      setError("No matching hostel application found for this student.");
      return;
    }

    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: hostelApply.faculty,
      department: hostelApply.department,
      address: hostelApply.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
      image: hostelApply.photoPath,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create student");
      }

      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }),
        }
      );

      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
      console.error("Error assigning hostel:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const isRegNoMismatched = (upload) => {
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );
    return hostelApply ? hostelApply.regNo !== upload.regNo : false;
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0 }}>
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
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiSelect-root": {
            fontWeight: "bold",
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    backgroundColor: isRegNoMismatched(upload)
                      ? "#ffcccc"
                      : "white", // Highlight mismatched entries
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {upload.regNo}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {upload.name}
                          </Typography>
                        </Box>
                        {assignedStudents.has(upload._id) && (
                          <Chip
                            label="Assigned"
                            color="success"
                            size="small"
                            sx={{ ml: "auto" }}
                          />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => openDeleteDialog(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => toggleExpand(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          {expandedId === upload._id ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                  <Collapse in={expandedId === upload._id}>
                    <CardContent
                      sx={{ background: "#f9f9f9", paddingLeft: "72px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Gender:</b> {upload.gender}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <DateRangeIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Registering Year:</b> Year{" "}
                            {upload.registeringYear}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Contact No:</b> {upload.contactNo}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Email:</b> {upload.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        {assignHostelId === upload._id ? (
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Hostel</InputLabel>
                            <Select
                              value={selectedHostel[upload._id] || ""}
                              onChange={(e) =>
                                setSelectedHostel((prev) => ({
                                  ...prev,
                                  [upload._id]: e.target.value,
                                }))
                              }
                              label="Hostel"
                            >
                              {hostels
                                .filter(
                                  (hostel) =>
                                    hostel.gender === upload.gender &&
                                    calculateTotalStudents(
                                      hostel.existingStudents
                                    ) < hostel.maxStudents
                                )
                                .map((hostel, index) => (
                                  <MenuItem
                                    key={index}
                                    value={hostel.name || hostel}
                                  >
                                    {hostel.name || hostel}
                                  </MenuItem>
                                ))}
                            </Select>
                            <Button
                              variant="contained"
                              onClick={() => handleAssignHostel(upload._id)}
                              sx={{ mt: 1 }}
                              disabled={assignedStudents.has(upload._id)}
                            >
                              {assignedStudents.has(upload._id)
                                ? "Assigned"
                                : "Assign"}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setAssignHostelId(null)}
                              sx={{ mt: 1, ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </FormControl>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => setAssignHostelId(upload._id)}
                            disabled={assignedStudents.has(upload._id)}
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign to Hostel"}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </motion.div>
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

/*2025.04.22
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  IconButton,
  Chip,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [hostelApplies, setHostelApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostelApplies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch hostel applies");
        const data = await response.json();
        setHostelApplies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploads(), fetchHostels(), fetchHostelApplies()]);
      setLoading(false);
    };

    fetchData();

    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );

    if (!hostelApply) {
      setError("No matching hostel application found for this student.");
      return;
    }

    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: hostelApply.faculty,
      department: hostelApply.department,
      address: hostelApply.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
      image: hostelApply.photoPath,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create student");
      }

      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }),
        }
      );

      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
      console.error("Error assigning hostel:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const isRegNoMismatched = (upload) => {
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );
    return hostelApply ? hostelApply.regNo !== upload.regNo : false;
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0 }}>
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
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiSelect-root": {
            fontWeight: "bold",
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUploads.map((upload) => (
            <Grid item xs={12} key={upload._id}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    backgroundColor: "white",
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {upload.regNo}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {upload.name}
                          </Typography>
                        </Box>
                        {assignedStudents.has(upload._id) && (
                          <Chip
                            label="Assigned"
                            color="success"
                            size="small"
                            sx={{ ml: "auto" }}
                          />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => openDeleteDialog(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => toggleExpand(upload._id)}
                          sx={{ color: "grey" }}
                        >
                          {expandedId === upload._id ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                    {isRegNoMismatched(upload) && (
                      <Alert severity="warning" sx={{ mt: 1 }}>
                        Registration number does not match the hostel
                        application.
                      </Alert>
                    )}
                  </CardContent>
                  <Collapse in={expandedId === upload._id}>
                    <CardContent
                      sx={{ background: "#f9f9f9", paddingLeft: "72px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Gender:</b> {upload.gender}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <DateRangeIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Registering Year:</b> Year{" "}
                            {upload.registeringYear}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Contact No:</b> {upload.contactNo}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon sx={{ color: "black" }} />
                          <Typography variant="body2">
                            <b>Email:</b> {upload.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        {assignHostelId === upload._id ? (
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Hostel</InputLabel>
                            <Select
                              value={selectedHostel[upload._id] || ""}
                              onChange={(e) =>
                                setSelectedHostel((prev) => ({
                                  ...prev,
                                  [upload._id]: e.target.value,
                                }))
                              }
                              label="Hostel"
                            >
                              {hostels
                                .filter(
                                  (hostel) =>
                                    hostel.gender === upload.gender &&
                                    calculateTotalStudents(
                                      hostel.existingStudents
                                    ) < hostel.maxStudents
                                )
                                .map((hostel, index) => (
                                  <MenuItem
                                    key={index}
                                    value={hostel.name || hostel}
                                  >
                                    {hostel.name || hostel}
                                  </MenuItem>
                                ))}
                            </Select>
                            <Button
                              variant="contained"
                              onClick={() => handleAssignHostel(upload._id)}
                              sx={{ mt: 1 }}
                              disabled={assignedStudents.has(upload._id)}
                            >
                              {assignedStudents.has(upload._id)
                                ? "Assigned"
                                : "Assign"}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setAssignHostelId(null)}
                              sx={{ mt: 1, ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </FormControl>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => setAssignHostelId(upload._id)}
                            disabled={assignedStudents.has(upload._id)}
                          >
                            {assignedStudents.has(upload._id)
                              ? "Assigned"
                              : "Assign to Hostel"}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </motion.div>
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
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;*/

/*04.22 -2
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  IconButton,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HistoryIcon from "@mui/icons-material/History";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [hostelApplies, setHostelApplies] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/registers"
        );
        if (!response.ok) throw new Error("Failed to fetch uploads");
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hostels");
        if (!response.ok) throw new Error("Failed to fetch hostels");
        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHostelApplies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/hostelApply/hostelApplies"
        );
        if (!response.ok) throw new Error("Failed to fetch hostel applies");
        const data = await response.json();
        setHostelApplies(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUploads(),
        fetchHostels(),
        fetchHostelApplies(),
        fetchStudents(),
      ]);
      setLoading(false);
    };

    fetchData();

    const storedAssignments =
      JSON.parse(localStorage.getItem("assignedStudents")) || [];
    setAssignedStudents(new Set(storedAssignments));
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

  const getHostelApplication = (upload) => {
    return hostelApplies.find((apply) => apply.regNo === upload.regNo);
  };

  const getStudentHistory = (regNo) => {
    return students.filter((student) => student.regNo === regNo);
  };

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const hostelApply = getHostelApplication(upload);

    if (!hostelApply) {
      setError("No matching hostel application found for this student.");
      return;
    }

    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: hostelApply.faculty,
      department: hostelApply.department,
      address: hostelApply.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
      image: hostelApply.photoPath,
    };

    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create student");
      }

      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }),
        }
      );

      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      // Refresh students data after assignment
      const studentsResponse = await fetch(
        "http://localhost:3000/api/students"
      );
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      }

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
      console.error("Error assigning hostel:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const isRegNoMismatched = (upload) => {
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );
    return hostelApply ? hostelApply.regNo !== upload.regNo : false;
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return assignedStudents.has(upload._id);
    }
    if (filter === "Not Assigned") {
      return !assignedStudents.has(upload._id);
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0 }}>
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
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiSelect-root": {
            fontWeight: "bold",
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUploads.map((upload) => {
            const hostelApply = getHostelApplication(upload);
            const studentHistory = getStudentHistory(upload.regNo);
            const previousRegistrations = studentHistory.filter(
              (student) => student.registeringYear !== upload.registeringYear
            );
            const currentHostelAssignment = studentHistory.find(
              (student) => student.registeringYear === upload.registeringYear
            );

            return (
              <Grid item xs={12} key={upload._id}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      overflow: "hidden",
                      backgroundColor: "white",
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              {upload.regNo}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {upload.name}
                            </Typography>
                          </Box>
                          {assignedStudents.has(upload._id) && (
                            <Chip
                              label="Assigned"
                              color="success"
                              size="small"
                              sx={{ ml: "auto" }}
                            />
                          )}
                          {currentHostelAssignment && (
                            <Chip
                              label={`Hostel: ${currentHostelAssignment.hostel}`}
                              color="info"
                              size="small"
                            />
                          )}
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton
                            onClick={() => openDeleteDialog(upload._id)}
                            sx={{ color: "grey" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleExpand(upload._id)}
                            sx={{ color: "grey" }}
                          >
                            {expandedId === upload._id ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                      {isRegNoMismatched(upload) && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          Registration number does not match the hostel
                          application.
                        </Alert>
                      )}
                    </CardContent>
                    <Collapse in={expandedId === upload._id}>
                      <CardContent
                        sx={{ background: "#f9f9f9", paddingLeft: "72px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              Current Registration (Year{" "}
                              {upload.registeringYear})
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <PersonIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Gender:</b> {upload.gender}
                              </Typography>
                            </Box>
                            {hostelApply && (
                              <>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <SchoolIcon sx={{ color: "black" }} />
                                  <Typography variant="body2">
                                    <b>Faculty:</b> {hostelApply.faculty}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <SchoolIcon sx={{ color: "black" }} />
                                  <Typography variant="body2">
                                    <b>Department:</b> {hostelApply.department}
                                  </Typography>
                                </Box>
                              </>
                            )}
                            <Box display="flex" alignItems="center" gap={1}>
                              <DateRangeIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Registering Year:</b> Year{" "}
                                {upload.registeringYear}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <PhoneIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Contact No:</b> {upload.contactNo}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <EmailIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Email:</b> {upload.email}
                              </Typography>
                            </Box>
                            {currentHostelAssignment && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <HomeIcon sx={{ color: "black" }} />
                                <Typography variant="body2">
                                  <b>Current Hostel:</b>{" "}
                                  {currentHostelAssignment.hostel}
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {previousRegistrations.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Divider sx={{ my: 2 }} />
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mb: 1 }}
                              >
                                <HistoryIcon
                                  sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Previous Registrations
                              </Typography>
                              {previousRegistrations.map(
                                (registration, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      mb: 2,
                                      pl: 2,
                                      borderLeft: "2px solid #ddd",
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      Year {registration.registeringYear}
                                    </Typography>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      gap={1}
                                    >
                                      <HomeIcon
                                        sx={{
                                          color: "black",
                                          fontSize: "small",
                                        }}
                                      />
                                      <Typography variant="body2">
                                        <b>Hostel:</b>{" "}
                                        {registration.hostel || "Not assigned"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )
                              )}
                            </Box>
                          )}
                        </Box>

                        <Box sx={{ mt: 3 }}>
                          {assignHostelId === upload._id ? (
                            <FormControl fullWidth variant="outlined">
                              <InputLabel>Hostel</InputLabel>
                              <Select
                                value={selectedHostel[upload._id] || ""}
                                onChange={(e) =>
                                  setSelectedHostel((prev) => ({
                                    ...prev,
                                    [upload._id]: e.target.value,
                                  }))
                                }
                                label="Hostel"
                              >
                                {hostels
                                  .filter(
                                    (hostel) =>
                                      hostel.gender === upload.gender &&
                                      calculateTotalStudents(
                                        hostel.existingStudents
                                      ) < hostel.maxStudents
                                  )
                                  .map((hostel, index) => (
                                    <MenuItem
                                      key={index}
                                      value={hostel.name || hostel}
                                    >
                                      {hostel.name || hostel}
                                    </MenuItem>
                                  ))}
                              </Select>
                              <Button
                                variant="contained"
                                onClick={() => handleAssignHostel(upload._id)}
                                sx={{ mt: 1 }}
                                disabled={assignedStudents.has(upload._id)}
                              >
                                {assignedStudents.has(upload._id)
                                  ? "Assigned"
                                  : "Assign"}
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => setAssignHostelId(null)}
                                sx={{ mt: 1, ml: 1 }}
                              >
                                Cancel
                              </Button>
                            </FormControl>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => setAssignHostelId(upload._id)}
                              disabled={assignedStudents.has(upload._id)}
                            >
                              {assignedStudents.has(upload._id)
                                ? "Assigned"
                                : "Assign to Hostel"}
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Collapse>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
  IconButton,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HistoryIcon from "@mui/icons-material/History";
import { motion } from "framer-motion";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [hostelApplies, setHostelApplies] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [filter, setFilter] = useState("Not Assigned");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [uploadsRes, hostelsRes, hostelAppliesRes, studentsRes] =
          await Promise.all([
            fetch("http://localhost:3000/api/register/registers"),
            fetch("http://localhost:3000/api/hostels"),
            fetch("http://localhost:3000/api/hostelApply/hostelApplies"),
            fetch("http://localhost:3000/api/students"),
          ]);

        if (!uploadsRes.ok) throw new Error("Failed to fetch uploads");
        if (!hostelsRes.ok) throw new Error("Failed to fetch hostels");
        if (!hostelAppliesRes.ok)
          throw new Error("Failed to fetch hostel applies");
        if (!studentsRes.ok) throw new Error("Failed to fetch students");

        const [uploadsData, hostelsData, hostelAppliesData, studentsData] =
          await Promise.all([
            uploadsRes.json(),
            hostelsRes.json(),
            hostelAppliesRes.json(),
            studentsRes.json(),
          ]);

        setUploads(uploadsData);
        setHostels(hostelsData);
        setHostelApplies(hostelAppliesData);
        setStudents(studentsData);

        // Get assigned students from uploads with status 'assigned'
        const assigned = new Set(
          uploadsData
            .filter((upload) => upload.status === "assigned")
            .map((upload) => upload._id)
        );
        setAssignedStudents(assigned);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getHostelApplication = (upload) => {
    return hostelApplies.find((apply) => apply.regNo === upload.regNo);
  };

  const getStudentHistory = (regNo, currentYear) => {
    return students
      .filter((student) => student.regNo === regNo)
      .sort((a, b) => a.registeringYear - b.registeringYear); // Sort by year ascending
  };

  const handleAssignHostel = async (id) => {
    const upload = uploads.find((u) => u._id === id);
    const hostelApply = getHostelApplication(upload);

    if (!hostelApply) {
      setError("No matching hostel application found for this student.");
      return;
    }

    const studentData = {
      name: upload.name,
      regNo: upload.regNo,
      gender: upload.gender,
      registeringYear: upload.registeringYear,
      hostel: selectedHostel[id],
      faculty: hostelApply.faculty,
      department: hostelApply.department,
      address: hostelApply.address,
      contactNo: upload.contactNo,
      email: upload.email,
      parentNo: upload.parentNo,
      image: hostelApply.photoPath,
    };

    try {
      // Create new student record for current year
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create student");
      }

      // Update upload status to 'assigned'
      const statusResponse = await fetch(
        `http://localhost:3000/api/register/registers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "assigned" }),
        }
      );

      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      // Refresh all data
      const [studentsRes, uploadsRes] = await Promise.all([
        fetch("http://localhost:3000/api/students"),
        fetch("http://localhost:3000/api/register/registers"),
      ]);

      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        setStudents(studentsData);
      }

      if (uploadsRes.ok) {
        const uploadsData = await uploadsRes.json();
        setUploads(uploadsData);
        // Update assigned students
        const assigned = new Set(
          uploadsData
            .filter((upload) => upload.status === "assigned")
            .map((upload) => upload._id)
        );
        setAssignedStudents(assigned);
      }

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
      console.error("Error assigning hostel:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setCurrentDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentDeleteId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/register/registers/${currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the register");
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== currentDeleteId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeleteDialogOpen(false);
        setCurrentDeleteId(null);
      }
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const isRegNoMismatched = (upload) => {
    const hostelApply = hostelApplies.find(
      (apply) => apply.email === upload.email
    );
    return hostelApply ? hostelApply.regNo !== upload.regNo : false;
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "Assigned") {
      return upload.status === "assigned";
    }
    if (filter === "Not Assigned") {
      return upload.status !== "assigned";
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0 }}>
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
        Registered Students
      </Typography>

      <FormControl
        variant="outlined"
        sx={{
          mb: 2,
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: "black",
          },
          "& .MuiSelect-root": {
            fontWeight: "bold",
          },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="Not Assigned">Not Assigned</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUploads.map((upload) => {
            const hostelApply = getHostelApplication(upload);
            const studentHistory = getStudentHistory(
              upload.regNo,
              upload.registeringYear
            );

            // Previous registrations are all records with year less than current registering year
            const previousRegistrations = studentHistory.filter(
              (student) => student.registeringYear < upload.registeringYear
            );

            // Current hostel assignment is for the current registering year (if exists)
            const currentHostelAssignment = studentHistory.find(
              (student) => student.registeringYear === upload.registeringYear
            );

            // Last registration is the most recent previous registration (if exists)
            const lastRegistration =
              previousRegistrations.length > 0
                ? previousRegistrations[previousRegistrations.length - 1]
                : null;

            return (
              <Grid item xs={12} key={upload._id}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      overflow: "hidden",
                      backgroundColor: "white",
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              {upload.regNo}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {upload.name}
                            </Typography>
                          </Box>
                          {upload.status === "assigned" && (
                            <Chip
                              label="Assigned"
                              color="success"
                              size="small"
                              sx={{ ml: "auto" }}
                            />
                          )}
                          {lastRegistration && (
                            <Chip
                              label={`Last Year: ${lastRegistration.registeringYear} (${lastRegistration.hostel})`}
                              color="info"
                              size="small"
                            />
                          )}
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton
                            onClick={() => openDeleteDialog(upload._id)}
                            sx={{ color: "grey" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleExpand(upload._id)}
                            sx={{ color: "grey" }}
                          >
                            {expandedId === upload._id ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                      {isRegNoMismatched(upload) && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          Registration number does not match the hostel
                          application.
                        </Alert>
                      )}
                    </CardContent>
                    <Collapse in={expandedId === upload._id}>
                      <CardContent
                        sx={{ background: "#f9f9f9", paddingLeft: "72px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              Current Registration (Year{" "}
                              {upload.registeringYear})
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <PersonIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Gender:</b> {upload.gender}
                              </Typography>
                            </Box>
                            {hostelApply && (
                              <>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <SchoolIcon sx={{ color: "black" }} />
                                  <Typography variant="body2">
                                    <b>Faculty:</b> {hostelApply.faculty}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <SchoolIcon sx={{ color: "black" }} />
                                  <Typography variant="body2">
                                    <b>Department:</b> {hostelApply.department}
                                  </Typography>
                                </Box>
                              </>
                            )}
                            <Box display="flex" alignItems="center" gap={1}>
                              <DateRangeIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Registering Year:</b> Year{" "}
                                {upload.registeringYear}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <PhoneIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Contact No:</b> {upload.contactNo}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <EmailIcon sx={{ color: "black" }} />
                              <Typography variant="body2">
                                <b>Email:</b> {upload.email}
                              </Typography>
                            </Box>
                            {currentHostelAssignment && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <HomeIcon sx={{ color: "black" }} />
                                <Typography variant="body2">
                                  <b>Current Hostel:</b>{" "}
                                  {currentHostelAssignment.hostel}
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {previousRegistrations.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Divider sx={{ my: 2 }} />
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mb: 1 }}
                              >
                                <HistoryIcon
                                  sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Previous Registrations
                              </Typography>
                              {previousRegistrations.map(
                                (registration, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      mb: 2,
                                      pl: 2,
                                      borderLeft: "2px solid #ddd",
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      Year {registration.registeringYear}
                                    </Typography>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      gap={1}
                                    >
                                      <HomeIcon
                                        sx={{
                                          color: "black",
                                          fontSize: "small",
                                        }}
                                      />
                                      <Typography variant="body2">
                                        <b>Hostel:</b>{" "}
                                        {registration.hostel || "Not assigned"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )
                              )}
                            </Box>
                          )}
                        </Box>

                        <Box sx={{ mt: 3 }}>
                          {assignHostelId === upload._id ? (
                            <FormControl fullWidth variant="outlined">
                              <InputLabel>Hostel</InputLabel>
                              <Select
                                value={selectedHostel[upload._id] || ""}
                                onChange={(e) =>
                                  setSelectedHostel((prev) => ({
                                    ...prev,
                                    [upload._id]: e.target.value,
                                  }))
                                }
                                label="Hostel"
                              >
                                {hostels
                                  .filter(
                                    (hostel) =>
                                      hostel.gender === upload.gender &&
                                      calculateTotalStudents(
                                        hostel.existingStudents
                                      ) < hostel.maxStudents
                                  )
                                  .map((hostel, index) => (
                                    <MenuItem
                                      key={index}
                                      value={hostel.name || hostel}
                                    >
                                      {hostel.name || hostel}
                                    </MenuItem>
                                  ))}
                              </Select>
                              <Button
                                variant="contained"
                                onClick={() => handleAssignHostel(upload._id)}
                                sx={{ mt: 1 }}
                                disabled={upload.status === "assigned"}
                              >
                                {upload.status === "assigned"
                                  ? "Assigned"
                                  : "Assign"}
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => setAssignHostelId(null)}
                                sx={{ mt: 1, ml: 1 }}
                              >
                                Cancel
                              </Button>
                            </FormControl>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => setAssignHostelId(upload._id)}
                              disabled={upload.status === "assigned"}
                            >
                              {upload.status === "assigned"
                                ? "Assigned"
                                : "Assign to Hostel"}
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Collapse>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestUploads;
