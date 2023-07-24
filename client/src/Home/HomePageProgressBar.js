import { Box, Card, CardContent, Typography } from "@mui/material";
import HomePageEventProgressBar from "./HomePageEventProgressBar";
import { ProgressBar } from "../StyledComponents";
import React, { useState, useEffect } from "react";

const HomePageProgressBar = () => {
  // encouraging messages based on day progress
  const showMessage = () => {
    if (progressPercentage < 50) {
      return "You're off to a great start.";
    } else if (progressPercentage >= 50 && progressPercentage < 75) {
      return "Keep going!";
    } else {
      return "Keep it up, you're almost there!";
    }
  };

  // update the current time every minute
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Function to format the time as desired (12:00pm or 12:00am)
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? " PM" : " AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}${ampm}`;
  };

  const currentTimeDisplay = formatTime(currentTime);

  // calculate percentage of today
  const totalMinutesInDay = 24 * 60;
  const elapsedMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const progressPercentage = (elapsedMinutes / totalMinutesInDay) * 100;
  console.log(progressPercentage); // just for checking

  return (
    <Card
      sx={{
        backgroundColor: "#f2f2f2",
        marginRight: "30px",
        borderRadius: "10px",
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "35px", fontWeight: 700, marginRight: "30px" }}
          >
            Today's Progress
          </Typography>
          <Typography color="primary" sx={{ fontSize: "30px" }} variant="h1">
            {currentTimeDisplay}
          </Typography>
        </Box>
        <Typography color="text.secondary" sx={{ marginBottom: "20px" }}>
          {showMessage()}
        </Typography>
        <Box sx={{ marginBottom: "30px" }}>
          <ProgressBar color="primary" value={progressPercentage} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HomePageProgressBar;
