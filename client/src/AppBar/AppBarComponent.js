//COMPLETE
import { AppBar, Toolbar, Box } from "@mui/material";
import React from "react";
import { SearchBar } from "../StyledComponents";
import AppBarNotifs from "./AppBarNotifs";
import AppBarAvatar, { avatarItems } from "./AppBarAvatar";
import { sampleProfile } from "../Constants";
import {
  SearchBarScroll,
  siteRecommendations,
} from "../Home/HomePageStyledComponents";
import { notifsList } from "../Constants";

// main app bar
function AppBarComponent(props) {
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
              justifyContent: "space-between",
            }}
          >
            <SearchBar
              label="Search this site..."
              width="70ch"
              searchRecommendations={siteRecommendations}
            />
            <Box
              sx={{
                marginLeft: "50ch",
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <AppBarNotifs />
              <AppBarAvatar
                userProfile={sampleProfile}
                avatarItems={avatarItems}
              />
            </Box>
          </Box>
          <AppBarNotifs notifsList={notifsList} />
          <AppBarAvatar />
        </Toolbar>
      </AppBar>
    </SearchBarScroll>
  );
}

export default AppBarComponent;

// TODO: transfer notifications from administrator comments to notifs icon.
