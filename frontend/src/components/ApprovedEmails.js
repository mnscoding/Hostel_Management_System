/*02.04
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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ApprovedEmails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const categories = ["Admin", "Student", "Staff"]; // Define categories

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/approvedEmails"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (user) => (selectedCategory ? user.category === selectedCategory : true) // Filter by category if selected
    );

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/approvedEmails/${currentUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? currentUser : user
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/approvedEmails/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
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
          Approved Emails
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search by email..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "250px", mr: 2 }}
          />
          <TextField
            select
            variant="outlined"
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: "150px" }}
          >
            <MenuItem value="">All Users</MenuItem> 
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={0}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} key={user._id}>
              <Card variant="outlined" sx={{ mb: 0 }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1" display="inline">
                        Email: {user.email} &nbsp;
                      </Typography>
                      <Typography variant="body1" display="inline">
                        Category: {user.category} &nbsp;
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleDelete(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          {currentUser && (
            <>
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                select
                value={currentUser.category}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
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

export default ApprovedEmails;*/

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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

// Custom styled components for a premium look
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "8px",
  padding: "8px 16px",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: theme.spacing(2),
  },
}));

const ApprovedEmails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Admin", "Student", "Staff"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/approvedEmails"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) =>
      selectedCategory ? user.category === selectedCategory : true
    );

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/approvedEmails/${currentUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === currentUser._id ? currentUser : user
        )
      );

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/approvedEmails/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 0, p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: "2.25rem",
            color: "#333",
            letterSpacing: "0.5px",
            lineHeight: 1.3,
          }}
        >
          Approved Emails
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            variant="outlined"
            placeholder="Search by email..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "250px" }}
          />
          <TextField
            select
            variant="outlined"
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: "150px" }}
          >
            <MenuItem value="">All Users</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} key={user._id}>
              <StyledCard>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        display="inline"
                        sx={{ fontWeight: 500 }}
                      >
                        Email: {user.email} &nbsp;
                      </Typography>
                      <Typography
                        variant="body1"
                        display="inline"
                        sx={{ color: "#666" }}
                      >
                        Category: {user.category} &nbsp;
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleDelete(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog for Editing User */}
      <StyledDialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{ fontWeight: 600, fontSize: "1.5rem", color: "#333" }}
        >
          Edit User Details
        </DialogTitle>
        <DialogContent>
          {currentUser && (
            <>
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                select
                value={currentUser.category}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseDialog} color="primary">
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleUpdate}
            color="primary"
            variant="contained"
          >
            Update
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default ApprovedEmails;
