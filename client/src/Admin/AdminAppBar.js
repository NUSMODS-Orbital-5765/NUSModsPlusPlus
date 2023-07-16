import { AppBar, Toolbar, Box } from "@mui/material";
import React from "react";
import { SearchBar } from "../StyledComponents";
import AdminAppBarNotifs from "./AdminAppBarNotifs";
import AppBarAvatar from "../AppBar/AppBarAvatar";
import { SearchBarScroll } from "../Home/HomePageStyledComponents";
import { notifsListWithId } from "../Constants";
import {
  adminRecommendations,
  adminSampleProfile,
  adminNotifsList,
  adminAvatarItems,
} from "./AdminConstants";

// i'm not sure why it doesn't work when i try to pass in props, so i'm just gonna leave it as it is
const AdminAppBar = (props) => {
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
              searchRecommendations={adminRecommendations}
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
              <AdminAppBarNotifs
                notifsList={notifsListWithId(adminNotifsList)}
              />
              <AppBarAvatar
                userProfile={adminSampleProfile}
                avatarItems={adminAvatarItems}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </SearchBarScroll>
  );
};
export default AdminAppBar;
