//COMPLETE
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import GridComponent from "./GridComponent";
import { Typography, TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function HomePage() {
  return (
    <div className="homepage">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarComponent />
        <DrawerComponent />
        <Box
          sx={{
            marginLeft: "230px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              marginTop: "200px",
              fontSize: "50px",
              fontWeight: "700",
            }}
          >
            Welcome Back, Hannah!
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
        <GridComponent />
      </LocalizationProvider>
    </div>
  );
}

export default HomePage;
