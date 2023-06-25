//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import ProfilePictureComponent from "./ProfilePictureComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import { Box } from "@mui/material";
import { PageHeader } from "../StyledComponents";

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
        <PageHeader
          header="Edit Profile"
          subtitle={
            <div>
              Today I choose to be the{" "}
              <span style={{ color: "#536DFE" }}>best</span> version of myself.
            </div>
          }
        />
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
