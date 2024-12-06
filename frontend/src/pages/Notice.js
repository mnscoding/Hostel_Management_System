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

export default Notice;
