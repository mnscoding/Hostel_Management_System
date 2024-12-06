import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  Box,
} from "@mui/material";
import { Grid } from "@mui/material";
import AddStudentForm from "../components/StudentForm"; // Import your AddStudentForm component

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
  //const [hostelCount, setHostelCount] = useState(0);
  const [hostelCount, setHostelCount] = useState({
    total: 0,
    filled: 0,
    notFilled: 0,
  });

  useEffect(() => {
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

    /*const fetchHostelCount = async () => {
      try {
        const response = await fetch("/api/dashboard/hostelCount");
        const data = await response.json();
        setHostelCount(data.count);
      } catch (error) {
        console.error("Error fetching hostelcount:", error);
      }
    };*/
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
        const response = await fetch("/api/dashboard/complaintCount"); // Adjust API endpoint as needed
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
        const response = await fetch("/api/dashboard/hostelApplyCount"); // Adjust API endpoint as needed
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
        const response = await fetch("/api/dashboard/userCount"); // Adjust API endpoint as needed
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

    fetchStudentCount();
    fetchComplaintCounts();
    fetchNoticeCount();
    fetchHostelCount();
    fetchUserCounts();
    fetchStaffCount();
    fetchHostelApplyCounts();
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

  return (
    <div className="main-content">
      <Container component="main">
        <CssBaseline />
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {/* User Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">User Management</Typography>
                <Typography>Total Users: {userCounts.total}</Typography>
                <Typography>Admins: {userCounts.admin}</Typography>
                <Typography>Staff: {userCounts.staff}</Typography>
                <Typography>Students: {userCounts.student}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleAddUser}>
                  Add New User
                </Button>
                <Button size="small" onClick={handleViewAllUsers}>
                  View All Users
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Request Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Request Management</Typography>
                <Typography>
                  Total Requests:{hostelApplyCounts.total}
                </Typography>
                <Typography>Accepted:{hostelApplyCounts.accepted} </Typography>
                <Typography>Rejected:{hostelApplyCounts.rejected} </Typography>
                <Typography>Pendingss:{hostelApplyCounts.pending} </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add New User</Button>
                <Button size="small" onClick={handleViewAllRequests}>
                  View Request
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Registration Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Registrations Management</Typography>
                <Typography>All: </Typography>
                <Typography>Assigned: </Typography>
                <Typography>Not Assigned: </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleAddUser}>
                  Add New User
                </Button>
                <Button size="small" onClick={handleViewAllRegistrations}>
                  View Registrations
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Notice Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Notice Management</Typography>
                <Typography>Total Notices: {noticeCount}</Typography>
                <Typography>Active Notices: [Count]</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Create New Notice</Button>
                <Button size="small" onClick={handleViewAllNotices}>
                  View All Notices
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Complaint Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Complaint Management</Typography>
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

          {/* Student Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Student Management</Typography>
                <Typography>Total Students: {count}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleViewAllStudents}>
                  View All Students
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Hostel Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Hostel Management</Typography>
                <Typography>Total Hostels: {hostelCount.total}</Typography>
                <Typography>Filled Hostels: {hostelCount.filled}</Typography>
                <Typography>
                  Avilable Hostels: {hostelCount.notFilled}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add New Hostel</Button>
                <Button size="small">View All Hostels</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Staff Management Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Staff Management</Typography>
                <Typography>Total Staff: {staffCount}</Typography>
                <Typography>Active Staff: [Count]</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add New Staff Member</Button>
                <Button size="small">View All Staff</Button>
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
  );
};

export default AdminDashboard;
