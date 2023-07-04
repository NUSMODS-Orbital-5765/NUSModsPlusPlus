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
          backgroundColor: "#e7f2ff",
          marginRight: "30px",
          alignItems: "center",
          justifyItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box>
          <Typography
            sx={{
              margin: "20px",
              color: "#004d80",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            Plan well, score well.
          </Typography>
          <Typography sx={{ marginTop: "20px", color: "#004d80" }}>
            Join the community today.
          </Typography>
        </Box>
        <img
          sx={{ width: "1%" }}
          alt="Sample Icon"
          src="/join-community-icon.png"
        />
      </Box>

      <Box>
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
