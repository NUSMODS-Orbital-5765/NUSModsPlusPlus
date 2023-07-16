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
  Button,
} from "@mui/material";
import { notifsList, notifsListWithId } from "../Constants";
import { formatDate } from "../Constants";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

// notif count
export const NotifCount = ({ label, unreadCount, labelColor }) => {
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
        {unreadCount}
      </Box>
    </Box>
  );
};

// styling for a single notif
export const DefaultNotif = (props) => {
  const id = props.id;
  const timestamp = props.timestamp;
  const avatar = props.avatar;
  const author = props.author;
  const content = props.content;
  const type = props.type;
  const readStatus = props.readStatus;
  const handleNotifClick = props.handleNotifClick;

  // max words for truncation
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) {
      return content;
    }
    const truncatedWords = words.slice(0, wordLimit);
    return truncatedWords.join(" ") + "...";
  };

  const truncatedContent = truncateContent(content, 10);

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

  return (
    <div>
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          opacity: readStatus ? 0.5 : 1,
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleNotifClick}
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
            src={avatar}
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
              {author}{" "}
              <Typography component="span" fontWeight={400}>
                {getNotifContent(type)}
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
              {formatDate(timestamp)}
            </Typography>
          </Box>
        </Box>
        {content !== "" && (
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
        <Box
          sx={{
            marginLeft: "80px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        ></Box>
      </Box>
      <Divider sx={{ marginLeft: "-20px", marginRight: "-20px" }} />
    </div>
  );
};

// styling for notification icon & pop-up
const AppBarNotifs = () => {
  const navigate = useNavigate();
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

  // handling read notifs status
  const [currentNotifs, setCurrentNotifs] = useState(
    notifsListWithId(notifsList)
  );

  // update the read state of each notification
  const handleReadNotif = (id) => {
    const updatedNotifs = currentNotifs.map((notif) => {
      if (notif.id === id) {
        return { ...notif, readStatus: true };
      }
      return notif;
    });

    setCurrentNotifs(updatedNotifs);
  };

  // display badge if have unread notifications, otherwise no badge if all read
  return (
    <Box>
      {currentNotifs.filter((notif) => notif.readStatus === false).length ===
      0 ? (
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
                  label="All"
                  unreadCount={currentNotifs.length}
                  labelColor="#1a90ff"
                />
              }
            />
            <Tab
              label={
                <NotifCount
                  label="Unread"
                  unreadCount={
                    currentNotifs.filter((notif) => notif.readStatus === false)
                      .length
                  }
                  labelColor={red[500]}
                />
              }
            />
            <Tab
              label={
                <NotifCount
                  label="Read"
                  unreadCount={
                    currentNotifs.filter((notif) => notif.readStatus === true)
                      .length
                  }
                  labelColor="#44b700"
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
            {currentNotifs.map((notif, index) => (
              <DefaultNotif
                key={index}
                id={notif.id}
                avatar={notif.avatar}
                author={notif.author}
                content={notif.content}
                type={notif.type}
                timestamp={notif.timestamp}
                readStatus={notif.readStatus}
                handleNotifClick={() => handleReadNotif(notif.id)}
              />
            ))}
          </List>
        )}
        {currentTab === 1 && (
          <List>
            {currentNotifs
              .filter((notif) => notif.readStatus === false)
              .map((notif, index) => (
                <DefaultNotif
                  key={index}
                  id={notif.id}
                  avatar={notif.avatar}
                  author={notif.author}
                  content={notif.content}
                  type={notif.type}
                  timestamp={notif.timestamp}
                  url={notif.url}
                  readStatus={notif.readStatus}
                  handleNotifClick={() => handleReadNotif(notif.id)}
                />
              ))}
          </List>
        )}
        {currentTab === 2 && (
          <List>
            {currentNotifs
              .filter((notif) => notif.readStatus === true)
              .map((notif, index) => (
                <DefaultNotif
                  key={index}
                  id={notif.id}
                  avatar={notif.avatar}
                  author={notif.author}
                  content={notif.content}
                  type={notif.type}
                  timestamp={notif.timestamp}
                  url={notif.url}
                  readStatus={notif.readStatus}
                  handleNotifClick={() => handleReadNotif(notif.id)}
                />
              ))}
          </List>
        )}
      </Drawer>
    </Box>
  );
};

export default AppBarNotifs;
