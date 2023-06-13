//COMPLETE
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import ProfilePictureComponent from "./ProfilePictureComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import { Typography, Box, Grid, Button } from "@mui/material";
import { sampleProfile } from "./Constants";

// layout of profile page
function ProfilePage() {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={8} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "30px",
            marginBottom: "15px",
          }}
        >
          <Typography
            sx={{
              marginTop: "60px",
              fontSize: "40px",
              fontWeight: 700,
            }}
          >
            Edit Profile
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "16px",
              fontWeight: 200,
            }}
          >
            Today I choose to be the{" "}
            <span style={{ color: "#536DFE" }}>best</span> version of myself.
          </Typography>
        </Box>
        <Grid sx={{ marginBottom: "30px" }} container spacing={2}>
          <ProfilePictureComponent />
          <ProfileInfoComponent />
        </Grid>
      </Box>
    </div>
  );
}
export default ProfilePage;
