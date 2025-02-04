/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CssBaseline,
  Box,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PersonAdd,
  Visibility,
  Notifications,
  Group,
  Description,
  Apartment,
  Work,
  PeopleAlt,
  House,
} from "@mui/icons-material";

import AddStudentForm from "../components/StudentForm"; // Import your AddStudentForm component

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#333",
          height: "100%", // Ensure all cards have the same height
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          padding: "10px 20px",
        },
      },
    },
  },
});

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [count, setCount] = useState(0);
  const [complaintCounts, setComplaintCounts] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
  });
  const [hostelApplyCounts, setHostelApplyCounts] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [staffCount, setStaffCount] = useState(0);
  const [userCounts, setUserCounts] = useState({
    total: 0,
    admin: 0,
    staff: 0,
    student: 0,
  });
  const [noticeCount, setNoticeCount] = useState(0);
  const [hostelCount, setHostelCount] = useState({
    total: 0,
    filled: 0,
    notFilled: 0,
  });
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    // Fetching all necessary data
    const fetchStudentCount = async () => {
      try {
        const response = await fetch("/api/dashboard/studentCount");
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    const fetchStaffCount = async () => {
      try {
        const response = await fetch("/api/dashboard/staffCount");
        const data = await response.json();
        setStaffCount(data.count);
      } catch (error) {
        console.error("Error fetching staff count:", error);
      }
    };

    const fetchNoticeCount = async () => {
      try {
        const response = await fetch("/api/dashboard/noticeCount");
        const data = await response.json();
        setNoticeCount(data.count);
      } catch (error) {
        console.error("Error fetching noticecount:", error);
      }
    };

    const fetchHostelCount = async () => {
      try {
        const response = await fetch("/api/dashboard/hostelCount");
        const data = await response.json();
        setHostelCount({
          total: data.totalCount,
          filled: data.filledCount,
          notFilled: data.notFilledCount,
        });
      } catch (error) {
        console.error("Error fetching hostel count:", error);
      }
    };

    const fetchComplaintCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/complaintCount");
        const data = await response.json();
        setComplaintCounts({
          total: data.totalCount,
          resolved: data.resolvedCount,
          unresolved: data.unresolvedCount,
        });
      } catch (error) {
        console.error("Error fetching complaint counts:", error);
      }
    };

    const fetchHostelApplyCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/hostelApplyCount");
        const data = await response.json();
        setHostelApplyCounts({
          total: data.totalCount,
          accepted: data.acceptedCount,
          rejected: data.rejectedCount,
          pending: data.pendingCount,
        });
      } catch (error) {
        console.error("Error fetching hostel apply counts:", error);
      }
    };

    const fetchUserCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/userCount");
        const data = await response.json();
        setUserCounts({
          total: data.totalCount,
          admin: data.adminCount,
          staff: data.staffCount,
          student: data.studentCount,
        });
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch("/api/dashboard/registrationCount");
        const data = await response.json();
        setRegistrationCount(data.count);
      } catch (error) {
        console.error("Error fetching registration count:", error);
      }
    };

    fetchStudentCount();
    fetchComplaintCounts();
    fetchNoticeCount();
    fetchHostelCount();
    fetchUserCounts();
    fetchStaffCount();
    fetchHostelApplyCounts();
    fetchRegistrationCount();
  }, []);

  const handleAddStudentClick = () => {
    setShowAddStudentForm((prev) => !prev); // Toggle form visibility
  };

  const updateStudentCount = (newCount) => {
    setCount(newCount);
  };

  const handleViewAllRequests = () => {
    navigate("/applyrequests");
  };
  const handleViewAllUsers = () => {
    navigate("/users");
  };
  const handleAddUser = () => {
    navigate("/adduser");
  };
  const handleViewAllRegistrations = () => {
    navigate("/register");
  };
  const handleViewAllStudents = () => {
    navigate("/students");
  };
  const handleViewAllComplaints = () => {
    navigate("/complaints");
  };
  const handleViewAllNotices = () => {
    navigate("/notices");
  };
  const handleViewAllStaff = () => {
    navigate("/staff");
  };
  const handleViewAllHostels = () => {
    navigate("/hostels");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="main-content">
        <Container component="main">
          <CssBaseline />
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Group sx={{ mr: 1 }} /> User Management
                  </Typography>
                  <Typography>Total Users: {userCounts.total}</Typography>
                  <Typography>Admins: {userCounts.admin}</Typography>
                  <Typography>Staff: {userCounts.staff}</Typography>
                  <Typography>Students: {userCounts.student}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PersonAdd />}
                    onClick={handleAddUser}
                  >
                    Add New User
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllUsers}
                  >
                    View All Users
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Apartment sx={{ mr: 1 }} /> Request Management
                  </Typography>
                  <Typography>
                    Total Requests: {hostelApplyCounts.total}
                  </Typography>
                  <Typography>
                    Accepted: {hostelApplyCounts.accepted}
                  </Typography>
                  <Typography>
                    Rejected: {hostelApplyCounts.rejected}
                  </Typography>
                  <Typography>Pending: {hostelApplyCounts.pending}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllRequests}
                  >
                    View Requests
                  </Button>
                </CardActions>
              </Card>
            </Grid>

           
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Description sx={{ mr: 1 }} /> Registration Management
                  </Typography>
                  <Typography>
                    Total Registrations: {registrationCount}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllRegistrations}
                  >
                    View All Registrations
                  </Button>
                </CardActions>
              </Card>
            </Grid>

           
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Notifications sx={{ mr: 1 }} /> Notice Management
                  </Typography>
                  <Typography>Total Notices: {noticeCount}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Description />}
                    onClick={handleViewAllNotices}
                  >
                    View All Notices
                  </Button>
                </CardActions>
              </Card>
            </Grid>

           
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Work sx={{ mr: 1 }} /> Complaint Management
                  </Typography>
                  <Typography>
                    Total Complaints: {complaintCounts.total}
                  </Typography>
                  <Typography>
                    Resolved Complaints: {complaintCounts.resolved}
                  </Typography>
                  <Typography>
                    Pending Complaints: {complaintCounts.unresolved}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleViewAllComplaints}>
                    View All Complaints
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Group sx={{ mr: 1 }} /> Student Management
                  </Typography>
                  <Typography>Total Students: {count}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllStudents}
                  >
                    View All Students
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <House sx={{ mr: 1 }} /> Hostel Management
                  </Typography>
                  <Typography>Total Hostels: {hostelCount.total}</Typography>
                  <Typography>Filled Hostels: {hostelCount.filled}</Typography>
                  <Typography>
                    Available Hostels: {hostelCount.notFilled}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleViewAllHostels}>
                    View All Hostels
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PeopleAlt sx={{ mr: 1 }} /> Staff Management
                  </Typography>
                  <Typography>Total Staff: {staffCount}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleViewAllStaff}>
                    View All Staff
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          
          {showAddStudentForm && (
            <Box sx={{ marginTop: 4 }}>
              <AddStudentForm updateStudentCount={updateStudentCount} />
            </Box>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;*/

/*2025.02.03
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CssBaseline,
  Box,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PersonAdd,
  Visibility,
  Notifications,
  Group,
  Description,
  Apartment,
  Work,
  PeopleAlt,
  House,
} from "@mui/icons-material";

import AddStudentForm from "../components/StudentForm"; // Import your AddStudentForm component

const theme = createTheme({
  palette: {
    mode: "light", // Light mode
  },
  typography: {
    h5: {
      fontWeight: "bold", // Make titles bold
      color: "black", // Set titles to black
    },
    body1: {
      color: "black", // Set all regular text to black
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Lighter shadow for light theme
          backgroundColor: "#fff", // White background for cards
          height: "100%", // Ensure all cards have the same height
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          padding: "10px 20px",
        },
      },
    },
  },
});

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [count, setCount] = useState(0);
  const [complaintCounts, setComplaintCounts] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
    processing: 0,
  });
  const [hostelApplyCounts, setHostelApplyCounts] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [staffCount, setStaffCount] = useState(0);
  const [userCounts, setUserCounts] = useState({
    total: 0,
    admin: 0,
    staff: 0,
    student: 0,
  });
  const [noticeCount, setNoticeCount] = useState(0);
  const [approvedEmailsCount, setApprovedEmailsCount] = useState(0);
  const [hostelCount, setHostelCount] = useState({
    total: 0,
    filled: 0,
    notFilled: 0,
  });
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    // Fetching all necessary data
    const fetchStudentCount = async () => {
      try {
        const response = await fetch("/api/dashboard/studentCount");
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    const fetchStaffCount = async () => {
      try {
        const response = await fetch("/api/dashboard/staffCount");
        const data = await response.json();
        setStaffCount(data.count);
      } catch (error) {
        console.error("Error fetching staff count:", error);
      }
    };

    const fetchNoticeCount = async () => {
      try {
        const response = await fetch("/api/dashboard/noticeCount");
        const data = await response.json();
        setNoticeCount(data.count);
      } catch (error) {
        console.error("Error fetching noticecount:", error);
      }
    };
    const fetchApprovedEmailsCount = async () => {
      try {
        const response = await fetch("/api/dashboard/approvedEmailsCount");
        const data = await response.json();
        setApprovedEmailsCount(data.count);
      } catch (error) {
        console.error("Error fetching noticecount:", error);
      }
    };

    const fetchHostelCount = async () => {
      try {
        const response = await fetch("/api/dashboard/hostelCount");
        const data = await response.json();
        setHostelCount({
          total: data.totalCount,
          filled: data.filledCount,
          notFilled: data.notFilledCount,
        });
      } catch (error) {
        console.error("Error fetching hostel count:", error);
      }
    };

    const fetchComplaintCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/complaintCount");
        const data = await response.json();
        setComplaintCounts({
          total: data.totalCount,
          resolved: data.resolvedCount,
          unresolved: data.unresolvedCount,
          processing: data.processingCount,
        });
      } catch (error) {
        console.error("Error fetching complaint counts:", error);
      }
    };

    const fetchHostelApplyCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/hostelApplyCount");
        const data = await response.json();
        setHostelApplyCounts({
          total: data.totalCount,
          accepted: data.acceptedCount,
          rejected: data.rejectedCount,
          pending: data.pendingCount,
        });
      } catch (error) {
        console.error("Error fetching hostel apply counts:", error);
      }
    };

    const fetchUserCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/userCount");
        const data = await response.json();
        setUserCounts({
          total: data.totalCount,
          admin: data.adminCount,
          staff: data.staffCount,
          student: data.studentCount,
        });
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch("/api/dashboard/registerCount");
        const data = await response.json();
        setRegistrationCount(data.count);
      } catch (error) {
        console.error("Error fetching registration count:", error);
      }
    };

    fetchStudentCount();
    fetchComplaintCounts();
    fetchNoticeCount();
    fetchApprovedEmailsCount();
    fetchHostelCount();
    fetchUserCounts();
    fetchStaffCount();
    fetchHostelApplyCounts();
    fetchRegistrationCount();
  }, []);

  const handleAddStudentClick = () => {
    setShowAddStudentForm((prev) => !prev); // Toggle form visibility
  };

  const updateStudentCount = (newCount) => {
    setCount(newCount);
  };

  const handleViewAllRequests = () => {
    navigate("/applyrequests");
  };
  const handleViewAllUsers = () => {
    navigate("/users");
  };
  const handleAddUser = () => {
    navigate("/adduser");
  };
  const handleViewAllRegistrations = () => {
    navigate("/register");
  };
  const handleViewAllStudents = () => {
    navigate("/students");
  };
  const handleViewAllComplaints = () => {
    navigate("/complaints");
  };
  const handleViewAllNotices = () => {
    navigate("/notices");
  };
  const handleViewAllApprovedEmails = () => {
    navigate("/approvedEmails");
  };
  const handleViewAllStaff = () => {
    navigate("/staff");
  };
  const handleViewAllHostels = () => {
    navigate("/hostels");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="main-content">
        <Container component="main">
          <CssBaseline />
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Group sx={{ mr: 1 }} /> User Management
                  </Typography>
                  <Typography>Total Users: {userCounts.total}</Typography>
                  <Typography>Admins: {userCounts.admin}</Typography>
                  <Typography>Staff: {userCounts.staff}</Typography>
                  <Typography>Students: {userCounts.student}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PersonAdd />}
                    onClick={handleAddUser}
                  >
                    Add New User
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllUsers}
                  >
                    View All Users
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PeopleAlt sx={{ mr: 1 }} /> Student Management
                  </Typography>
                  <Typography>Total Students: {count}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PersonAdd />}
                    onClick={handleAddStudentClick}
                  >
                    Add New Student
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllStudents}
                  >
                    View All Students
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Apartment sx={{ mr: 1 }} /> Request Management
                  </Typography>
                  <Typography>
                    Total Requests: {hostelApplyCounts.total}
                  </Typography>
                  <Typography>
                    Accepted: {hostelApplyCounts.accepted}
                  </Typography>
                  <Typography>
                    Rejected: {hostelApplyCounts.rejected}
                  </Typography>
                  <Typography>Pending: {hostelApplyCounts.pending}</Typography>
                  <Typography>
                    Total Approved Emails: {approvedEmailsCount}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllRequests}
                  >
                    View Requests
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllApprovedEmails}
                  >
                    View Emails
                  </Button>
                </CardActions>
              </Card>
            </Grid>

           
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Description sx={{ mr: 1 }} /> Registration Management
                  </Typography>
                  <Typography>
                    Total Registrations: {registrationCount}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllRegistrations}
                  >
                    View All Registrations
                  </Button>
                </CardActions>
              </Card>
            </Grid>

           
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Notifications sx={{ mr: 1 }} /> Notice Management
                  </Typography>
                  <Typography>Total Notices: {noticeCount}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Description />}
                    onClick={handleViewAllNotices}
                  >
                    View All Notices
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Work sx={{ mr: 1 }} /> Complaint Management
                  </Typography>
                  <Typography>
                    Total Complaints: {complaintCounts.total}
                  </Typography>
                  <Typography>
                    Resolved Complaints: {complaintCounts.resolved}
                  </Typography>
                  <Typography>
                    Unresolved Complaints: {complaintCounts.unresolved}
                  </Typography>
                  <Typography>
                    Processing Complaints: {complaintCounts.processing}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllComplaints}
                  >
                    View All Complaints
                  </Button>
                </CardActions>
              </Card>
            </Grid>

          
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <House sx={{ mr: 1 }} /> Hostel Management
                  </Typography>
                  <Typography>Total Hostels: {hostelCount.total}</Typography>
                  <Typography>Filled Hostels: {hostelCount.filled}</Typography>
                  <Typography>
                    Available Hostels: {hostelCount.notFilled}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllHostels}
                  >
                    View All Hostels
                  </Button>
                </CardActions>
              </Card>
            </Grid>

        
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PeopleAlt sx={{ mr: 1 }} /> Staff Management
                  </Typography>
                  <Typography>Total Staff: {staffCount}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllStaff}
                  >
                    View All Staff
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          
          {showAddStudentForm && (
            <Box sx={{ marginTop: 4 }}>
              <AddStudentForm updateStudentCount={updateStudentCount} />
            </Box>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;*/

/*02.04
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CssBaseline,
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PersonAdd,
  Visibility,
  Notifications,
  Group,
  Description,
  Apartment,
  Work,
  PeopleAlt,
  House,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { BarChart, PieChart } from "@mui/x-charts";
import AddStudentForm from "../components/StudentForm"; // Import your AddStudentForm component

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
            },
          }
        : {
            background: {
              default: "#121212",
            },
          }),
    },
    typography: {
      h5: {
        fontWeight: "bold",
        color: mode === "light" ? "black" : "white",
      },
      body1: {
        color: mode === "light" ? "black" : "white",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: mode === "light" ? "#fff" : "#1e1e1e",
            height: "100%",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            textTransform: "none",
            padding: "10px 20px",
          },
        },
      },
    },
  });

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [count, setCount] = useState(0);
  const [complaintCounts, setComplaintCounts] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
    processing: 0,
  });
  const [hostelApplyCounts, setHostelApplyCounts] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [staffCount, setStaffCount] = useState(0);
  const [userCounts, setUserCounts] = useState({
    total: 0,
    admin: 0,
    staff: 0,
    student: 0,
  });
  const [noticeCount, setNoticeCount] = useState(0);
  const [approvedEmailsCount, setApprovedEmailsCount] = useState(0);
  const [hostelCount, setHostelCount] = useState({
    total: 0,
    filled: 0,
    notFilled: 0,
  });
  const [registrationCount, setRegistrationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentCountRes,
          staffCountRes,
          noticeCountRes,
          approvedEmailsCountRes,
          hostelCountRes,
          complaintCountsRes,
          hostelApplyCountsRes,
          userCountsRes,
          registrationCountRes,
        ] = await Promise.all([
          fetch("/api/dashboard/studentCount"),
          fetch("/api/dashboard/staffCount"),
          fetch("/api/dashboard/noticeCount"),
          fetch("/api/dashboard/approvedEmailsCount"),
          fetch("/api/dashboard/hostelCount"),
          fetch("/api/dashboard/complaintCount"),
          fetch("/api/dashboard/hostelApplyCount"),
          fetch("/api/dashboard/userCount"),
          fetch("/api/dashboard/registerCount"),
        ]);

        const [
          studentCountData,
          staffCountData,
          noticeCountData,
          approvedEmailsCountData,
          hostelCountData,
          complaintCountsData,
          hostelApplyCountsData,
          userCountsData,
          registrationCountData,
        ] = await Promise.all([
          studentCountRes.json(),
          staffCountRes.json(),
          noticeCountRes.json(),
          approvedEmailsCountRes.json(),
          hostelCountRes.json(),
          complaintCountsRes.json(),
          hostelApplyCountsRes.json(),
          userCountsRes.json(),
          registrationCountRes.json(),
        ]);

        setCount(studentCountData.count);
        setStaffCount(staffCountData.count);
        setNoticeCount(noticeCountData.count);
        setApprovedEmailsCount(approvedEmailsCountData.count);
        setHostelCount({
          total: hostelCountData.totalCount,
          filled: hostelCountData.filledCount,
          notFilled: hostelCountData.notFilledCount,
        });
        setComplaintCounts({
          total: complaintCountsData.totalCount,
          resolved: complaintCountsData.resolvedCount,
          unresolved: complaintCountsData.unresolvedCount,
          processing: complaintCountsData.processingCount,
        });
        setHostelApplyCounts({
          total: hostelApplyCountsData.totalCount,
          accepted: hostelApplyCountsData.acceptedCount,
          rejected: hostelApplyCountsData.rejectedCount,
          pending: hostelApplyCountsData.pendingCount,
        });
        setUserCounts({
          total: userCountsData.totalCount,
          admin: userCountsData.adminCount,
          staff: userCountsData.staffCount,
          student: userCountsData.studentCount,
        });
        setRegistrationCount(registrationCountData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleAddStudentClick = () => {
    setShowAddStudentForm((prev) => !prev);
  };

  const updateStudentCount = (newCount) => {
    setCount(newCount);
  };

  const handleViewAllRequests = () => navigate("/applyrequests");
  const handleViewAllUsers = () => navigate("/users");
  const handleAddUser = () => navigate("/adduser");
  const handleViewAllRegistrations = () => navigate("/register");
  const handleViewAllStudents = () => navigate("/students");
  const handleViewAllComplaints = () => navigate("/complaints");
  const handleViewAllNotices = () => navigate("/notices");
  const handleViewAllApprovedEmails = () => navigate("/approvedEmails");
  const handleViewAllStaff = () => navigate("/staff");
  const handleViewAllHostels = () => navigate("/hostels");

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="main-content">
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <Container component="main">
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ marginTop: 2 }}
          >
            <Tooltip title="Toggle Dark Mode">
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          </Box>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Group sx={{ mr: 1 }} /> User Management
                  </Typography>
                  <Typography>Total Users: {userCounts.total}</Typography>
                  <Typography>Admins: {userCounts.admin}</Typography>
                  <Typography>Staff: {userCounts.staff}</Typography>
                  <Typography>Students: {userCounts.student}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PersonAdd />}
                    onClick={handleAddUser}
                  >
                    Add New User
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllUsers}
                  >
                    View All Users
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <PeopleAlt sx={{ mr: 1 }} /> Student Management
                  </Typography>
                  <Typography>Total Students: {count}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PersonAdd />}
                    onClick={handleAddStudentClick}
                  >
                    Add New Student
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllStudents}
                  >
                    View All Students
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Apartment sx={{ mr: 1 }} /> Request Management
                  </Typography>
                  <Typography>
                    Total Requests: {hostelApplyCounts.total}
                  </Typography>
                  <Typography>
                    Accepted: {hostelApplyCounts.accepted}
                  </Typography>
                  <Typography>
                    Rejected: {hostelApplyCounts.rejected}
                  </Typography>
                  <Typography>Pending: {hostelApplyCounts.pending}</Typography>
                  <Typography>
                    Total Approved Emails: {approvedEmailsCount}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllRequests}
                  >
                    View Requests
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllApprovedEmails}
                  >
                    View Emails
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Description sx={{ mr: 1 }} /> Registration Management
                  </Typography>
                  <Typography>
                    Total Registrations: {registrationCount}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllRegistrations}
                  >
                    View All Registrations
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Notifications sx={{ mr: 1 }} /> Notice Management
                  </Typography>
                  <Typography>Total Notices: {noticeCount}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Description />}
                    onClick={handleViewAllNotices}
                  >
                    View All Notices
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Work sx={{ mr: 1 }} /> Complaint Management
                  </Typography>
                  <Typography>
                    Total Complaints: {complaintCounts.total}
                  </Typography>
                  <Typography>
                    Resolved Complaints: {complaintCounts.resolved}
                  </Typography>
                  <Typography>
                    Unresolved Complaints: {complaintCounts.unresolved}
                  </Typography>
                  <Typography>
                    Processing Complaints: {complaintCounts.processing}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllComplaints}
                  >
                    View All Complaints
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <House sx={{ mr: 1 }} /> Hostel Management
                  </Typography>
                  <Typography>Total Hostels: {hostelCount.total}</Typography>
                  <Typography>Filled Hostels: {hostelCount.filled}</Typography>
                  <Typography>
                    Available Hostels: {hostelCount.notFilled}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllHostels}
                  >
                    View All Hostels
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <PeopleAlt sx={{ mr: 1 }} /> Staff Management
                  </Typography>
                  <Typography>Total Staff: {staffCount}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={handleViewAllStaff}
                  >
                    View All Staff
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Complaints Overview</Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Resolved", "Unresolved", "Processing"],
                      },
                    ]}
                    series={[
                      {
                        data: [
                          complaintCounts.resolved,
                          complaintCounts.unresolved,
                          complaintCounts.processing,
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Hostel Occupancy</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: hostelCount.filled, label: "Filled" },
                          {
                            id: 1,
                            value: hostelCount.notFilled,
                            label: "Available",
                          },
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">User Distribution</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: userCounts.admin, label: "Admins" },
                          { id: 1, value: userCounts.staff, label: "Staff" },
                          {
                            id: 2,
                            value: userCounts.student,
                            label: "Students",
                          },
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    Hostel Application Status
                  </Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Accepted", "Rejected", "Pending"],
                      },
                    ]}
                    series={[
                      {
                        data: [
                          hostelApplyCounts.accepted,
                          hostelApplyCounts.rejected,
                          hostelApplyCounts.pending,
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {showAddStudentForm && (
            <Box sx={{ marginTop: 4 }}>
              <AddStudentForm updateStudentCount={updateStudentCount} />
            </Box>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AdminDashboard;*/

/*With dark mode
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CssBaseline,
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PersonAdd,
  Visibility,
  Notifications,
  Group,
  Description,
  Apartment,
  Work,
  PeopleAlt,
  House,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { BarChart, PieChart } from "@mui/x-charts";
import AddStudentForm from "../components/StudentForm"; // Import your AddStudentForm component
import CountUp from "react-countup"; // For animated counters

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
            },
          }
        : {
            background: {
              default: "#121212",
            },
          }),
    },
    typography: {
      h5: {
        fontWeight: "bold",
        color: mode === "light" ? "black" : "white",
      },
      body1: {
        color: mode === "light" ? "black" : "white",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: mode === "light" ? "#fff" : "#1e1e1e",
            height: "100%",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            textTransform: "none",
            padding: "10px 20px",
          },
        },
      },
    },
  });

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [count, setCount] = useState(0);
  const [complaintCounts, setComplaintCounts] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
    processing: 0,
  });
  const [hostelApplyCounts, setHostelApplyCounts] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [staffCount, setStaffCount] = useState(0);
  const [userCounts, setUserCounts] = useState({
    total: 0,
    admin: 0,
    staff: 0,
    student: 0,
  });
  const [noticeCount, setNoticeCount] = useState(0);
  const [approvedEmailsCount, setApprovedEmailsCount] = useState(0);
  const [hostelCount, setHostelCount] = useState({
    total: 0,
    filled: 0,
    notFilled: 0,
  });
  const [registrationCount, setRegistrationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentCountRes,
          staffCountRes,
          noticeCountRes,
          approvedEmailsCountRes,
          hostelCountRes,
          complaintCountsRes,
          hostelApplyCountsRes,
          userCountsRes,
          registrationCountRes,
        ] = await Promise.all([
          fetch("/api/dashboard/studentCount"),
          fetch("/api/dashboard/staffCount"),
          fetch("/api/dashboard/noticeCount"),
          fetch("/api/dashboard/approvedEmailsCount"),
          fetch("/api/dashboard/hostelCount"),
          fetch("/api/dashboard/complaintCount"),
          fetch("/api/dashboard/hostelApplyCount"),
          fetch("/api/dashboard/userCount"),
          fetch("/api/dashboard/registerCount"),
        ]);

        const [
          studentCountData,
          staffCountData,
          noticeCountData,
          approvedEmailsCountData,
          hostelCountData,
          complaintCountsData,
          hostelApplyCountsData,
          userCountsData,
          registrationCountData,
        ] = await Promise.all([
          studentCountRes.json(),
          staffCountRes.json(),
          noticeCountRes.json(),
          approvedEmailsCountRes.json(),
          hostelCountRes.json(),
          complaintCountsRes.json(),
          hostelApplyCountsRes.json(),
          userCountsRes.json(),
          registrationCountRes.json(),
        ]);

        setCount(studentCountData.count);
        setStaffCount(staffCountData.count);
        setNoticeCount(noticeCountData.count);
        setApprovedEmailsCount(approvedEmailsCountData.count);
        setHostelCount({
          total: hostelCountData.totalCount,
          filled: hostelCountData.filledCount,
          notFilled: hostelCountData.notFilledCount,
        });
        setComplaintCounts({
          total: complaintCountsData.totalCount,
          resolved: complaintCountsData.resolvedCount,
          unresolved: complaintCountsData.unresolvedCount,
          processing: complaintCountsData.processingCount,
        });
        setHostelApplyCounts({
          total: hostelApplyCountsData.totalCount,
          accepted: hostelApplyCountsData.acceptedCount,
          rejected: hostelApplyCountsData.rejectedCount,
          pending: hostelApplyCountsData.pendingCount,
        });
        setUserCounts({
          total: userCountsData.totalCount,
          admin: userCountsData.adminCount,
          staff: userCountsData.staffCount,
          student: userCountsData.studentCount,
        });
        setRegistrationCount(registrationCountData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleAddStudentClick = () => {
    setShowAddStudentForm((prev) => !prev);
  };

  const updateStudentCount = (newCount) => {
    setCount(newCount);
  };

  const handleViewAllRequests = () => navigate("/applyrequests");
  const handleViewAllUsers = () => navigate("/users");
  const handleAddUser = () => navigate("/adduser");
  const handleViewAllRegistrations = () => navigate("/register");
  const handleViewAllStudents = () => navigate("/students");
  const handleViewAllComplaints = () => navigate("/complaints");
  const handleViewAllNotices = () => navigate("/notices");
  const handleViewAllApprovedEmails = () => navigate("/approvedEmails");
  const handleViewAllStaff = () => navigate("/staff");
  const handleViewAllHostels = () => navigate("/hostels");

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="main-content">
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <Container component="main">
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ marginTop: 2 }}
          >
            <Tooltip title="Toggle Dark Mode">
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          </Box>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
          
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllUsers}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Group sx={{ mr: 1 }} /> User Management
                  </Typography>
                  <Typography>
                    Total Users: <CountUp end={userCounts.total} duration={2} />
                  </Typography>
                  <Typography>
                    Admins: <CountUp end={userCounts.admin} duration={2} />
                  </Typography>
                  <Typography>
                    Staff: <CountUp end={userCounts.staff} duration={2} />
                  </Typography>
                  <Typography>
                    Students: <CountUp end={userCounts.student} duration={2} />
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllStudents}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <PeopleAlt sx={{ mr: 1 }} /> Student Management
                  </Typography>
                  <Typography>
                    Total Students: <CountUp end={count} duration={2} />
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllRequests}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Apartment sx={{ mr: 1 }} /> Request Management
                  </Typography>
                  <Typography>
                    Total Requests:{" "}
                    <CountUp end={hostelApplyCounts.total} duration={2} />
                  </Typography>
                  <Typography>
                    Accepted:{" "}
                    <CountUp end={hostelApplyCounts.accepted} duration={2} />
                  </Typography>
                  <Typography>
                    Rejected:{" "}
                    <CountUp end={hostelApplyCounts.rejected} duration={2} />
                  </Typography>
                  <Typography>
                    Pending:{" "}
                    <CountUp end={hostelApplyCounts.pending} duration={2} />
                  </Typography>
                  <Typography>
                    Total Approved Emails:{" "}
                    <CountUp end={approvedEmailsCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={handleViewAllRegistrations}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Description sx={{ mr: 1 }} /> Registration Management
                  </Typography>
                  <Typography>
                    Total Registrations:{" "}
                    <CountUp end={registrationCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

           
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllNotices}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Notifications sx={{ mr: 1 }} /> Notice Management
                  </Typography>
                  <Typography>
                    Total Notices: <CountUp end={noticeCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllComplaints}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Work sx={{ mr: 1 }} /> Complaint Management
                  </Typography>
                  <Typography>
                    Total Complaints:{" "}
                    <CountUp end={complaintCounts.total} duration={2} />
                  </Typography>
                  <Typography>
                    Resolved Complaints:{" "}
                    <CountUp end={complaintCounts.resolved} duration={2} />
                  </Typography>
                  <Typography>
                    Unresolved Complaints:{" "}
                    <CountUp end={complaintCounts.unresolved} duration={2} />
                  </Typography>
                  <Typography>
                    Processing Complaints:{" "}
                    <CountUp end={complaintCounts.processing} duration={2} />
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (complaintCounts.resolved / complaintCounts.total) * 100
                    }
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllHostels}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <House sx={{ mr: 1 }} /> Hostel Management
                  </Typography>
                  <Typography>
                    Total Hostels:{" "}
                    <CountUp end={hostelCount.total} duration={2} />
                  </Typography>
                  <Typography>
                    Filled Hostels:{" "}
                    <CountUp end={hostelCount.filled} duration={2} />
                  </Typography>
                  <Typography>
                    Available Hostels:{" "}
                    <CountUp end={hostelCount.notFilled} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

         
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllStaff}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <PeopleAlt sx={{ mr: 1 }} /> Staff Management
                  </Typography>
                  <Typography>
                    Total Staff: <CountUp end={staffCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

         
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Complaints Overview</Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Resolved", "Unresolved", "Processing"],
                      },
                    ]}
                    series={[
                      {
                        data: [
                          complaintCounts.resolved,
                          complaintCounts.unresolved,
                          complaintCounts.processing,
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

           
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Hostel Occupancy</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: hostelCount.filled, label: "Filled" },
                          {
                            id: 1,
                            value: hostelCount.notFilled,
                            label: "Available",
                          },
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">User Distribution</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: userCounts.admin, label: "Admins" },
                          { id: 1, value: userCounts.staff, label: "Staff" },
                          {
                            id: 2,
                            value: userCounts.student,
                            label: "Students",
                          },
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    Hostel Application Status
                  </Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Accepted", "Rejected", "Pending"],
                      },
                    ]}
                    series={[
                      {
                        data: [
                          hostelApplyCounts.accepted,
                          hostelApplyCounts.rejected,
                          hostelApplyCounts.pending,
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

   
          {showAddStudentForm && (
            <Box sx={{ marginTop: 4 }}>
              <AddStudentForm updateStudentCount={updateStudentCount} />
            </Box>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AdminDashboard;*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CssBaseline,
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PersonAdd,
  Visibility,
  Notifications,
  Group,
  Description,
  Apartment,
  Work,
  PeopleAlt,
  House,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { BarChart, PieChart } from "@mui/x-charts";
import AddStudentForm from "../components/StudentForm"; // Import your AddStudentForm component
import CountUp from "react-countup"; // For animated counters

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
            },
          }
        : {
            background: {
              default: "#121212",
            },
          }),
    },
    typography: {
      h5: {
        fontWeight: "bold",
        color: mode === "light" ? "black" : "white",
      },
      body1: {
        color: mode === "light" ? "black" : "white",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: mode === "light" ? "#fff" : "#1e1e1e",
            height: "100%",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            textTransform: "none",
            padding: "10px 20px",
          },
        },
      },
    },
  });

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [count, setCount] = useState(0);
  const [complaintCounts, setComplaintCounts] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
    processing: 0,
  });
  const [hostelApplyCounts, setHostelApplyCounts] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [staffCount, setStaffCount] = useState(0);
  const [userCounts, setUserCounts] = useState({
    total: 0,
    admin: 0,
    staff: 0,
    student: 0,
  });
  const [noticeCount, setNoticeCount] = useState(0);
  const [approvedEmailsCount, setApprovedEmailsCount] = useState(0);
  const [hostelCount, setHostelCount] = useState({
    total: 0,
    filled: 0,
    notFilled: 0,
  });
  const [registrationCount, setRegistrationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentCountRes,
          staffCountRes,
          noticeCountRes,
          approvedEmailsCountRes,
          hostelCountRes,
          complaintCountsRes,
          hostelApplyCountsRes,
          userCountsRes,
          registrationCountRes,
        ] = await Promise.all([
          fetch("/api/dashboard/studentCount"),
          fetch("/api/dashboard/staffCount"),
          fetch("/api/dashboard/noticeCount"),
          fetch("/api/dashboard/approvedEmailsCount"),
          fetch("/api/dashboard/hostelCount"),
          fetch("/api/dashboard/complaintCount"),
          fetch("/api/dashboard/hostelApplyCount"),
          fetch("/api/dashboard/userCount"),
          fetch("/api/dashboard/registerCount"),
        ]);

        const [
          studentCountData,
          staffCountData,
          noticeCountData,
          approvedEmailsCountData,
          hostelCountData,
          complaintCountsData,
          hostelApplyCountsData,
          userCountsData,
          registrationCountData,
        ] = await Promise.all([
          studentCountRes.json(),
          staffCountRes.json(),
          noticeCountRes.json(),
          approvedEmailsCountRes.json(),
          hostelCountRes.json(),
          complaintCountsRes.json(),
          hostelApplyCountsRes.json(),
          userCountsRes.json(),
          registrationCountRes.json(),
        ]);

        setCount(studentCountData.count);
        setStaffCount(staffCountData.count);
        setNoticeCount(noticeCountData.count);
        setApprovedEmailsCount(approvedEmailsCountData.count);
        setHostelCount({
          total: hostelCountData.totalCount,
          filled: hostelCountData.filledCount,
          notFilled: hostelCountData.notFilledCount,
        });
        setComplaintCounts({
          total: complaintCountsData.totalCount,
          resolved: complaintCountsData.resolvedCount,
          unresolved: complaintCountsData.unresolvedCount,
          processing: complaintCountsData.processingCount,
        });
        setHostelApplyCounts({
          total: hostelApplyCountsData.totalCount,
          accepted: hostelApplyCountsData.acceptedCount,
          rejected: hostelApplyCountsData.rejectedCount,
          pending: hostelApplyCountsData.pendingCount,
        });
        setUserCounts({
          total: userCountsData.totalCount,
          admin: userCountsData.adminCount,
          staff: userCountsData.staffCount,
          student: userCountsData.studentCount,
        });
        setRegistrationCount(registrationCountData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleAddStudentClick = () => {
    setShowAddStudentForm((prev) => !prev);
  };

  const updateStudentCount = (newCount) => {
    setCount(newCount);
  };

  const handleViewAllRequests = () => navigate("/applyrequests");
  const handleViewAllUsers = () => navigate("/users");
  const handleAddUser = () => navigate("/adduser");
  const handleViewAllRegistrations = () => navigate("/register");
  const handleViewAllStudents = () => navigate("/students");
  const handleViewAllComplaints = () => navigate("/complaints");
  const handleViewAllNotices = () => navigate("/notices");
  const handleViewAllApprovedEmails = () => navigate("/approvedEmails");
  const handleViewAllStaff = () => navigate("/staff");
  const handleViewAllHostels = () => navigate("/hostels");

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="main-content">
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <Container component="main">
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            {/* User Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllUsers}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Group sx={{ mr: 1 }} /> User Management
                  </Typography>
                  <Typography>
                    Total Users: <CountUp end={userCounts.total} duration={2} />
                  </Typography>
                  <Typography>
                    Admins: <CountUp end={userCounts.admin} duration={2} />
                  </Typography>
                  <Typography>
                    Staff: <CountUp end={userCounts.staff} duration={2} />
                  </Typography>
                  <Typography>
                    Students: <CountUp end={userCounts.student} duration={2} />
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>

            {/* Student Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllStudents}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <PeopleAlt sx={{ mr: 1 }} /> Student Management
                  </Typography>
                  <Typography>
                    Total Students: <CountUp end={count} duration={2} />
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>

            {/* Request Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllRequests}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Apartment sx={{ mr: 1 }} /> Request Management
                  </Typography>
                  <Typography>
                    Total Requests:{" "}
                    <CountUp end={hostelApplyCounts.total} duration={2} />
                  </Typography>
                  <Typography>
                    Accepted:{" "}
                    <CountUp end={hostelApplyCounts.accepted} duration={2} />
                  </Typography>
                  <Typography>
                    Rejected:{" "}
                    <CountUp end={hostelApplyCounts.rejected} duration={2} />
                  </Typography>
                  <Typography>
                    Pending:{" "}
                    <CountUp end={hostelApplyCounts.pending} duration={2} />
                  </Typography>
                  <Typography>
                    Total Approved Emails:{" "}
                    <CountUp end={approvedEmailsCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Registration Management Section */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={handleViewAllRegistrations}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Description sx={{ mr: 1 }} /> Registration Management
                  </Typography>
                  <Typography>
                    Total Registrations:{" "}
                    <CountUp end={registrationCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Notice Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllNotices}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Notifications sx={{ mr: 1 }} /> Notice Management
                  </Typography>
                  <Typography>
                    Total Notices: <CountUp end={noticeCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Complaint Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllComplaints}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <Work sx={{ mr: 1 }} /> Complaint Management
                  </Typography>
                  <Typography>
                    Total Complaints:{" "}
                    <CountUp end={complaintCounts.total} duration={2} />
                  </Typography>
                  <Typography>
                    Resolved Complaints:{" "}
                    <CountUp end={complaintCounts.resolved} duration={2} />
                  </Typography>
                  <Typography>
                    Unresolved Complaints:{" "}
                    <CountUp end={complaintCounts.unresolved} duration={2} />
                  </Typography>
                  <Typography>
                    Processing Complaints:{" "}
                    <CountUp end={complaintCounts.processing} duration={2} />
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (complaintCounts.resolved / complaintCounts.total) * 100
                    }
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Hostel Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllHostels}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <House sx={{ mr: 1 }} /> Hostel Management
                  </Typography>
                  <Typography>
                    Total Hostels:{" "}
                    <CountUp end={hostelCount.total} duration={2} />
                  </Typography>
                  <Typography>
                    Filled Hostels:{" "}
                    <CountUp end={hostelCount.filled} duration={2} />
                  </Typography>
                  <Typography>
                    Available Hostels:{" "}
                    <CountUp end={hostelCount.notFilled} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Staff Management Section */}
            <Grid item xs={12} sm={6} md={4} onClick={handleViewAllStaff}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    <PeopleAlt sx={{ mr: 1 }} /> Staff Management
                  </Typography>
                  <Typography>
                    Total Staff: <CountUp end={staffCount} duration={2} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            {/* Complaints Overview Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Complaints Overview</Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Resolved", "Unresolved", "Processing"],
                      },
                    ]}
                    series={[
                      {
                        data: [
                          complaintCounts.resolved,
                          complaintCounts.unresolved,
                          complaintCounts.processing,
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Hostel Occupancy Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Hostel Occupancy</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: hostelCount.filled, label: "Filled" },
                          {
                            id: 1,
                            value: hostelCount.notFilled,
                            label: "Available",
                          },
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* User Distribution Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">User Distribution</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: userCounts.admin, label: "Admins" },
                          { id: 1, value: userCounts.staff, label: "Staff" },
                          {
                            id: 2,
                            value: userCounts.student,
                            label: "Students",
                          },
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Hostel Application Status Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    Hostel Application Status
                  </Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Accepted", "Rejected", "Pending"],
                      },
                    ]}
                    series={[
                      {
                        data: [
                          hostelApplyCounts.accepted,
                          hostelApplyCounts.rejected,
                          hostelApplyCounts.pending,
                        ],
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Conditional Rendering of AddStudentForm */}
          {showAddStudentForm && (
            <Box sx={{ marginTop: 4 }}>
              <AddStudentForm updateStudentCount={updateStudentCount} />
            </Box>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AdminDashboard;
