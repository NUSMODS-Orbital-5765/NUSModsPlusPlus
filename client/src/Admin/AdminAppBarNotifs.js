import {
  Badge,
  Box,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Avatar,
  List,
  Tabs,
  Tab,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import React, { useState } from "react";
import { formatDate } from "../Constants";
import { adminNotifsList } from "./AdminConstants";
import { NotifCount } from "../AppBar/AppBarNotifs";
import { red } from "@mui/material/colors";
import { startOfDay, endOfDay } from "date-fns";

// styling for admin notifications
export const AdminDefaultNotif = (props) => {
  const student = props.student;
  const content = props.content;
  const type = props.type;
  const timestamp = props.timestamp;

  // max words for truncation
  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length <= 10) {
      return content;
    }
    const truncatedWords = words.slice(0, 10);
    return truncatedWords.join(" ") + "...";
  };

  // different notification style for different notification types
  const getNotifContent = (contentType) => {
    if (contentType === "mention") {
      return (
        <Typography
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          <Typography component="span" fontWeight={400}>
            You mentioned{" "}
          </Typography>
          {student.username}
        </Typography>
      );
    } else if (contentType === "approve") {
      return (
        <Typography
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          <Typography component="span" fontWeight={400}>
            You approved{" "}
          </Typography>
          {student.username}
          <Typography component="span" fontWeight={400}>
            's plan
          </Typography>
        </Typography>
      );
    }
  };

  return (
    <div>
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
            justifyItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt="Admin Icon"
            src={student.avatar}
          />
          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {getNotifContent(type)}
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
              {formatDate(timestamp)}
            </Typography>
          </Box>
        </Box>
        {content && (
          <Box
            sx={{
              marginTop: "10px",
              marginLeft: "80px",
              borderRadius: "10px",
              backgroundColor: "#f2f2f2",
              overflow: "hidden",
            }}
          >
            <Typography sx={{ margin: "15px" }}>
              {truncateContent(content)}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ marginLeft: "-20px", marginRight: "-20px" }} />
    </div>
  );
};

// function to check if the notification timestamp was today
export const checkToday = (timestamp) => {
  const now = new Date();
  return timestamp >= startOfDay(now) && timestamp <= endOfDay(now);
};

// main component design
const AdminAppBarNotifs = ({ notifsList }) => {
  // handle the opening and closing of the drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenNotifs = () => {
    setOpenDrawer(true);
    console.log(adminNotifsList);
  };
  const handleCloseNotifs = () => {
    setOpenDrawer(false);
  };

  // handle the switching of tabs
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  // sort notifsList based on most recent

  return (
    <div>
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
            Recent Activity
          </Typography>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            <Tab
              label={
                <NotifCount
                  label="Today"
                  unreadCount={
                    notifsList.filter((notif) => checkToday(notif.timestamp))
                      .length
                  }
                  labelColor="#1a90ff"
                />
              }
            />
            <Tab
              label={
                <NotifCount
                  label="Previous"
                  unreadCount={
                    notifsList.filter((notif) => !checkToday(notif.timestamp))
                      .length
                  }
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
            {notifsList
              .filter((notif) => checkToday(notif.timestamp))
              .map((notif, index) => (
                <AdminDefaultNotif
                  key={index}
                  student={notif.student}
                  content={notif.content}
                  type={notif.type}
                  timestamp={notif.timestamp}
                />
              ))}
          </List>
        )}
        {currentTab === 1 && (
          <List>
            {notifsList
              .filter((notif) => !checkToday(notif.timestamp))
              .map((notif, index) => (
                <AdminDefaultNotif
                  key={index}
                  student={notif.student}
                  content={notif.content}
                  type={notif.type}
                  timestamp={notif.timestamp}
                />
              ))}
          </List>
        )}
      </Drawer>
    </div>
  );
};
export default AdminAppBarNotifs;
