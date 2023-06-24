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
import { generalItems } from "../Home/HomePageStyledComponents";

const AppBarAvatar = () => {
  const [AnchorMenu, setAnchorMenu] = useState(null);

  const handleOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };
  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{ margin: "20px", marginLeft: "10px" }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
        open={Boolean(AnchorMenu)}
        anchorEl={AnchorMenu}
        onClose={handleClose}
      >
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
    </div>
  );
};

export default AppBarAvatar;
