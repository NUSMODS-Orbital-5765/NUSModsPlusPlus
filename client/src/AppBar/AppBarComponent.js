//COMPLETE
import { AppBar, Toolbar, Box } from "@mui/material";
import React from "react";
import { SearchBar } from "../StyledComponents";
import AppBarNotifs from "./AppBarNotifs";
import AppBarAvatar from "./AppBarAvatar";
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
