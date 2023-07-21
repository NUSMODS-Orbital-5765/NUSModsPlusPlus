import { adminSampleProfile } from "./AdminConstants";
import { Box, Typography, Avatar } from "@mui/material";
import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";

export const AdminPublicProfileView = ({ adminProfile }) => {
  return (
    <Box
      sx={{
        margin: "55px",
        marginTop: "20px",
        borderRadius: "10px",
        background: `
      linear-gradient(to bottom,  #e7f2ff 80%, #1a90ff 20%),
      #e7f2ff 
    `,
      }}
    >
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: "20ch",
            height: "20ch",
          }}
          alt="Sample Icon"
          src={adminProfile.avatar}
        />
        <Box
          sx={{
            marginLeft: "10px",
            marginRight: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#004d80",
            }}
          >
            {adminProfile.name}
          </Typography>
          <Typography sx={{ color: "#004d80" }}>
            Admin • {adminProfile.department}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const AdminPublicProfilePage = () => {
  return (
    <div className="homepage">
      <AdminAppBar />
      <AdminDrawerComponent defaultTab={1} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminPublicProfileView adminProfile={adminSampleProfile} />
      </Box>
    </div>
  );
};

export default AdminPublicProfilePage;
