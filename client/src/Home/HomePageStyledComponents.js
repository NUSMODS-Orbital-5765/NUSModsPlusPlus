import useScrollTrigger from "@mui/material/useScrollTrigger";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import React from "react";
import { Typography } from "@mui/material";

// searchbar scrolling transition: elevate and blur background on scrolling
export const SearchBarScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const styles = {
    appBar: {
      backgroundColor: trigger ? "transparent" : "white",
      backdropFilter: "blur(15px)",
      transition: "background-color 0.3s, backdrop-filter 0.3s",
    },
  };

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: styles.appBar,
  });
};

// list of main menu sections
export const dashboardItems = Array(
  {
    text: "Home",
    icon: <HouseRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/",
  },
  {
    text: "Planner",
    icon: <TodayRoundedIcon />,
    link: "/planner",
  },
  {
    text: "Modules",
    icon: <MenuBookRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/modules",
  },
  {
    text: "My GPA",
    icon: <CalculateRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/calculator",
  },
  {
    text: "Community",
    icon: <PeopleAltRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/community",
  }
);
const logOut = () => {
  localStorage.clear();
};

// list of user menu sections
export const generalItems = Array(
  {
    text: "Profile",
    icon: <SettingsSuggestRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/profile",
  },
  {
    text: "Logout",
    icon: <LogoutRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/sign-in",
    actionOnClick: logOut,
  }
);

// list of all menu sections
export const combinedItems = [
  { text: "DASHBOARD", isSectionHeader: true },
  ...dashboardItems,
  { text: "divider", isDivider: true },
  { text: "GENERAL", isSectionHeader: true },
  ...generalItems,
];

// creates headers for different menu sections
export const SectionHeader = (props) => {
  const text = props.text;
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
};

// list of site search recommendations (needs editing)
export const siteRecommendations = ["Home", "Task", "Event"];
