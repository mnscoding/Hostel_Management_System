import React, { useEffect, useState } from "react";
import ApplyDetails from "../components/ApplyDetails";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import HostelApplyDetail from "../components/HostelApplyDetail";
const ApplyRequest = () => {
  const navigate = useNavigate();

  /*const [applications, setApplications] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch("/api/apply");
    const json = await response.json();

    if (response.ok) {
      setApplications(json);
    }
  };*/

  const handleBack = () => {
    navigate("/");
  };

  return (
    /*<div className="main-content">
      <Button onClick={handleBack}>BACK</Button>
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {applications &&
          applications.map((application) => (
            <ApplyDetails key={application.id} application={application} />
          ))}
      </div>
    </div>*/
    <div className="main-content">
      <Button onClick={handleBack}>BACK</Button>
      <div>
        <HostelApplyDetail />
      </div>
    </div>
  );
};

export default ApplyRequest;