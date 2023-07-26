import { Box, LinearProgress, Typography } from "@mui/material";
import { ProgressBar } from "../StyledComponents";
import { getTodayEvents, isEventOver } from "./HomePageTimetable";
import React from "react";

const HomePageEventProgressBar = ({ todayEvents }) => {
  const todayEventsList = todayEvents;
  const todayEventsOverCount = todayEventsList
    ? todayEventsList.filter((event) => isEventOver(event)).length
    : 0;
  const eventsOverFraction = todayEventsOverCount
    ? todayEventsOverCount / todayEventsList.length
    : 0;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          sx={{ marginRight: "30px", fontSize: "35px", fontWeight: 700 }}
        >
          Event Progress
        </Typography>
        {todayEventsList && todayEventsList.length !== 0 ? (
          <Typography variant="h1" sx={{ fontSize: "30px" }}>
            <span style={{ color: "#44b700" }}>{todayEventsOverCount}</span>/
            {todayEventsList.length}
          </Typography>
        ) : (
          <Typography variant="h1" sx={{ fontSize: "30px", color: "#44b700" }}>
            No Events
          </Typography>
        )}
      </Box>
      <ProgressBar color="success" value={eventsOverFraction * 100} />
    </Box>
  );
};

export default HomePageEventProgressBar;
