/*import React, { useEffect, useState } from "react";
import ComplaintDetails from "../components/ComplaintDetails";
import ComplaintForm from "../components/ComplaintForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Complaint = () => {
  const { user } = useAuthContext(); // Get the user from context
  const [complaints, setComplaints] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const response = await fetch("/api/complaints");
    const json = await response.json();

    if (response.ok) {
      setComplaints(json);
    }
  };

  const handleDelete = async (complaintId) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComplaints((prev) =>
        prev.filter((complaint) => complaint._id !== complaintId)
      );
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormSubmit = () => {
    fetchComplaints(); // Refresh the complaints after submission
    setShowForm(false); // Optionally hide the form
  };

  const isStudentOrStaff =
    user?.category === "Student" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isStudentOrStaff && (
        <button onClick={toggleForm} className="complaintButton">
          {showForm ? "Hide Form" : "+ Add Complaint"}
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
          {complaints &&
            complaints.map((complaint) => (
              <ComplaintDetails
                key={complaint._id}
                complaint={complaint}
                onDelete={
                  user?.email === complaint.user_id ||
                  user?.category === "Admin"
                    ? handleDelete
                    : null
                }
              />
            ))}
        </div>
        {showForm &&
          isStudentOrStaff && ( // Show form only for Student/Staff
            <div
              style={{
                flex: "1",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                maxHeight: "60vh",
              }}
            >
              <ComplaintForm onSubmit={handleFormSubmit} />
            </div>
          )}
      </div>
    </div>
  );
};

export default Complaint;*/
/*import React, { useEffect, useState } from "react";
import ComplaintDetails from "../components/ComplaintDetails";
import ComplaintForm from "../components/ComplaintForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Complaint = () => {
  const { user } = useAuthContext();
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const response = await fetch("/api/complaints");
    const json = await response.json();

    if (response.ok) {
      setComplaints(json);
    }
  };

  const handleDelete = async (complaintId) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComplaints((prev) =>
        prev.filter((complaint) => complaint._id !== complaintId)
      );
    }
  };

  const handleEdit = (complaint) => {
    setCurrentComplaint(complaint);
    setShowForm(true);
  };

  const handleResolve = async (complaintId, newStatus) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }), // Include status
    });

    if (response.ok) {
      fetchComplaints(); // Refresh the complaints after resolving
    }
  };

  const handleFormSubmit = () => {
    fetchComplaints();
    setShowForm(false);
    setCurrentComplaint(null);
  };

  const isStudentOrStaff =
    user?.category === "Student" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isStudentOrStaff && (
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="complaintButton"
        >
          {showForm ? "Hide Form" : "+ Add Complaint"}
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
          {complaints.map((complaint) => (
            <ComplaintDetails
              key={complaint._id}
              complaint={complaint}
              onDelete={
                user?.email === complaint.user_id || user?.category === "Admin"
                  ? handleDelete
                  : null
              }
              onEdit={user?.email === complaint.user_id && handleEdit}
              onResolve={
                user?.category === "Admin" || user?.category === "Staff"
                  ? handleResolve
                  : null
              } // Only staff/admin can resolve
            />
          ))}
        </div>
        {showForm && isStudentOrStaff && (
          <div
            style={{
              flex: "1",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              maxHeight: "60vh",
            }}
          >
            <ComplaintForm
              complaint={currentComplaint}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaint;*/

/*2025
import React, { useEffect, useState } from "react";
import ComplaintDetails from "../components/ComplaintDetails";
import ComplaintForm from "../components/ComplaintForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "@mui/material"; // Import MUI Button

const Complaint = () => {
  const { user } = useAuthContext();
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const response = await fetch("/api/complaints");
    const json = await response.json();

    if (response.ok) {
      setComplaints(json);
    }
  };

  const handleDelete = async (complaintId) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComplaints((prev) =>
        prev.filter((complaint) => complaint._id !== complaintId)
      );
    }
  };

  const handleEdit = (complaint) => {
    setCurrentComplaint(complaint);
    setShowForm(true);
  };

  const handleResolve = async (complaintId, newStatus) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      fetchComplaints(); // Refresh the complaints after resolving
    }
  };

  const handleFormSubmit = () => {
    fetchComplaints();
    setShowForm(false);
    setCurrentComplaint(null);
  };

  const isStudentOrStaff =
    user?.category === "Student" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isStudentOrStaff && (
        <Button
          color="primary" // Blue text color
          onClick={() => setShowForm((prev) => !prev)}
          style={{ marginBottom: "0px" }} // Add margin for spacing
        >
          {showForm ? "Back" : "+ Add Complaint"}
        </Button>
      )}

      {showForm ? (
        <div
          style={{
            border: "none",
            marginTop: "0px",
            //maxHeight: "60vh",
            padding: "20px",
          }}
        >
          <ComplaintForm
            complaint={currentComplaint}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div style={{ display: "flex", padding: "20px" }}>
          <div style={{ flex: "1", overflowY: "auto" }}>
            {complaints.map((complaint) => (
              <ComplaintDetails
                key={complaint._id}
                complaint={complaint}
                onDelete={
                  user?.email === complaint.user_id ||
                  user?.category === "Admin"
                    ? handleDelete
                    : null
                }
                onEdit={user?.email === complaint.user_id && handleEdit}
                onResolve={
                  user?.category === "Admin" || user?.category === "Staff"
                    ? handleResolve
                    : null
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaint;*/

