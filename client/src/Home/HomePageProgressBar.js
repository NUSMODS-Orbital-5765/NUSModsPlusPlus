import { Box, Card, CardContent, Typography } from "@mui/material";
import HomePageEventProgressBar from "./HomePageEventProgressBar";
import { ProgressBar } from "../StyledComponents";

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

  // calculate percentage of today
  const currentTime = new Date();
  const totalMinutesInDay = 24 * 60;
  const elapsedMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const progressPercentage = (elapsedMinutes / totalMinutesInDay) * 100;
  const currentTimeDisplay = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
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
        <HomePageEventProgressBar />
      </CardContent>
    </Card>
  );
};

export default HomePageProgressBar;
