//COMPLETE
import { Drawer, Typography, Divider, Tabs, Tab } from "@mui/material";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState } from "react";
import { Link } from "react-router-dom";

// creates headers for different menu sections
function createSectionHeader(text) {
  return (
    <div>
      <Typography
        sx={{
          paddingTop: "30px",
          paddingLeft: "30px",
          fontWeight: 600,
          fontSize: "14px",
        }}
        color="text.secondary"
      >
        {text}
      </Typography>
    </div>
  );
}

// list of main menu sections
const dashboardItems = Array(
  {
    text: "Home",
    icon: <HouseRoundedIcon />,
    link: "/",
  },
  {
    text: "Planner",
    icon: <TodayRoundedIcon />,
    link: "/planner",
  },
  { text: "Modules", icon: <MenuBookRoundedIcon />, link: "/" },
  { text: "My GPA", icon: <CalculateRoundedIcon />, link: "/" },
  { text: "Shared", icon: <ChatRoundedIcon />, link: "/" }
);

// list of user menu sections
const generalItems = Array(
  { text: "Settings", icon: <SettingsSuggestRoundedIcon />, link: "/" },
  { text: "Logout", icon: <LogoutRoundedIcon />, link: "/sign-up" }
);

// list of all menu sections
const combinedItems = [
  { text: "DASHBOARD", isSectionHeader: true },
  ...dashboardItems,
  { text: "divider", isDivider: true },
  { text: "GENERAL", isSectionHeader: true },
  ...generalItems,
];

// main menu
function DrawerComponent() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectTab = (event, value) => {
    setSelectedTab(value);
  };

  // map function which renders menu items as tabs
  function mapMenuTabs(items) {
    return (
      <Tabs
        value={selectedTab}
        onChange={handleSelectTab}
        orientation="vertical"
      >
        {items.map((item, index) => {
          if (item.isDivider) {
            return <Divider light key={index} />;
          } else if (item.isSectionHeader) {
            return createSectionHeader(item.text);
          } else {
            return (
              <Tab
                key={index}
                value={index}
                component={Link}
                to={item.link}
                sx={{
                  borderRadius: "5px",
                  marginTop: "10px",
                  marginLeft: "25px",
                  textTransform: "none",
                  alignItems: "flex-start",
                  backgroundColor:
                    selectedTab === index ? "#e8f0fe" : "inherit",
                }}
                label={
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      fontSize: "20px",
                      fontWeight: 500,
                      color: selectedTab === index ? "#536DFE" : "text.primary",
                    }}
                  >
                    {item.icon}
                    <span style={{ marginLeft: "15px" }}>{item.text}</span>
                  </Typography>
                }
              ></Tab>
            );
          }
        })}
      </Tabs>
    );
  }

  // returns main menu component
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          borderColor: "#f2f5f9",
        },
      }}
    >
      <img
        src="/nusmods_logo.png"
        alt="NUSMods logo"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "-30px",
          marginBottom: "-30px",
          width: "200px",
          height: "auto",
        }}
      />
      <Divider light />
      {mapMenuTabs(combinedItems)}
    </Drawer>
  );
}

export default DrawerComponent;

//TODO: let the highlight move along with the tab indicator.
