/*import React, { useEffect, useState } from "react";
import NoticeDetails from "../components/NoticeDetails";
import AddNoticeForm from "../components/NoticeForm";

const Notice = () => {
  const [notices, setNotices] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await fetch("/api/notices");
      const json = await response.json();

      if (response.ok) {
        setNotices(json);
      }
    };
    fetchNotices();
  }, [notices]);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const containerStyle = {
    display: "flex",
    padding: "20px",
  };

  const noticesStyle = {
    flex: showForm ? "2" : "1",
    marginRight: showForm ? "20px" : "0",
    overflowY: "auto",
    //maxHeight: "70vh",
  };

  const addNoticeStyle = {
    flex: "1",
    border: "1px solid #ccc",
    //padding: "20px",
    backgroundColor: "#f9f9f9",
    display: showForm ? "block" : "none",
    maxHeight: "60vh",
  };

  return (
    <div className="main-content">
      <button onClick={toggleForm} className="noticeButton">
        {showForm ? "Hide Form" : "+ Add Notice"}
      </button>
      <div style={containerStyle}>
        <div style={noticesStyle}>
          {notices &&
            notices.map((notice) => (
              <NoticeDetails key={notice.id} notice={notice} />
            ))}
        </div>
        <div style={addNoticeStyle}>
          <AddNoticeForm />
        </div>
      </div>
    </div>
  );
};

export default Notice;*/
/*import React, { useEffect, useState } from "react";
import NoticeDetails from "../components/NoticeDetails";
import AddNoticeForm from "../components/NoticeForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Notice = () => {
  const { user } = useAuthContext(); // Get the user from context
  const [notices, setNotices] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const response = await fetch("/api/notices");
    const json = await response.json();

    if (response.ok) {
      setNotices(json);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setCurrentNotice(null); // Reset the form when toggling
  };

  const handleEdit = (notice) => {
    setCurrentNotice(notice);
    setShowForm(true); // Show form when editing
  };

  const handleFormSubmit = () => {
    fetchNotices(); // Refresh the notices after submission
    setShowForm(false); // Optionally hide the form
  };

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isAdminOrStaff && (
        <button onClick={toggleForm} className="noticeButton">
          {showForm ? "Hide Form" : "+ Add Notice"}
        </button>
      )}
      <div style={{ display: "flex", padding: "20px" }}>
        <div
          style={{
            flex: showForm ? "2" : "1",
            marginRight: showForm ? "20px" : "0",
            overflowY: "auto",
          }}
        >
          {notices &&
            notices.map((notice) => (
              <NoticeDetails
                key={notice._id}
                notice={notice}
                onEdit={handleEdit}
                onDeleteSuccess={fetchNotices}
                canEditDelete={isAdminOrStaff} // Pass role check to NoticeDetails
              />
            ))}
        </div>
        {showForm &&
          isAdminOrStaff && ( // Show form only for Admin/Staff
            <div
              style={{
                flex: "1",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                maxHeight: "60vh",
              }}
            >
              <AddNoticeForm
                initialValues={currentNotice || {}}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default Notice;*/
/*11.03
import React, { useEffect, useState } from "react";
import NoticeDetails from "../components/NoticeDetails";
import AddNoticeForm from "../components/NoticeForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "@mui/material"; // Import MUI Button

const Notice = () => {
  const { user } = useAuthContext(); // Get the user from context
  const [notices, setNotices] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const response = await fetch("/api/notices");
    const json = await response.json();

    if (response.ok) {
      setNotices(json);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setCurrentNotice(null); // Reset the form when toggling
  };

  const handleEdit = (notice) => {
    setCurrentNotice(notice);
    setShowForm(true); // Show form when editing
  };

  const handleFormSubmit = () => {
    fetchNotices(); // Refresh the notices after submission
    setShowForm(false); // Hide the form after submission
  };

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isAdminOrStaff && (
        <Button
          onClick={toggleForm}
          style={{ marginBottom: "0px" }} // Add margin for spacing
        >
          {showForm ? "Back " : "+ Add Notice"}
        </Button>
      )}

      {showForm ? (
        isAdminOrStaff && ( // Show form only for Admin/Staff
          <div
            style={{
              border: "none",
              marginTop: "0px",
              //maxHeight: "60vh",
            }}
          >
            <AddNoticeForm
              initialValues={currentNotice || {}}
              onSubmit={handleFormSubmit}
            />
          </div>
        )
      ) : (
        <div style={{ display: "flex", padding: "20px" }}>
          <div style={{ flex: "1", overflowY: "auto" }}>
            {notices &&
              notices.map((notice) => (
                <NoticeDetails
                  key={notice._id}
                  notice={notice}
                  onEdit={handleEdit}
                  onDeleteSuccess={fetchNotices}
                  canEditDelete={isAdminOrStaff} // Pass role check to NoticeDetails
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;*/
/*2025
import React, { useEffect, useState } from "react";
import NoticeDetails from "../components/NoticeDetails";
import AddNoticeForm from "../components/NoticeForm";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const Notice = () => {
  const { user } = useAuthContext();
  const [notices, setNotices] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const response = await fetch("/api/notices");
    const json = await response.json();

    if (response.ok) {
      setNotices(json);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setCurrentNotice(null);
  };

  const handleEdit = (notice) => {
    setCurrentNotice(notice);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    fetchNotices();
    setShowForm(false);
  };

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff";

  return (
    <Box className="main-content" sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Hostel Notices
      </Typography>

      {isAdminOrStaff && (
        <Button onClick={toggleForm} color="primary" sx={{ mb: 3 }}>
          {showForm ? "Back to Notices" : "+ Add Notice"}
        </Button>
      )}

      {showForm ? (
        isAdminOrStaff && (
          <Box sx={{ marginTop: "20px", width: "100%" }}>
            <AddNoticeForm
              initialValues={currentNotice || {}}
              onSubmit={handleFormSubmit}
            />
          </Box>
        )
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {notices &&
            notices.map((notice) => (
              <Grid item xs={12} sm={6} md={4} key={notice._id}>
                <Card
                  variant="outlined"
                  sx={{
                    minHeight: "150px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {notice.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {new Date(notice.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      {notice.description}
                    </Typography>
                  </CardContent>
                  {isAdminOrStaff && (
                    <Box
                      sx={{
                        mt: "auto",
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        onClick={() => handleEdit(notice)}
                        variant="outlined"
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this notice?"
                            )
                          ) {
                            // Call delete function here if implemented
                            fetchNotices();
                          }
                        }}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Notice;*/

