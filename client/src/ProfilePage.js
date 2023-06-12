//COMPLETE
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import ProfilePictureComponent from "./ProfilePictureComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import { Typography, Box, Grid } from "@mui/material";
import { sampleProfile } from "./Constants";

// layout of profile page
function ProfilePage() {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={6} />
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
            fontSize: "50px",
            fontWeight: 700,
          }}
        >
          Edit Profile
        </Typography>
        <Grid sx={{ marginBottom: "30px" }} container spacing={2}>
          <ProfilePictureComponent />
          <ProfileInfoComponent />
        </Grid>
      </Box>
    </div>
  );
}
export default ProfilePage;
