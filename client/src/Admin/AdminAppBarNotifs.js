import { Box, Typography, Divider, Avatar, Tooltip } from "@mui/material";
import { formatDate } from "../Constants";
import { adminNotifsList } from "./AdminConstants";
import AppBarNotifs from "../AppBar/AppBarNotifs";
import { StudentProfileView } from "./StudentDataGrid";
import React, { useState } from "react";
import UserProfileView from "../UserProfileView";
import StudentModuleProfileView from "../StudentModuleProfileView";

// styling for admin notifications
export const AdminDefaultNotif = ({ notif }) => {
  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleHideProfile = () => {
    setShowProfile(false);
  };

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
          {notif.student.username}
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
          {notif.student.username}
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
          <Tooltip title="View Profile" placement="top">
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
              src={notif.student.avatar}
            />
          </Tooltip>
          <StudentModuleProfileView
            userProfile={notif.student}
            openDialog={showProfile}
            handleCloseDialog={handleHideProfile}
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
              {formatDate(notif.timestamp)}
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
  return <AppBarNotifs notifsList={adminNotifsList} appBarType="admin" />;
};

export default AdminAppBarNotifs;
