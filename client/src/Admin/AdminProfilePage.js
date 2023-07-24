import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";
import { Box, Typography, Switch, Tooltip, Tabs, Tab } from "@mui/material";
import ProfilePictureComponent from "../Profile/ProfilePictureComponent";
import { adminSampleProfile } from "./AdminConstants";
import { PublicProfileButton } from "../Profile/ProfilePage";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountSecurityTab from "../Profile/AccountSecurityTab";
import AdminProfileInfoComponent from "./AdminProfileInfoComponent";

// list of tabs to be mapped for admin users
export const adminProfileTabsList = [
  { label: "My Info", icon: <InfoRoundedIcon />, link: "/admin/profile" },
  {
    label: "Account Security",
    icon: <LockRoundedIcon />,
    link: "/admin/profile/account",
  },
];

const AdminProfilePage = ({ selectedTab }) => {
  // handling the tabs field
  const [currentTab, setCurrentTab] = useState(selectedTab);
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  return (
    <div>
      <AdminAppBar />
      <AdminDrawerComponent defaultTab={5} />
      <Box
        className="remainingViewport"
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
      >
        <Box
          sx={{
            margin: "55px",
            marginTop: "20px",
            borderRadius: "10px",
            background: `
      linear-gradient(to bottom,  #e7f2ff 80%, white 20%),
      #e7f2ff 
    `,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            position: "relative",
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
            <ProfilePictureComponent sampleIcon={"/sample-admin-icon.png"} />
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
                {localStorage.getItem("name")}
              </Typography>
              <Typography sx={{ color: "#004d80" }}>
                Admin • {localStorage.getItem("department")}
              </Typography>
              <Box
                sx={{
                  marginLeft: "-10px",
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <Tooltip
                  title="Admin profiles must be set to public."
                  placement="top"
                >
                  <span style={{ pointerEvents: "auto" }}>
                    <Switch
                      color="success"
                      defaultChecked
                      style={{ pointerEvents: "none" }}
                    />
                  </span>
                </Tooltip>
                <Typography sx={{ fontWeight: 600, color: "#004d80" }}>
                  Public
                </Typography>
              </Box>
            </Box>
            <PublicProfileButton link={"/admin/profile/public"} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "5px",
              borderTopLeftRadius: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Tabs
              sx={{
                marginLeft: "55ch",
              }}
              value={selectedTab}
            >
              {adminProfileTabsList.map((item, index) => (
                <Tab
                  sx={{ borderRadius: "10px 10px 0 0" }}
                  component={Link}
                  to={item.link}
                  key={index}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      {item.icon}
                      <Typography
                        sx={{
                          marginLeft: "10px",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        {selectedTab === 0 && (
          <AdminProfileInfoComponent userProfile={adminSampleProfile} />
        )}
        {selectedTab === 1 && (
          <AccountSecurityTab userProfile={adminSampleProfile} />
        )}
      </Box>
    </div>
  );
};

export default AdminProfilePage;
