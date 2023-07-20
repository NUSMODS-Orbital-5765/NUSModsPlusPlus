import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Badge,
  List,
  Drawer,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { formatDate, pastNotifs, thisWeekNotifs } from "../Constants";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { isToday, isThisWeek } from "../Constants";

// notif count
export const NotifCount = ({ label, notifListCount, labelColor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {label}
      <Box
        sx={{
          backgroundColor: labelColor,
          color: "white",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
        }}
      >
        {notifListCount}
      </Box>
    </Box>
  );
};

// styling for a single notif
export const DefaultNotif = ({ notif }) => {
  // max words for truncation
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) {
      return content;
    }
    const truncatedWords = words.slice(0, wordLimit);
    return truncatedWords.join(" ") + "...";
  };

  const truncatedContent = truncateContent(notif.content, 10);

  // to set the content for the notification
  const getNotifContent = (type) => {
    if (type === "comment") {
      return "commented on your post";
    } else if (type === "like") {
      return "liked your post";
    } else if (type === "approve") {
      return "approved your plan";
    } else if (type === "mention") {
      return "mentioned you";
    }
  };

  // to set the content for the notification
  const getNotifURL = (type) => {
    if (type === "comment" || type === "like") {
      return "/profile/my-posts";
    } else if (type === "approve" || type === "mention") {
      return "/modules";
    } else {
      return "/";
    }
  };

  return (
    <div>
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          textDecoration: "none",
          color: "inherit",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            textDecoration: "none",
          },
        }}
        component={Link}
        to={getNotifURL(notif.type)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt="Admin Icon"
            src={notif.avatar}
          />
          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {notif.author}{" "}
              <Typography component="span" fontWeight={400}>
                {getNotifContent(notif.type)}
              </Typography>
            </Typography>
            <Typography
              variant="h1"
              sx={{
                marginTop: "5px",
                color: "#1a90ff",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {formatDate(notif.timestamp)}
            </Typography>
          </Box>
        </Box>
        {notif.content !== "" && (
          <Box
            sx={{
              marginTop: "10px",
              marginLeft: "80px",
              borderRadius: "10px",
              backgroundColor: "#f2f2f2",
              overflow: "hidden",
            }}
          >
            <Typography sx={{ margin: "15px" }}>{truncatedContent}</Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ marginLeft: "-20px", marginRight: "-20px" }} />
    </div>
  );
};

// styling for notification icon & pop-up
const AppBarNotifs = ({ notifsList }) => {
  // filtering today, this week, past notifs
  const todayNotifs = notifsList.filter((notif) => isToday(notif.timestamp));

  const thisWeekNotifs = notifsList.filter(
    (notif) => isThisWeek(notif.timestamp) && !isToday(notif.timestamp)
  );

  const pastNotifs = notifsList.filter((notif) => !isThisWeek(notif.timestamp));

  // opening and closing the sidebar
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenNotifs = () => {
    setOpenDrawer(true);
  };
  const handleCloseNotifs = () => {
    setOpenDrawer(false);
  };

  // switching tabs logic
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  // display badge if have new notifications, otherwise no badge
  return (
    <Box sx={{ marginLeft: "55ch" }}>
      {todayNotifs.length === 0 ? (
        <IconButton sx={{ color: "black" }} onClick={handleOpenNotifs}>
          <MarkEmailReadRoundedIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      ) : (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          variant="dot"
          color="error"
        >
          <IconButton sx={{ color: "black" }} onClick={handleOpenNotifs}>
            <EmailRoundedIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Badge>
      )}
      <Drawer
        sx={{
          width: 400,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 400,
            boxSizing: "border-box",
          },
        }}
        anchor="right"
        open={openDrawer}
        onClose={handleCloseNotifs}
      >
        <Box sx={{ margin: "20px" }}>
          <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
            Inbox
          </Typography>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            <Tab
              label={
                <NotifCount
                  label="Today"
                  notifListCount={todayNotifs.length}
                  labelColor="#1a90ff"
                />
              }
            />
            <Tab
              label={
                <NotifCount
                  label="This Week"
                  notifListCount={thisWeekNotifs.length}
                  labelColor="#44b700"
                />
              }
            />
            <Tab
              label={
                <NotifCount
                  label="Past"
                  notifListCount={pastNotifs.length}
                  labelColor={red[500]}
                />
              }
            />
          </Tabs>
          <Divider
            sx={{ margin: "-20px", marginBottom: "-30px", marginTop: "0px" }}
          />
        </Box>
        {currentTab === 0 && (
          <List>
            {todayNotifs.map((notif, index) => (
              <DefaultNotif key={index} notif={notif} />
            ))}
          </List>
        )}
        {currentTab === 1 && (
          <List>
            {thisWeekNotifs.map((notif, index) => (
              <DefaultNotif key={index} notif={notif} />
            ))}
          </List>
        )}
        {currentTab === 2 && (
          <List>
            {pastNotifs.map((notif, index) => (
              <DefaultNotif key={index} notif={notif} />
            ))}
          </List>
        )}
      </Drawer>
    </Box>
  );
};

export default AppBarNotifs;
