import { Link } from "react-router-dom";
import { adminSampleProfile, sampleStudentsList } from "./AdminConstants";
import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import StudentDataGrid from "./StudentDataGrid";
import React, { useState } from "react";

// styling for recently viewed component
export const RecentlyViewedProfiles = ({ viewedProfiles }) => {
  // for clearing all profiles
  const [currentProfiles, setCurrentProfiles] = useState(viewedProfiles);
  const handleClearProfiles = () => {
    setCurrentProfiles([]);
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
              marginBottom: "20px",
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
            <Button
              onClick={handleClearProfiles}
              color="error"
              variant="contained"
            >
              Clear All
            </Button>
          </Box>
          <StudentDataGrid color={false} studentList={currentProfiles} />
        </CardContent>
      </Card>
    </div>
  );
};

// styling for flagged component
// use a search to filter the "Pending" students within admin's home department
export const PendingProfiles = ({ pendingProfiles }) => {
  return (
    <div>
      <Card
        sx={{
          margin: "55px",
          marginTop: "-10px",
          borderRadius: "10px",
          border: "1px solid #f2f2f2",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ margin: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "35px",
                fontWeight: "700",
              }}
            >
              Pending
            </Typography>
          </Box>
          <StudentDataGrid color={true} studentList={pendingProfiles} />
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
        <RecentlyViewedProfiles viewedProfiles={sampleStudentsList} />
        <PendingProfiles pendingProfiles={sampleStudentsList} />
      </Box>
    </div>
  );
};

export default AdminHomePage;
