/*import React, { useEffect, useState } from "react";
import HostelDetails from "../components/HostelDetails"; // Adjust the import path as needed
import AddHostelForm from "../components/HostelForm"; // Adjust the import path as needed
import { useAuthContext } from "../hooks/useAuthContext";

const Hostel = () => {
  const { user } = useAuthContext(); // Get the user from context
  const [hostels, setHostels] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentHostel, setCurrentHostel] = useState(null);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const json = await response.json();

    if (response.ok) {
      setHostels(json);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setCurrentHostel(null); // Reset the form when toggling
  };

  const handleEdit = (hostel) => {
    setCurrentHostel(hostel);
    setShowForm(true); // Show form when editing
  };

  const handleFormSubmit = () => {
    fetchHostels(); // Refresh the hostels after submission
    setShowForm(false); // Optionally hide the form
  };

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isAdminOrStaff && (
        <button onClick={toggleForm} className="hostelButton">
          {showForm ? "Hide Form" : "+ Add Hostel"}
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
          {hostels &&
            hostels.map((hostel) => (
              <HostelDetails
                key={hostel._id}
                hostel={hostel}
                onEdit={handleEdit}
                onDeleteSuccess={fetchHostels}
                canEditDelete={isAdminOrStaff} // Pass role check to HostelDetails
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
              <AddHostelForm
                initialValues={currentHostel || {}}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default Hostel;*/
import React, { useEffect, useState } from "react";
import HostelDetails from "../components/HostelDetails"; // Adjust the import path as needed
import AddHostelForm from "../components/HostelForm"; // Adjust the import path as needed
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "@mui/material"; // Import MUI Button

const Hostel = () => {
  const { user } = useAuthContext(); // Get the user from context
  const [hostels, setHostels] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentHostel, setCurrentHostel] = useState(null);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    const response = await fetch("/api/hostels");
    const json = await response.json();

    if (response.ok) {
      setHostels(json);
    }
  };

  const handleEdit = (hostel) => {
    setCurrentHostel(hostel);
    setShowForm(true); // Show form when editing
  };

  const handleFormSubmit = () => {
    fetchHostels(); // Refresh the hostels after submission
    setShowForm(false); // Hide the form after submission
    setCurrentHostel(null); // Reset current hostel
  };

  const isAdminOrStaff =
    user?.category === "Admin" || user?.category === "Staff";

  return (
    <div className="main-content">
      {isAdminOrStaff && (
        <Button
          color="primary" // Blue text color
          onClick={() => setShowForm((prev) => !prev)}
          style={{ marginBottom: "0px" }} // Add margin for spacing
        >
          {showForm ? "Back to Hostels" : "+ Add Hostel"}
        </Button>
      )}

      {showForm ? (
        <div
          style={{
            border: "none",
            //backgroundColor: "#f9f9f9",
            //maxHeight: "60vh",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <AddHostelForm
            initialValues={currentHostel || {}}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div style={{ display: "flex", padding: "20px" }}>
          <div style={{ flex: "1", overflowY: "auto" }}>
            {hostels &&
              hostels.map((hostel) => (
                <HostelDetails
                  key={hostel._id}
                  hostel={hostel}
                  onEdit={handleEdit}
                  onDeleteSuccess={fetchHostels}
                  canEditDelete={isAdminOrStaff} // Pass role check to HostelDetails
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hostel;
