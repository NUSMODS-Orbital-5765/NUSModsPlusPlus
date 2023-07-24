import { Box, Typography, Divider, Avatar, Tooltip } from "@mui/material";
import { formatDate } from "../Constants";
import { adminNotifsList } from "./AdminConstants";
import AppBarNotifs from "../AppBar/AppBarNotifs";
import { StudentProfileView } from "./StudentDataGrid";
import React, { useEffect, useState } from "react";
import UserProfileView from "../UserProfileView";
import StudentModuleProfileView from "../StudentModuleProfileView";

import axios from "axios";
import {parseISO} from "date-fns";

//max words for truncation
export const truncateContent = (content) => {
  const words = content.split(" ");
  if (words.length <= 10) {
    return content;
  }
  const truncatedWords = words.slice(0, 10);
  return truncatedWords.join(" ") + "...";
};

// styling for admin notifications
export const AdminDefaultNotif = ({ notif }) => {
  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleHideProfile = () => {
    setShowProfile(false);
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
          {notif.target.username}
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
          {notif.target.username}
          <Typography component="span" fontWeight={400}>
            's plan
          </Typography>
        </Typography>
      );
    } else if (contentType === "reject") {
      return (
        <Typography
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          <Typography component="span" fontWeight={400}>
            You reject{" "}
          </Typography>
          {notif.target.username}
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
              sx={{
                width: 70,
                height: 70,
                transition: "filter 0.3s",
                "&:hover": {
                  filter: "brightness(0.8)",
                  cursor: "pointer",
                },
              }}
              onClick={handleShowProfile}
              alt="Admin Icon"
              src={""}
            />
          
          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {getNotifContent(notif.type)}
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
              {formatDate(parseISO(notif.timestamp))}
            </Typography>
          </Box>
        </Box>
        {notif.content && (
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
              {truncateContent(notif.content)}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ marginLeft: "-20px", marginRight: "-20px" }} />
    </div>
  );
};

// main component design
const AdminAppBarNotifs = () => {
  const [notificationList, setNotificationList] = useState([]);
  const getNotification = async () => {
    const notifsGetAPI = `${process.env.REACT_APP_API_LINK}/notification/get`;
    try {
      const notifsList = await axios.post(notifsGetAPI, {
        username: localStorage.getItem("username"),
        admin: true
      });
      setNotificationList(notifsList.data.result);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  return <AppBarNotifs notifsList={notificationList} appBarType="admin" />;
};

export default AdminAppBarNotifs;
