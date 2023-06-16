import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Tooltip,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Divider,
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
    <Button sx={{ opacity: readNotif ? 0.5 : 1 }} onClick={handleReadNotif}>
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "50px",
            }}
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt="Admin Icon"
              src={avatar}
            />
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
          </Box>
          <Typography
            variant="h1"
            sx={{ textTransform: "none", fontWeight: 500, fontSize: "15px" }}
          >
            {formatDate(timestamp)}
          </Typography>
        </Box>
        <Typography
          sx={{ marginLeft: "20px", textTransform: "none" }}
          color="text.secondary"
        >
          {content}
        </Typography>
      </Box>
    </Button>
  );
};

// map a list of notifications
export const AllNotifs = (props) => {
  const opacityCondition = props.opacityCondition;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        opacity: opacityCondition ? 0.5 : 1,
      }}
    >
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
      <Divider light />
    </Box>
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
        open={Boolean(AnchorMenu)}
        anchorEl={AnchorMenu}
        onClose={handleClose}
      >
        <Box
          sx={{
            padding: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
            }}
          >
            RECENTS
          </Typography>
          <Tooltip
            title={badgePresent ? "Mark all as read" : "You're up to date"}
          >
            <IconButton onClick={handleBadgePresent}>
              {badgePresent ? (
                <DoneRoundedIcon color="primary" />
              ) : (
                <DoneAllRoundedIcon color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Divider light />
        <AllNotifs opacityCondition={!badgePresent} />
      </Menu>
    </Box>
  );
};

export default AppBarNotifs;