/*2025.01.29
import React, { useEffect, useState } from "react";
import ComplaintDetails from "../components/ComplaintDetails";
import ComplaintForm from "../components/ComplaintForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Chip, Stack } from "@mui/material"; // Importing MUI components

const Complaint = () => {
  const { user } = useAuthContext();
  const [complaints, setComplaints] = useState([]);
  const [hostels, setHostels] = useState([]); // To store hostel data
  const [showForm, setShowForm] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [selectedHostels, setSelectedHostels] = useState([]); // To track selected hostels

  // Fetch complaints and hostels when the component is mounted
  useEffect(() => {
    fetchComplaints();
    fetchHostels();
  }, []);

  // Fetch complaints from the API
  const fetchComplaints = async () => {
    const response = await fetch("/api/complaints");
    const json = await response.json();

    if (response.ok) {
      setComplaints(json);
    }
  };

  // Fetch list of hostels from the API (or database)
  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const data = await response.json();

    if (response.ok) {
      setHostels(data); // Assuming `data` is an array of hostel objects
    }
  };

  // Delete a complaint
  const handleDelete = async (complaintId) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComplaints((prev) =>
        prev.filter((complaint) => complaint._id !== complaintId)
      );
    }
  };

  // Edit a complaint
  const handleEdit = (complaint) => {
    setCurrentComplaint(complaint);
    setShowForm(true);
  };

  // Resolve a complaint (update status)
  const handleResolve = async (complaintId, newStatus) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      fetchComplaints(); // Refresh the complaints after resolving
    }
  };

  // Handle form submission (after adding/editing a complaint)
  const handleFormSubmit = () => {
    fetchComplaints();
    setShowForm(false);
    setCurrentComplaint(null);
  };

  // Filter complaints based on selected hostels
  const filteredComplaints = complaints.filter((complaint) => {
    return (
      selectedHostels.length === 0 || selectedHostels.includes(complaint.hostel)
    );
  });

  // Toggle selected hostel for filtering
  const handleHostelFilter = (hostelName) => {
    setSelectedHostels(
      (prevSelected) =>
        prevSelected.includes(hostelName)
          ? prevSelected.filter((name) => name !== hostelName) // Remove if already selected
          : [...prevSelected, hostelName] // Add if not selected
    );
  };

  const isStudentOrStaff =
    user?.category === "Student" || user?.category === "Staff";

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff"; // Show filter only for Admin/Staff

  return (
    <div className="main-content">
      {isStudentOrStaff && (
        <Button
          color="primary"
          onClick={() => setShowForm((prev) => !prev)}
          style={{ marginBottom: "10px" }}
        >
          {showForm ? "Back" : "+ Add Complaint"}
        </Button>
      )}

     
      {isAdminOrStaff && (
        <div style={{ margin: "10px 0" }}>
          <h3>Filter by Hostel</h3>
          <Stack direction="row" spacing={1}>
            {hostels.map((hostel) => (
              <Chip
                key={hostel._id} // Assuming each hostel has a unique ID
                label={hostel.name} // Display hostel name
                color={
                  selectedHostels.includes(hostel.name) ? "primary" : "default"
                } // Highlight selected chips
                onClick={() => handleHostelFilter(hostel.name)} // Toggle selection on click
                clickable
                variant="outlined"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold", // Make text bold
                  fontSize: "16px", // Increase font size
                  padding: "8px 16px", // Add more padding to the chip for better spacing
                }}
              />
            ))}
          </Stack>
        </div>
      )}


      {showForm ? (
        <div
          style={{
            border: "none",
            marginTop: "0px",
            padding: "20px",
          }}
        >
          <ComplaintForm
            complaint={currentComplaint}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div style={{ display: "flex", padding: "20px" }}>
          <div style={{ flex: "1", overflowY: "auto" }}>
            {filteredComplaints.map((complaint) => (
              <ComplaintDetails
                key={complaint._id}
                complaint={complaint}
                onDelete={
                  user?.email === complaint.user_id ||
                  user?.category === "Admin"
                    ? handleDelete
                    : null
                }
                onEdit={user?.email === complaint.user_id && handleEdit}
                onResolve={
                  user?.category === "Admin" || user?.category === "Staff"
                    ? handleResolve
                    : null
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaint;*/

