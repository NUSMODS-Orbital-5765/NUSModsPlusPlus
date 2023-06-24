import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Menu,
  Badge,
  List,
} from "@mui/material";
import { notifsList } from "../Constants";
import { formatDate } from "../Constants";

// styling for a single notif
export const DefaultNotif = (props) => {
  const timestamp = props.timestamp;
  const avatar = props.avatar;
  const author = props.author;
  const content = props.content;
  const notifType = props.notifType;

  // blur the notif once it is viewed
  const [readNotif, setReadNotif] = useState(false);

  const handleReadNotif = () => {
    setReadNotif(true);
  };

  let notifAction = "";
  if (notifType === "comment") {
    notifAction = "commented:";
  } else if (notifType === "approve") {
    notifAction = "approved your plan.";
  }

  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: readNotif ? 0.5 : 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Avatar sx={{ width: 70, height: 70 }} alt="Admin Icon" src={avatar} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textTransform: "none",
                marginLeft: "10px",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {author} {notifAction}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                marginLeft: "50px",
                color: "#536DFE",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "15px",
              }}
            >
              {formatDate(timestamp)}
            </Typography>
          </Box>
          <Typography
            sx={{ marginLeft: "10px", textTransform: "none" }}
            color="text.secondary"
          >
            {content}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={handleReadNotif}>
        {readNotif ? (
          <DoneRoundedIcon color="primary" />
        ) : (
          <DoneAllRoundedIcon color="primary" />
        )}
      </IconButton>
    </Box>
  );
};

// map a list of notifications
export const AllNotifs = () => {
  return (
    <List>
      {notifsList.map((notif, index) => (
        <DefaultNotif
          key={index}
          avatar={notif.avatar}
          author={notif.author}
          content={notif.content}
          notifType={notif.type}
          timestamp={notif.timestamp}
        />
      ))}
    </List>
  );
};

// styling for notification icon & pop-up
const AppBarNotifs = () => {
  const [AnchorMenu, setAnchorMenu] = useState(null);

  const handleOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };

  // remove the badge once the notif is read
  const [badgePresent, setBadgePresent] = useState(true);

  const handleBadgePresent = (event) => {
    setBadgePresent(false);
    handleClose();
  };

  return (
    <Box sx={{ marginLeft: "55ch" }}>
      {badgePresent ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          variant="dot"
          color="error"
        >
          <IconButton sx={{ color: "black" }} onClick={handleOpen}>
            <NotificationsActiveRoundedIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Badge>
      ) : (
        <IconButton sx={{ color: "black" }} onClick={handleOpen}>
          <NotificationsNoneRoundedIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      )}
      <Menu
        maxWidth="md"
        open={Boolean(AnchorMenu)}
        anchorEl={AnchorMenu}
        onClose={handleClose}
      >
        <AllNotifs />
      </Menu>
    </Box>
  );
};

export default AppBarNotifs;
