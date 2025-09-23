// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
      <Toolbar>
        {/* Brand */}
        <Typography
          variant="h6"
          onClick={() => window.location.reload()}
          sx={{ flexGrow: 1, cursor: "pointer", textDecoration: "none", color: "#f5f5f5" }}
        >
          Hondana
        </Typography>

        {/* Guest */}
        {!user && (
          <Box>
            <Button
              component={Link}
              to="/login"
              sx={{ color: "#f5f5f5", mr: 1 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{ color: "#f5f5f5" }}
            >
              Register
            </Button>
          </Box>
        )}

        {/* Logged-in users */}
        {user && (
          <Box display="flex" alignItems="center">
            {/* Admin Dashboard Button */}
            {user.role === "admin" && (
              <Button
                component={Link}
                to="/dashboard"
                sx={{ color: "#f5f5f5", mr: 1 }}
              >
                Dashboard
              </Button>
            )}

            {/* Avatar + Menu */}
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src={user.picture || ""}
                alt={user.name}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
