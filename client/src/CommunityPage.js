import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import UploadPost from "./UploadPost";
import { Typography, Box } from "@mui/material";

// styling for main page
const CommunityPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={5} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
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
            Community
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "16px",
              fontWeight: 200,
            }}
          >
            A collection of the best study resources, by{" "}
            <span style={{ color: "#536DFE" }}>you</span>, for{" "}
            <span style={{ color: "#536DFE" }}>you</span>.
          </Typography>
        </Box>
        <Box marginTop="60px">
          <UploadPost />
        </Box>
      </Box>
    </div>
  );
};

export default CommunityPage;
