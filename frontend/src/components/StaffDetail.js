/*import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../hooks/useAuthContext";

const StaffDetail = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/staff/staff");
        if (!response.ok) throw new Error("Failed to fetch staff data");
        const data = await response.json();
        setStaffMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/staff/staff/${staffToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete staff member");
      setStaffMembers((prevMembers) =>
        prevMembers.filter((staff) => staff._id !== staffToDelete)
      );
    } catch (err) {
      console.error("Error deleting staff member:", err.message);
    } finally {
      setOpenConfirmDialog(false);
      setStaffToDelete(null);
    }
  };

  const handleEditOpen = (staff) => {
    setCurrentStaff(staff);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentStaff(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/staff/staff/${currentStaff._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStaff),
        }
      );
      if (!response.ok) throw new Error("Failed to update staff member");
      const updatedStaff = await response.json();
      setStaffMembers((prevMembers) =>
        prevMembers.map((staff) =>
          staff._id === updatedStaff._id ? updatedStaff : staff
        )
      );
      handleEditClose();
    } catch (err) {
      console.error("Error updating staff member:", err.message);
    }
  };

  const canDelete = user?.category === "Admin" || (user && user.email);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {staffMembers.map((staff) => (
          <Grid item xs={12} sm={6} md={4} key={staff._id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mt: 2,
                  mr: 2,
                  gap: 1, // Reduced gap between buttons
                }}
              >
                {canDelete && (
                  <>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setStaffToDelete(staff._id);
                        setOpenConfirmDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditOpen(staff)}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  paddingLeft: "20px",
                  mb: 0,
                }}
              >
                <Avatar
                  alt={`${staff.name}'s profile`}
                  src={staff.filepath}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "1px solid rgb(81, 1, 2)",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: "left", padding: "20px" }}>
                <Typography
                  variant="h6"
                  noWrap={false}
                  sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {staff.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Position: {staff.position}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Address: {staff.address}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Contact: {staff.contactNo}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Email: {staff.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Staff Member</DialogTitle>
        <DialogContent>
          {currentStaff && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.name}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="position"
                label="Position"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.position}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.address}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="contactNo"
                label="Contact Number"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.contactNo}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={currentStaff.email}
                onChange={handleEditChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this staff member?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffDetail;*/
/*11.03
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../hooks/useAuthContext";

const StaffDetail = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const { user } = useAuthContext();

  const role = user?.category;

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/staff/staff");
        if (!response.ok) throw new Error("Failed to fetch staff data");
        const data = await response.json();
        setStaffMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/staff/staff/${staffToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete staff member");
      setStaffMembers((prevMembers) =>
        prevMembers.filter((staff) => staff._id !== staffToDelete)
      );
    } catch (err) {
      console.error("Error deleting staff member:", err.message);
    } finally {
      setOpenConfirmDialog(false);
      setStaffToDelete(null);
    }
  };

  const handleEditOpen = (staff) => {
    setCurrentStaff(staff);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentStaff(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/staff/staff/${currentStaff._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStaff),
        }
      );
      if (!response.ok) throw new Error("Failed to update staff member");
      const updatedStaff = await response.json();
      setStaffMembers((prevMembers) =>
        prevMembers.map((staff) =>
          staff._id === updatedStaff._id ? updatedStaff : staff
        )
      );
      handleEditClose();
    } catch (err) {
      console.error("Error updating staff member:", err.message);
    }
  };

  const canEditOrDelete = (staffEmail) => {
    return user?.category === "Admin" || user?.email === staffEmail;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {staffMembers.map((staff) => (
          <Grid item xs={12} sm={6} md={4} key={staff._id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mt: 2,
                  mr: 2,
                  gap: 1,
                }}
              >
                {canEditOrDelete(staff.email) && (
                  <>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setStaffToDelete(staff._id);
                        setOpenConfirmDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditOpen(staff)}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  paddingLeft: "20px",
                  mb: 0,
                }}
              >
                <Avatar
                  alt={`${staff.name}'s profile`}
                  src={staff.filepath}
                  sx={{
                    width: 80,
                    height: 80,
                    //border: "1px solid rgb(81, 1, 2)",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: "left", padding: "20px" }}>
                <Typography
                  variant="h6"
                  noWrap={false}
                  sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {staff.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Position: {staff.position}
                </Typography>
                {(role === "Admin" || role === "Staff") && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    noWrap={false}
                  >
                    Address: {staff.address}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Contact: {staff.contactNo}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap={false}
                >
                  Email: {staff.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Staff Member</DialogTitle>
        <DialogContent>
          {currentStaff && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.name}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="position"
                label="Position"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.position}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.address}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="contactNo"
                label="Contact Number"
                type="text"
                fullWidth
                variant="outlined"
                value={currentStaff.contactNo}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={currentStaff.email}
                onChange={handleEditChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this staff member?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffDetail;*/
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../hooks/useAuthContext";

const StaffDetail = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const { user } = useAuthContext();
  const role = user?.category;

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/staff/staff");
        if (!response.ok) throw new Error("Failed to fetch staff data");
        const data = await response.json();
        setStaffMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/staff/staff/${staffToDelete}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete staff member");
      setStaffMembers((prevMembers) =>
        prevMembers.filter((staff) => staff._id !== staffToDelete)
      );
    } catch (err) {
      console.error("Error deleting staff member:", err.message);
    } finally {
      setOpenConfirmDialog(false);
      setStaffToDelete(null);
    }
  };

  const handleEditOpen = (staff) => {
    setCurrentStaff(staff);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentStaff(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/staff/staff/${currentStaff._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentStaff),
        }
      );
      if (!response.ok) throw new Error("Failed to update staff member");
      const updatedStaff = await response.json();
      setStaffMembers((prevMembers) =>
        prevMembers.map((staff) =>
          staff._id === updatedStaff._id ? updatedStaff : staff
        )
      );
      handleEditClose();
    } catch (err) {
      console.error("Error updating staff member:", err.message);
    }
  };

  const canEditOrDelete = (staffEmail) =>
    user?.category === "Admin" || user?.email === staffEmail;

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  if (error)
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );

  return (
    <>
      <div className="main-content">
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {staffMembers.map((staff) => (
            <Grid item xs={12} sm={6} md={4} key={staff._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  {canEditOrDelete(staff.email) && (
                    <>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setStaffToDelete(staff._id);
                          setOpenConfirmDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditOpen(staff)}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: -2 }}>
                  <Avatar
                    src={staff.filepath}
                    alt={staff.name}
                    sx={{ width: 80, height: 80, mb: 1 }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#800000", fontWeight: "bold" }}
                  >
                    {staff.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Position: {staff.position}
                  </Typography>
                  {(role === "Admin" || role === "Staff") && (
                    <Typography variant="body2" color="textSecondary">
                      Address: {staff.address}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    Contact: {staff.contactNo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {staff.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openEditDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogContent>
            {currentStaff && (
              <>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  label="Name"
                  name="name"
                  value={currentStaff.name}
                  onChange={handleEditChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Position"
                  name="position"
                  value={currentStaff.position}
                  onChange={handleEditChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Address"
                  name="address"
                  value={currentStaff.address}
                  onChange={handleEditChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Contact Number"
                  name="contactNo"
                  value={currentStaff.contactNo}
                  onChange={handleEditChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Email"
                  name="email"
                  value={currentStaff.email}
                  onChange={handleEditChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this staff member?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default StaffDetail;
