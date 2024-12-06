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
                      {/* Replaced buttons with ExpandMore/ExpandLess */}
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
      {/* Confirmation Dialog */}
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
