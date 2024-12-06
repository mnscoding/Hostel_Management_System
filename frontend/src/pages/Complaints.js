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

export default Complaint;