import React, { useEffect, useState } from "react";
import ComplaintDetails from "../components/ComplaintDetails";
import ComplaintForm from "../components/ComplaintForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Chip, Stack } from "@mui/material"; // Importing MUI components

const Complaint = () => {
  const { user } = useAuthContext();
  const [complaints, setComplaints] = useState([]);
  const [hostels, setHostels] = useState([]); // To store hostel data
  const [showForm, setShowForm] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState(""); // To track selected hostel

  // Fetch complaints and hostels when the component is mounted
  useEffect(() => {
    fetchComplaints();
    fetchHostels();
  }, []);

  // Fetch complaints from the API
  const fetchComplaints = async () => {
    const response = await fetch("/api/complaints");
    const json = await response.json();

    if (response.ok) {
      setComplaints(json);
    }
  };

  // Fetch list of hostels from the API (or database)
  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const data = await response.json();

    if (response.ok) {
      setHostels(data); // Assuming `data` is an array of hostel objects
    }
  };

  // Delete a complaint
  const handleDelete = async (complaintId) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComplaints((prev) =>
        prev.filter((complaint) => complaint._id !== complaintId)
      );
    }
  };

  // Edit a complaint
  const handleEdit = (complaint) => {
    setCurrentComplaint(complaint);
    setShowForm(true);
  };

  // Resolve a complaint (update status)
  const handleResolve = async (complaintId, newStatus) => {
    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      fetchComplaints(); // Refresh the complaints after resolving
    }
  };

  // Handle form submission (after adding/editing a complaint)
  const handleFormSubmit = () => {
    fetchComplaints();
    setShowForm(false);
    setCurrentComplaint(null);
  };

  // Filter complaints based on selected hostel
  const filteredComplaints = complaints.filter((complaint) => {
    return selectedHostel === "" || complaint.hostel === selectedHostel;
  });

  // Handle hostel chip click (similar to notice page)
  const handleHostelChipClick = (hostelName) => {
    if (selectedHostel === hostelName) {
      setSelectedHostel(""); // Deselect if clicked again
    } else {
      setSelectedHostel(hostelName); // Set the selected hostel
    }
  };

  const isStudentOrStaff =
    user?.category === "Student" || user?.category === "Staff";

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff"; // Show filter only for Admin/Staff

  return (
    <div className="main-content">
      {isStudentOrStaff && (
        <Button
          color="primary"
          onClick={() => setShowForm((prev) => !prev)}
          sx={{
            mb: 3,
            background: "black",
            color: "white",
            "&:hover": {
              background: "#333", // Darker shade for hover effect
            },
          }}
        >
          {showForm ? "Back" : "+ Add Complaint"}
        </Button>
      )}

      {/* Show hostel filter only for Admin and Staff */}
      {isAdminOrStaff && (
        <div style={{ margin: "10px 0" }}>
          <h3>Filter by Hostel</h3>
          <Stack direction="row" spacing={1}>
            {/* All Hostels Chip */}
            <Chip
              label="All Hostels"
              onClick={() => setSelectedHostel("")}
              sx={{
                cursor: "pointer",
                backgroundColor: selectedHostel === "" ? "#600000" : "default",
                color: selectedHostel === "" ? "white" : "black",
                "&:hover": {
                  backgroundColor: selectedHostel === "" ? "#600000" : "#ddd",
                },
              }}
            />
            {/* Hostel Chips */}
            {hostels.map((hostel) => (
              <Chip
                key={hostel._id}
                label={hostel.name}
                onClick={() => handleHostelChipClick(hostel.name)}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedHostel === hostel.name ? "#600000" : "default",
                  color: selectedHostel === hostel.name ? "white" : "black",
                  "&:hover": {
                    backgroundColor:
                      selectedHostel === hostel.name ? "#600000" : "#ddd",
                  },
                }}
              />
            ))}
          </Stack>
        </div>
      )}

      {/* Display the complaint form or the list of complaints */}
      {showForm ? (
        <div
          style={{
            border: "none",
            marginTop: "0px",
            padding: "20px",
          }}
        >
          <ComplaintForm
            complaint={currentComplaint}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div style={{ display: "flex", padding: "20px" }}>
          <div style={{ flex: "1", overflowY: "auto" }}>
            {filteredComplaints.map((complaint) => (
              <ComplaintDetails
                key={complaint._id}
                complaint={complaint}
                onDelete={
                  user?.email === complaint.user_id ||
                  user?.category === "Admin"
                    ? handleDelete
                    : null
                }
                onEdit={user?.email === complaint.user_id && handleEdit}
                onResolve={
                  user?.category === "Admin" || user?.category === "Staff"
                    ? handleResolve
                    : null
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaint;
