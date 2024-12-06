import React, { useEffect, useState } from "react";
import { Typography, Paper, CircularProgress, Box } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const StudentDetails = () => {
  const { user } = useAuthContext();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`/api/student?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Could not fetch student details");
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchStudentDetails();
    }
  }, [user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!student)
    return <Typography>No details available for this student.</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Student Details
      </Typography>
      <Typography variant="body1">
        <strong>Name:</strong> {student.name}
      </Typography>
      <Typography variant="body1">
        <strong>Registration No:</strong> {student.regNo}
      </Typography>
      <Typography variant="body1">
        <strong>Gender:</strong> {student.gender}
      </Typography>
      <Typography variant="body1">
        <strong>Registering Year:</strong> {student.registeringYear}
      </Typography>
      <Typography variant="body1">
        <strong>Hostel:</strong> {student.hostel}
      </Typography>
      <Typography variant="body1">
        <strong>Faculty:</strong> {student.faculty}
      </Typography>
      <Typography variant="body1">
        <strong>Department:</strong> {student.department}
      </Typography>
      <Typography variant="body1">
        <strong>Address:</strong> {student.address}
      </Typography>
      <Typography variant="body1">
        <strong>Contact No:</strong> {student.contactNo}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {student.email}
      </Typography>
      <Typography variant="body1">
        <strong>Parent's Contact No:</strong> {student.parentNo}
      </Typography>
    </Paper>
  );
};

export default StudentDetails;
