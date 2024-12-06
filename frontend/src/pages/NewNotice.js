import { Button } from "@mui/material";
import { Grid } from "@mui/system";
import React, { useEffect, useState } from "react";
import NoticeDetails from "../components/NoticeDetails";
import NoticeForm from "../components/NoticeForm";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon

const Notice = () => {
  const [notices, setNotices] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <Grid container className="main-content">
      <Grid
        item
        xs={isFormVisible ? 6 : 12}
        style={{ transition: "width 0.3s" }}
      >
        {isFormVisible && <NoticeForm />}
        <Button
          onClick={toggleFormVisibility}
          variant="outlined"
          startIcon={!isFormVisible && <AddIcon />} // Add icon only if form is hidden
          style={{
            color: "rgb(81, 1, 2)",
            borderColor: "rgb(81, 1, 2)",
          }}
        >
          {isFormVisible ? "Hide Form" : "Add Notice"}
        </Button>
        <div className="notices">
          {notices &&
            notices.map((notice) => (
              <NoticeDetails key={notice.id} notice={notice} />
            ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Notice;
