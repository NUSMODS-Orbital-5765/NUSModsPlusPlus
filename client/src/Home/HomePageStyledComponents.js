import useScrollTrigger from "@mui/material/useScrollTrigger";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
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
    icon: <HomeRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/",
  },
  {
    text: "Planner",
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/planner-events",
  },
  {
    text: "Modules",
    icon: <LibraryBooksRoundedIcon sx={{ fontSize: "30px" }} />,
    link: "/modules",
  },
  // {
  //   text: "My GPA",
  //   icon: <CalculateRoundedIcon sx={{ fontSize: "30px" }} />,
  //   link: "/calculator",
  // },
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
    icon: <SettingsRoundedIcon sx={{ fontSize: "30px" }} />,
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
export const siteRecommendations = [
  { option: "back to home", link: "/" },
  { option: "add todos", link: "/planner-tasks" },
  { option: "add events", link: "/planner-events" },
  { option: "plan modules", link: "/modules" },
  { option: "edit profile", link: "/profile" },
  { option: "view my posts", link: "/profile/my-posts" },
  { option: "view liked posts", link: "/profile/liked-posts" },
  { option: "change username", link: "/profile/account" },
  { option: "change password", link: "/profile/account" },
  { option: "change email", link: "/profile/account" },
  { option: "logout", link: "/sign-in" },
  { option: "calculate gpa", link: "/calculator" },
  { option: "new post", link: "/community" },
];
