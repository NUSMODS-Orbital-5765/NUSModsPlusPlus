import { Link } from "react-router-dom";
import { sampleProfile } from "../Constants";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Divider,
} from "@mui/material";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

const AppBarAvatar = () => {
  // opening the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleOpenMenu}
        sx={{ margin: "20px", marginLeft: "10px" }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // this one is just to show whether the person is logged in or not, maybe not important lol can delete if necessary
          variant="dot"
          color="success"
        >
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt="Sample Icon"
            src="sample_icon.png"
          />
        </Badge>
      </IconButton>
      <Menu
        sx={{ borderRadius: "10px" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box
          sx={{
            margin: "10px",
            marginRight: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            src={sampleProfile["Avatar"]}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              {sampleProfile["Name"]}
            </Typography>
            <Typography color="text.secondary">
              Signed in as{" "}
              <span style={{ textDecoration: "underline" }}>
                {sampleProfile["Username"]}
              </span>
            </Typography>
          </Box>
        </Box>
        <Divider />

        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Liked Posts</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AppBarAvatar;

/*
<Link to="/profile" onClick={handleCloseMenu}>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>
        */

/*
<Typography
          sx={{
            margin: "20px",
            marginBottom: "10px",
            fontSize: "14px",
            fontWeight: "600",
          }}
          color="text.secondary"
        >
          USER
        </Typography>
        <Typography
          sx={{
            marginRight: "20px",
            marginLeft: "20px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {sampleProfile["Name"]}
        </Typography>
        <Typography
          sx={{
            marginRight: "20px",
            marginLeft: "20px",
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: "600",
          }}
          color="text.secondary"
        >
          Signed in as{" "}
          <span style={{ textDecoration: "underline" }}>
            {sampleProfile["Username"]}
          </span>
        </Typography>
        <Divider light />
        <Typography
          sx={{
            margin: "20px",
            marginBottom: "10px",
            fontWeight: "600",
            fontSize: "14px",
          }}
          color="text.secondary"
        >
          OPTIONS
        </Typography>
        <Box>
          {generalItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              component={Link}
              to={item.link}
            >
              {item.icon}
              <span
                style={{
                  fontSize: "17px",
                  marginLeft: "10px",
                  fontWeight: 500,
                }}
              >
                {item.text}
              </span>
            </MenuItem>
          ))}
        </Box>
      </Menu>
*/
