import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../images/Logo-SUSL.png";
import colors from "../config/colors";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const role = user?.category;

  const handleClick = () => {
    logout();
  };
  const location = useLocation(); // Get the current path

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="fixed" sx={{ backgroundColor: colors.primary }}>
      <div className="parent">
        <div className="child">
          <img className="logo" src={logo} width="80px" alt="Logo"></img>
        </div>
        <div className="child">
          <Typography
            variant="h4"
            component="h2"
            paddingLeft="20px"
            paddingTop="20px"
            fontWeight="bold"
          >
            Hostel Management System
          </Typography>
          <Typography variant="h6" component="h2" paddingLeft="20px">
            Sabaragamuwa University of Sri Lanka
          </Typography>
        </div>
      </div>

      <Toolbar>
        {/* Left side (Home and Notices) - only show if user is logged in */}
        {
          <Box sx={{ flexGrow: 1 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                borderBottom: isActive("/")
                  ? "3px solid white" // Thicker and more visible underline
                  : "none",
                color: "inherit",
                borderRadius: 0, // Prevents rounded corners
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/notices"
              color="inherit"
              sx={{
                borderBottom: isActive("/notices") ? "3px solid white" : "none",
                color: "inherit",
                borderRadius: 0,
              }}
            >
              Notices
            </Button>
            {user && (
              <Button
                component={Link}
                to="/complaints"
                color="inherit"
                sx={{
                  borderBottom: isActive("/complaints")
                    ? "3px solid white"
                    : "none",
                  color: "inherit",
                  borderRadius: 0,
                }}
              >
                Complaints
              </Button>
            )}
            <Button
              component={Link}
              to="/about"
              color="inherit"
              sx={{
                borderBottom: isActive("/about") ? "3px solid white" : "none",
                color: "inherit",
                borderRadius: 0,
              }}
            >
              About
            </Button>
            {role === "Admin" && (
              <Button
                component={Link}
                to="/register"
                color="inherit"
                sx={{
                  borderBottom: isActive("/register")
                    ? "3px solid white"
                    : "none",
                  color: "inherit",
                  borderRadius: 0,
                }}
              >
                Register
              </Button>
            )}

            <Button
              component={Link}
              to="/hostels"
              color="inherit"
              sx={{
                borderBottom: isActive("/hostels") ? "3px solid white" : "none",
                color: "inherit",
                borderRadius: 0,
              }}
            >
              Hostels
            </Button>

            {(role === "Admin" || role === "Staff") && (
              <Button
                component={Link}
                to="/students"
                color="inherit"
                sx={{
                  borderBottom: isActive("/students")
                    ? "3px solid white"
                    : "none",
                  color: "inherit",
                  borderRadius: 0,
                }}
              >
                Students
              </Button>
            )}

            <Button
              component={Link}
              to="/staff"
              color="inherit"
              sx={{
                borderBottom: isActive("/staff") ? "3px solid white" : "none",
                color: "inherit",
                borderRadius: 0,
              }}
            >
              Staff
            </Button>
          </Box>
        }

        {/* Right side (Log In and Register / Logout) */}
        {!user ? (
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                borderBottom: isActive("/login") ? "3px solid white" : "none",
                color: "inherit",
                borderRadius: 0,
              }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              sx={{
                borderBottom: isActive("/signup") ? "3px solid white" : "none",
                color: "inherit",
                borderRadius: 0,
              }}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box sx={{ marginLeft: "auto" }}>
            <div>
              <span>{user.email}</span>
              <Button onClick={handleClick} variant="outlined" color="inherit">
                Logout
              </Button>
            </div>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
