import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { NoticeContextProvider } from "./context/NoticeContext";
import { ComplaintContextProvider } from "./context/ComplaintContext";
import { HostelContextProvider } from "./context/HostelContext";
import { StaffContextProvider } from "./context/StaffContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <NoticeContextProvider>
          <ComplaintContextProvider>
            <HostelContextProvider>
              <StaffContextProvider>
                <App />
              </StaffContextProvider>
            </HostelContextProvider>
          </ComplaintContextProvider>
        </NoticeContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
