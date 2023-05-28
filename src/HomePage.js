import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import GridComponent from "./GridComponent";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function HomePage() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="app">
          <AppBarComponent />
          <DrawerComponent />
          <Typography
            sx={{
              marginTop: "20px",
              marginLeft: "260px",
              fontSize: "50px",
              fontWeight: "700",
            }}
          >
            Welcome Back!
          </Typography>
          <GridComponent />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default HomePage;
