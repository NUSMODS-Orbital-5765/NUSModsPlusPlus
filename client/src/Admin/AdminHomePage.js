import { Link } from "react-router-dom";
import {
  adminSampleProfile,
  sampleStudentsList,
  getMajorColor,
} from "../Constants";
import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItemButton,
  Chip,
} from "@mui/material";

// styling for recently viewed component
export const RecentlyViewed = ({ viewedProfiles }) => {
  const handleClickProfile = () => {
    console.log("hello");
  };
  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#f2f2f2",
          margin: "55px",
          marginTop: "-10px",
          borderRadius: "10px",
          boxShadow: 0,
        }}
      >
        <CardContent sx={{ margin: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "35px",
                fontWeight: "700",
              }}
            >
              Recently Viewed
            </Typography>
            <Button color="error" variant="contained">
              Clear All
            </Button>
          </Box>
          <List sx={{ marginBottom: "-30px" }}>
            {viewedProfiles.map((profile, index) => (
              <ListItemButton
                sx={{
                  marginBottom: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
                onClick={handleClickProfile}
              >
                <Avatar
                  sx={{ width: "50px", height: "50px" }}
                  src={profile.avatar}
                />
                <Box
                  sx={{
                    width: "15%",
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {profile.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {profile.studentId}
                  </Typography>
                </Box>
                <Chip
                  sx={{
                    marginLeft: "30px",
                    textTransform: "uppercase",
                    padding: "10px",
                  }}
                  size="large"
                  color={getMajorColor(profile.primaryDegree)}
                  variant="outlined"
                  label={profile.primaryDegree}
                />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

// styling for admin home page
const AdminHomePage = () => {
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
        <Box
          sx={{
            margin: "55px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#e7f2ff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                marginLeft: "30px",
                marginBottom: "30px",
                fontSize: "40px",
                fontWeight: "700",
                color: "#004d80",
              }}
            >
              Welcome Back, {adminSampleProfile.name}
            </Typography>
            <Typography
              sx={{
                margin: "30px",
                fontSize: "17px",
                marginTop: "-10px",
                color: "#004d80",
              }}
            >
              Easily validate students' module plans and update their academic
              information.
            </Typography>
            <Button
              sx={{ marginLeft: "30px", marginTop: "-10px" }}
              variant="contained"
              component={Link}
              to={"/admin/students"}
            >
              Get started
            </Button>
          </Box>
          <Avatar
            sx={{ width: "25ch", height: "25ch" }}
            alt="Sample Icon"
            src={adminSampleProfile.avatar}
          />
        </Box>
        <RecentlyViewed viewedProfiles={sampleStudentsList} />
      </Box>
    </div>
  );
};

export default AdminHomePage;
