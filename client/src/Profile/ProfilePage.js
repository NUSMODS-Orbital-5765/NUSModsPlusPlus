//COMPLETE
// remember to add the icon component
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Switch,
} from "@mui/material";
import { samplePosts, sampleProfile } from "../Constants";
import ProfilePictureComponent from "./ProfilePictureComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import MyPostsTab from "./MyPostsTab";
import LikedPostsTab from "./LikedPostsTab";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountSecurityTab from "./AccountSecurityTab";
import { combinedItems } from "../Home/HomePageStyledComponents";

// button for viewing public profile
export const PublicProfileButton = ({ disabledCondition, link }) => {
  return (
    <Tooltip title={<span>View Public Profile</span>} placement="top">
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
            transform: "translateX(5px)",
            transition: "transform 0.1s",
          },
        }}
        component={Link}
        to={link}
        disabled={disabledCondition}
      >
        <NavigateNextRoundedIcon
          color={disabledCondition ? "disabled" : "primary"}
          sx={{
            fontSize: "50px",
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

// list of controls to map
export const profileTabsList = [
  { label: "My Info", icon: <InfoRoundedIcon />, link: "/profile" },
  { label: "My Posts", icon: <CreateRoundedIcon />, link: "/profile/my-posts" },
  {
    label: "Liked Posts",
    icon: <FavoriteRoundedIcon />,
    link: "/profile/liked-posts",
  },
  {
    label: "Account Security",
    icon: <LockRoundedIcon />,
    link: "/profile/account",
  },
];

// layout of profile page
const ProfilePage = ({ selectedTab }) => {
  // handling the tabs field
  const [currentTab, setCurrentTab] = useState(selectedTab);

  // handling public vs private profile
  const [publicProfile, setPublicProfile] = useState(false);
  const togglePublicProfile = () => {
    setPublicProfile(false);
  };

  // styling the switch component to toggle between public and private profile
  const PublicProfileSwitch = () => {
    return (
      <Box
        sx={{
          marginLeft: "-10px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Switch
          color="success"
          checked={publicProfile}
          onChange={togglePublicProfile}
        />
        <Typography sx={{ color: "#004d80", fontWeight: 600 }}>
          {publicProfile ? "Public" : "Private"}
        </Typography>
      </Box>
    );
  };

  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={7} tabsList={combinedItems} />
      <Box
        className="remainingViewport"
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
      >
        <Box
          sx={{
            margin: "55px",
            marginTop: "20px",
            borderRadius: "10px",
            background: `
      linear-gradient(to bottom,  #e7f2ff 80%, white 20%),
      #e7f2ff 
    `,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <ProfilePictureComponent sampleIcon={"/sample_icon.png"} />
            <Box
              sx={{
                marginLeft: "10px",
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#004d80",
                }}
              >
                {localStorage.getItem("name")}
              </Typography>
              <Typography sx={{ color: "#004d80" }}>
                Student • {localStorage.getItem("primaryDegree")}
              </Typography>
              <PublicProfileSwitch />
            </Box>
            <PublicProfileButton
              disabledCondition={!publicProfile}
              link={"/profile/public"}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "5px",
              borderTopLeftRadius: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Tabs
              sx={{
                marginLeft: "55ch",
              }}
              value={selectedTab}
            >
              {profileTabsList.map((item, index) => (
                <Tab
                  sx={{ borderRadius: "10px 10px 0 0" }}
                  component={Link}
                  to={item.link}
                  key={index}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      {item.icon}
                      <Typography
                        sx={{
                          marginLeft: "10px",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        {selectedTab === 0 && (
          <ProfileInfoComponent userProfile={sampleProfile} />
        )}
        {selectedTab === 1 && <MyPostsTab postList={samplePosts} />}
        {selectedTab === 2 && <LikedPostsTab postList={samplePosts} />}
        {selectedTab === 3 && (
          <AccountSecurityTab userProfile={sampleProfile} />
        )}
      </Box>
    </div>
  );
};

export default ProfilePage;
