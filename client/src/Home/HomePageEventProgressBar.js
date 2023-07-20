import { Box, LinearProgress, Typography } from "@mui/material";
import { ProgressBar } from "../StyledComponents";
import { getTodayEvents, isEventOver } from "./HomePageTimetable";

const HomePageEventProgressBar = ({ todayEvents }) => {
  const todayEventsList = getTodayEvents();
  const todayEventsOverCount = todayEventsList.filter((event) =>
    isEventOver(event)
  ).length;
  const eventsOverFraction = todayEventsOverCount / todayEventsList.length;

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
        <Typography variant="h1" sx={{ fontSize: "30px" }}>
          <span style={{ color: "#44b700" }}>{todayEventsOverCount}</span>/
          {todayEventsList.length}
        </Typography>
      </Box>
      <ProgressBar color="success" value={eventsOverFraction * 100} />
    </Box>
  );
};

export default HomePageEventProgressBar;
