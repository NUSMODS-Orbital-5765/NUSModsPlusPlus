//COMPLETE
import {
  Avatar,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  TextField,
  Divider,
  Tooltip,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MarkChatReadRoundedIcon from "@mui/icons-material/MarkChatReadRounded";
import React, { useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link } from "react-router-dom";
import { sampleProfile } from "./Constants";

// customise appbar to elevate and blur background on scrolling
function CustomScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const styles = {
    appBar: {
      backgroundColor: trigger ? "transparent" : "white",
      backdropFilter: "blur(15px)",
      transition: "background-color 0.3s, backdrop-filter 0.3s",
    },
  };

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: styles.appBar,
  });
}

// search bar component
function SearchBar() {
  return (
    <Box
      className="remainingViewport"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
      }}
    >
      <IconButton sx={{ marginBottom: "-20px", marginRight: "20px" }}>
        <SearchRoundedIcon />
      </IconButton>
      <TextField
        sx={{
          width: "400px",
          marginLeft: "-20px",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#e8f0fe",
          },
        }}
        variant="standard"
        label="Search this site..."
      ></TextField>
    </Box>
  );
}

// NOTE: we should map a list of comments to display under notifications dropdown menu.

// notifications menu component
function NotifsMenu() {
  const [AnchorMenu, setAnchorMenu] = useState(null);

  const handleOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };

  const [readNotif, setReadNotif] = useState(false);

  const handleReadNotif = () => {
    setReadNotif(true);
    handleClose();
  };

  const [badgePresent, setBadgePresent] = useState(true);

  const handleBadgePresent = (event) => {
    setBadgePresent(false);
    handleReadNotif();
    handleClose();
  };

  return (
    <div>
      {badgePresent ? (
        <Badge
          sx={{ marginLeft: "630px" }}
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          variant="dot"
          color="error"
        >
          <IconButton sx={{ color: "black" }} onClick={handleOpen}>
            <NotificationsNoneRoundedIcon />
          </IconButton>
        </Badge>
      ) : (
        <IconButton
          sx={{ marginLeft: "630px", color: "black" }}
          onClick={handleOpen}
        >
          <NotificationsNoneRoundedIcon />
        </IconButton>
      )}
      <Menu
        open={Boolean(AnchorMenu)}
        anchorEl={AnchorMenu}
        onClose={handleClose}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              margin: "20px",
              marginBottom: "10px",
              fontSize: "12px",
              fontWeight: "600",
            }}
            color="text.secondary"
          >
            RECENTS
          </Typography>
          <Tooltip sx={{ marginLeft: "300px" }} title="Mark all as read">
            <IconButton onClick={handleBadgePresent}>
              <MarkChatReadRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider light />
        <MenuItem
          style={{
            opacity: readNotif ? 0.5 : 1,
          }}
          onClick={handleReadNotif}
        >
          <Box
            sx={{
              margin: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt="Other User 1"
              src="profilepic_1.png"
            />
            <Typography
              sx={{ fontSize: "15px", marginLeft: "10px", fontWeight: 600 }}
            >
              Dan Lee (Admin) commented on your plan:
              <Typography color="text.secondary">
                This is included in the new curriculum page.
              </Typography>
            </Typography>
            <Divider light />
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
}

// avatar menu component
function AvatarMenu() {
  const [AnchorMenu, setAnchorMenu] = useState(null);

  const handleOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };

  const avatarMenuItems = Array(
    { text: "Profile", icon: <SettingsSuggestRoundedIcon />, link: "/profile" },
    { text: "Logout", icon: <LogoutRoundedIcon />, link: "/sign-in" }
  );
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
            fontSize: "12px",
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
            fontSize: "12px",
            fontWeight: "600",
          }}
          color="text.secondary"
        >
          OPTIONS
        </Typography>
        <Box>
          {avatarMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              component={Link}
              to={item.link}
            >
              {item.icon}
              <span style={{ marginLeft: "10px", fontWeight: 500 }}>
                {item.text}
              </span>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </div>
  );
}

// main app bar
function AppBarComponent(props) {
  return (
    <CustomScroll {...props}>
      <AppBar sx={{ height: 82 }}>
        <Toolbar sx={{ backgroundColor: "transparent" }}>
          {SearchBar()}
          {NotifsMenu()}
          {AvatarMenu()}
        </Toolbar>
      </AppBar>
    </CustomScroll>
  );
}

export default AppBarComponent;

// TODO: transfer notifications from administrator comments to notifs icon.
