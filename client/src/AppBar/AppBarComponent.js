//COMPLETE
import { AppBar, Toolbar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../StyledComponents";
import AppBarNotifs from "./AppBarNotifs";
import AppBarAvatar, { avatarItems } from "./AppBarAvatar";
import { sampleProfile, notifsList } from "../Constants";
import {
  SearchBarScroll,
  siteRecommendations,
} from "../Home/HomePageStyledComponents";
import axios from "axios";
// main app bar
function AppBarComponent(props) {
  const [notificationList, setNotificationList] = useState([]);

  const getNotification = async () => {
    const notifsGetAPI = `${process.env.REACT_APP_API_LINK}/notification/get`;
    try {
      const notifsList = await axios.post(notifsGetAPI, {
        username: localStorage.getItem("username"),
      });
      setNotificationList(notifsList.data.result);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  useEffect(() => {
    const intervalCall = setInterval(() => {
      getNotification();
    }, 30000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);
  return (
    <SearchBarScroll {...props}>
      <AppBar
        sx={{
          marginTop: "-10px",
          height: 85,
          backgroundColor: "white",
          position: "sticky",
          top: 0,
          width: "100%",
        }}
      >
        <Toolbar sx={{ backgroundColor: "transparent" }}>
          <Box
            className="remainingViewport"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SearchBar
              label="Search + Enter"
              width="70ch"
              searchRecommendations={siteRecommendations}
            />
            <Box
              sx={{
                marginLeft: "-50px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AppBarNotifs
                notifsList={notificationList}
                appBarType="student"
              />
              <AppBarAvatar
                userProfile={sampleProfile}
                avatarItems={avatarItems}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </SearchBarScroll>
  );
}

export default AppBarComponent;
