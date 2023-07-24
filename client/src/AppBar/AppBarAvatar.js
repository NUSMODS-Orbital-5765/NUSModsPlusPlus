import { Link } from "react-router-dom";
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
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

// list of controls available
export const avatarItems = [
  { label: "Profile", icon: <SettingsRoundedIcon />, link: "/profile" },
  { label: "My Posts", icon: <CreateRoundedIcon />, link: "/profile/my-posts" },
  {
    label: "Liked Posts",
    icon: <FavoriteRoundedIcon />,
    link: "/profile/liked-posts",
  },
  { label: "Logout", icon: <LogoutRoundedIcon />, link: "/sign-in" },
];

const AppBarAvatar = ({ userProfile, avatarItems }) => {
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
            src={userProfile.avatar}
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
            marginRight: "30px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Avatar sx={{ width: 70, height: 70 }} src={userProfile.avatar} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              {localStorage.getItem("name")}
            </Typography>
            <Typography color="text.secondary">
              Signed in as{" "}
              <span style={{ textDecoration: "underline" }}>
                {localStorage.getItem("username")}
              </span>
            </Typography>
          </Box>
        </Box>
        <Divider />
        {avatarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            onClick={handleCloseMenu}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem sx={{ margin: "10px", borderRadius: "10px" }}>
              <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

export default AppBarAvatar;
