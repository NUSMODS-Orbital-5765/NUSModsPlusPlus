// sign up page for admin
import {
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import { CarouselComponent } from "../StyledComponents";

// list of welcome messages that we intend to map
export const WelcomeMessageCarousel = [
  <div>
    <Box sx={{ margin: "20px" }}>
      <Typography sx={{ color: "#004d80", fontSize: "50px", fontWeight: 700 }}>
        Plan well, score well.
      </Typography>
      <Typography
        sx={{ fontSize: "20px", marginTop: "20px", color: "#004d80" }}
      >
        Join the community today.
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <img
        style={{ width: "60%" }}
        alt="Sample Icon"
        src="/join-community-icon.png"
      />
    </Box>
  </div>,
];

// admin sign up component
const AdminSignUpPage = () => {
  return (
    <Box
      sx={{
        margin: "-10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          backgroundColor: "#e7f2ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ margin: "20px" }}>
          <Typography
            sx={{ color: "#004d80", fontSize: "50px", fontWeight: 700 }}
          >
            Plan well, score well.
          </Typography>
          <Typography
            sx={{ fontSize: "20px", marginTop: "20px", color: "#004d80" }}
          >
            Join the community today.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <img
            style={{ width: "60%" }}
            alt="Sample Icon"
            src="/join-community-icon.png"
          />
        </Box>
      </Box>

      <Box sx={{ width: "50%" }}>
        <LogoComponent />
        <Card sx={{ borderRadius: "10px", marginTop: "20px" }}>
          <CardContent sx={{ margin: "20px" }}>
            <Typography
              sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "50px" }}
            >
              Welcome! Let's get you settled.
            </Typography>
            <TextField fullWidth label="Username" variant="outlined" />
            <TextField fullWidth label="Password" variant="outlined" />
            <TextField fullWidth label="Confirm Password" variant="outlined" />
            <TextField fullWidth label="Recovery Email" variant="outlined" />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminSignUpPage;
