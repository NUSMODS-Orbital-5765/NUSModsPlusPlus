//COMPLETE
import { AppBar, Toolbar, Box } from "@mui/material";
import React from "react";
import { SearchBar } from "../StyledComponents";
import AppBarNotifs from "./AppBarNotifs";
import AppBarAvatar, { avatarItems } from "./AppBarAvatar";
import { sampleProfile, notifsList } from "../Constants";
import {
  SearchBarScroll,
  siteRecommendations,
} from "../Home/HomePageStyledComponents";

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
              alignItems: "center",
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
                marginLeft: "-50px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AppBarNotifs notifsList={notifsList} appBarType="student" />
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
