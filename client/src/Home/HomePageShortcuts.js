// NEED TO RETRIEVE ITEMS FROM DATABASE AND SORT.
// COMPLETE
import { Box, Tooltip, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HomePageTimetable from "./HomePageTimetable";
import HomePageRecommendedPosts from "./HomePageRecommendedPosts";

// styling for arrow button to go to related page
export const SeeMoreArrowButton = ({ pageName }) => {
  const pageLinks = { Planner: "/planner", Community: "/community" };

  return (
    <Tooltip title={<span>Go to {pageName}</span>} placement="top">
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
            transform: "translateX(5px)",
            transition: "transform 0.1s",
          },
        }}
        component={Link}
        to={pageLinks[pageName]}
      >
        <ArrowForwardRoundedIcon
          sx={{
            color: "#536DFE",
            fontSize: "40px",
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

// main page
const HomePageShortcuts = () => {
  return (
    <Box
      className="remainingViewport"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <HomePageTimetable />
      <HomePageRecommendedPosts />
    </Box>
  );
};

export default HomePageShortcuts;