import React, { useEffect, useState } from "react";
import AddNoticeForm from "../components/NoticeForm";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Modal,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import colors from "../config/colors";
import { motion } from "framer-motion";

const Notice = () => {
  const { user } = useAuthContext();
  const [notices, setNotices] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [viewNotice, setViewNotice] = useState(null); // For modal

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const response = await fetch("/api/notices");
    const json = await response.json();

    if (response.ok) {
      setNotices(json);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setCurrentNotice(null);
  };

  const handleEdit = (notice) => {
    setCurrentNotice(notice);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const response = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchNotices();
      }
    }
  };

  const openViewModal = (notice) => {
    setViewNotice(notice);
  };

  const closeViewModal = () => {
    setViewNotice(null);
  };

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff";

  return (
    <Box className="main-content" sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Hostel Notices
      </Typography>

      {isAdminOrStaff && (
        <Button
          onClick={toggleForm}
          variant="contained"
          color="rgb(81,1,2)"
          sx={{
            mb: 3,
            background: "#eef2f3",
            "&:hover": { background: "#8e9eab" },
          }}
        >
          {showForm ? "Back to Notices" : "+ Add Notice"}
        </Button>
      )}

      {showForm ? (
        isAdminOrStaff && (
          <Box sx={{ marginTop: "20px", width: "100%" }}>
            <AddNoticeForm
              initialValues={currentNotice || {}}
              onSubmit={fetchNotices}
            />
          </Box>
        )
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {notices &&
            notices.map((notice) => (
              <Grid item xs={12} sm={6} md={4} key={notice._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardContent sx={{ padding: "16px" }}>
                      {/* Title Section */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {notice.title}
                      </Typography>

                      {/* Divider */}
                      <Divider sx={{ my: 1 }} />

                      {/* View Button - Left Aligned and Smaller */}
                      <Button
                        onClick={() => openViewModal(notice)}
                        variant="contained"
                        style={{
                          backgroundColor: colors.secondary,
                          color: "white",
                        }}
                        size="small"
                        sx={{ mt: 1, textTransform: "none", width: "auto" }}
                      >
                        View
                      </Button>

                      {/* Admin/Staff Icons */}
                      {isAdminOrStaff && (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "flex-end", // This keeps edit/delete buttons on the right
                            gap: 1,
                          }}
                        >
                          <Tooltip title="Edit Notice">
                            <IconButton
                              onClick={() => handleEdit(notice)}
                              sx={{ color: "black", fontSize: "18px" }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Notice">
                            <IconButton
                              onClick={() => handleDelete(notice._id)}
                              sx={{ color: "black", fontSize: "18px" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      )}

      {/* Modal for Viewing Full Notice */}
      {viewNotice && (
        <Modal
          open={!!viewNotice}
          onClose={closeViewModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "12px",
              boxShadow: 24,
              p: 3,
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh", // Limit modal height
              overflowY: "auto", // Scrollable content
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Tooltip title="Back">
                <IconButton onClick={closeViewModal}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                {viewNotice.title}
              </Typography>
              <IconButton onClick={closeViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, mb: 2 }}
            >
              {new Date(viewNotice.createdAt).toLocaleString()}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography
              variant="body2"
              sx={{
                maxHeight: "50vh",
                overflowY: "auto", // Scrollable content
                textAlign: "left",
              }}
            >
              {viewNotice.description}
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Notice;
