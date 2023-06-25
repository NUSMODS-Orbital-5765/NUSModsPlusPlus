//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import HomePageShortcuts from "./HomePageShortcuts";
import { Typography, TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sampleProfile } from "../Constants";

function HomePage() {
  return (
    <div className="homepage">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarComponent />
        <DrawerComponent defaultTab={1} />
        <Box
          className="remainingViewport"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              marginTop: "100px",
              fontSize: "50px",
              fontWeight: "700",
            }}
          >
            Welcome Back, {sampleProfile["Name"]}!
          </Typography>
          <Typography
            sx={{
              marginTop: "-10px",
              fontSize: "50px",
              fontWeight: "700",
            }}
            color="primary"
          >
            How are you today?
          </Typography>
          <TextField
            sx={{ margin: "70px" }}
            label="Quote of the Day"
            variant="filled"
            color="primary"
            InputProps={{
              sx: { fontSize: "30px" },
            }}
          />
        </Box>
        <HomePageShortcuts />
      </LocalizationProvider>
    </div>
  );
}

export default HomePage;
// use event context to keep quote of the day even when u switch to another tab and switch back
