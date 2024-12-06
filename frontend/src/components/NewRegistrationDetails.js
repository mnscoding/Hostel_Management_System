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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TestUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [assignHostelId, setAssignHostelId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState(new Set());
  const [assignedHostels, setAssignedHostels] = useState({});
  const [filterOption, setFilterOption] = useState("all");

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
      const existingStudentResponse = await fetch(
        `http://localhost:3000/api/students?regNo=${upload.regNo}`
      );
      const existingStudents = await existingStudentResponse.json();

      if (existingStudents.length > 0) {
        const studentId = existingStudents[0]._id; // Assuming unique registration number
        await fetch(`http://localhost:3000/api/students/${studentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registeringYear: upload.registeringYear,
            hostel: selectedHostel[id],
          }),
        });
      } else {
        const response = await fetch("http://localhost:3000/api/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        });

        if (!response.ok) throw new Error("Failed to create student");
      }

      setAssignedStudents((prev) => {
        const newSet = new Set(prev).add(id);
        localStorage.setItem(
          "assignedStudents",
          JSON.stringify(Array.from(newSet))
        );
        return newSet;
      });

      setAssignedHostels((prev) => ({ ...prev, [id]: selectedHostel[id] }));

      setAssignHostelId(null);
      setSelectedHostel((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateTotalStudents = (existingStudents) => {
    return existingStudents.reduce((acc, student) => acc + student.count, 0);
  };

  const filteredUploads = uploads.filter((upload) => {
    if (filterOption === "assigned") {
      return assignedStudents.has(upload._id);
    } else if (filterOption === "notAssigned") {
      return !assignedStudents.has(upload._id);
    }
    return true; // For "all" option
  });

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Registered Students
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Filter Students</InputLabel>
        <Select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          label="Filter Students"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="assigned">Assigned</MenuItem>
          <MenuItem value="notAssigned">Not Assigned</MenuItem>
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
                          >
                            Assign
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setAssignHostelId(null)}
                            sx={{ mt: 1, ml: 1 }}
                          >
                            Cancel
                          </Button>
                        </FormControl>
                      ) : assignedStudents.has(upload._id) ? (
                        <Typography
                          variant="body2"
                          color="success.main"
                          sx={{ mt: 1 }}
                        >
                          Assigned to: {assignedHostels[upload._id]}
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setAssignHostelId(upload._id)}
                        >
                          Assign to a hostel
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
