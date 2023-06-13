import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import { Typography, Card, CardContent, Box } from "@mui/material";

const GPACalculatorPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={4} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            padding: "30px",
            marginTop: "60px",
            fontSize: "40px",
            fontWeight: 700,
          }}
        >
          GPA Calculator
        </Typography>
      </Box>
    </div>
  );
};
export default GPACalculatorPage;
