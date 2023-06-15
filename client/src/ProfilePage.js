//COMPLETE
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import ProfilePictureComponent from "./ProfilePictureComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import { Typography, Box } from "@mui/material";
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
          alignItems: "center",
          justifyItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography
          sx={{
            marginTop: "150px",
            fontSize: "50px",
            fontWeight: "700",
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
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "30px",
        }}
      >
        <ProfilePictureComponent />
        <ProfileInfoComponent />
      </Box>
    </div>
  );
}
export default ProfilePage;
