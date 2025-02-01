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
            {/* User Management Section */}
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

            {/* Student Management Section */}
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

            {/* Request Management Section */}
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

            {/* Registration Management Section */}
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

            {/* Notice Management Section */}
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

            {/* Complaint Management Section */}
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

            {/* Hostel Management Section */}
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

            {/* Staff Management Section */}
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

          {/* Conditional Rendering of AddStudentForm */}
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

export default AdminDashboard;
