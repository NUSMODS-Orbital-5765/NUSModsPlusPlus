import React, { useState } from "react";

import {
  Avatar,
  Box,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Badge,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function AppBarComponent() {
  const [AnchorMenu, setAnchorMenu] = useState(null);

  const handleOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };

  return (
    <Box sx={{ marginLeft: "233px" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
              backgroundColor: "rgba(138, 138, 138, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(138, 138, 138, 0.25)",
              },
            }}
          >
            <InputBase
              sx={{
                paddingLeft: "10px",
                textAlign: "left",
                color: "black",
                fontWeight: "200",
                width: "50ch",
              }}
              placeholder="the smarter way to plan."
            />
            <Box sx={{ paddingRight: 1 }}>
              <SearchRoundedIcon sx={{ color: "black" }} />
            </Box>
          </Box>
          <Box sx={{ paddingLeft: 49, display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                color: "black",
                fontSize: "15px",
                fontWeight: "300",
              }}
            >
              AY22/23 Sem 1
            </Typography>
            <div>
              <Button
                sx={{
                  backgroundColor: "transparent",
                  outline: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                onClick={handleOpen}
                variant="contained"
                color="primary"
              >
                <Badge badgeContent={1} color="error">
                  <Avatar
                    sx={{ marginLeft: "20px", backgroundColor: "lightblue" }}
                  >
                    H
                  </Avatar>
                </Badge>
              </Button>
              <Menu
                id="dropdown-menu"
                anchorEl={AnchorMenu}
                keepMounted
                open={Boolean(AnchorMenu)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
//simple appbar with search bar, year and semester number, and profile

export default AppBarComponent;

//TODO: auto-suggestion (use more complex libraries to do this)
//TODO: how to use react router??? (search)
