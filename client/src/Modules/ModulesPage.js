import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import React, { useState } from "react";
import ModulesDisplay from "./ModulesDisplay";
import { emptyAcademicInfo, sampleAcademicPlan } from "./ModuleConstants";
import CreatePlanDialog from "./CreatePlanDialog";

// header for modules page
export const ModulesPageHeader = () => {
  return (
    <div>
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
        }}
      >
        <Box sx={{ margin: "30px" }}>
          <Typography
            sx={{
              marginBottom: "30px",
              fontSize: "40px",
              fontWeight: "700",
              color: "#004d80",
            }}
          >
            Module planning made easy.
          </Typography>
          <Typography
            sx={{
              marginBottom: "30px",
              marginTop: "-10px",
              fontSize: "17px",
              color: "#004d80",
            }}
          >
            Easily draft semester plans, check major requirements, get
            recommendations, and receive administrative validation.
          </Typography>
        </Box>
        <img src="/module-header.png" style={{ width: "30%" }} />
      </Box>
    </div>
  );
};

// main page component
const ModulesPage = () => {
  // information about the new tab
  const [newTabAcademicInfo, setNewTabAcademicInfo] =
    useState(emptyAcademicInfo);

  // dialog for creating a new plan
  const [openDialog, setOpenDialog] = useState(false);

  // warning if too many plans have been created
  const [planAlert, setPlanAlert] = useState(false);

  // logic for switching tabs
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  // for adding more draft plans & keeping track of the
  const [tabsList, setTabsList] = useState({
    "Default Plan": sampleAcademicPlan,
  });

  // only add a new plan if the input is not empty, add to the tabsList for mapping.
  const handleAddPlan = () => {
    if (tabsList.length === 4) {
      setPlanAlert(true);
    } else {
      setOpenDialog(true);
      const newDraftPlan = "Draft Plan " + tabsList.length.toString();
      newTabAcademicInfo !== emptyAcademicInfo &&
        setTabsList([...tabsList, newDraftPlan]);
      setNewTabAcademicInfo(emptyAcademicInfo);
    }
  };

  return (
    <div className="homepage">
      <DrawerComponent defaultTab={3} />
      <AppBarComponent />
      <Box className="remainingViewport">
        <ModulesPageHeader />
        <Box sx={{ margin: "55px", marginTop: "-20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {tabsList.map((tab, index) => (
                <Tab
                  label={tab}
                  key={index}
                  sx={{ fontWeight: currentTab === index && 600 }}
                />
              ))}
            </Tabs>
            <Tooltip title="Add New Plan" placement="top">
              <IconButton onClick={handleAddPlan}>
                <AddRoundedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
          <ModulesDisplay academicPlan={sampleAcademicPlan} />
          <Snackbar
            open={planAlert}
            autoHideDuration={3000}
            onClose={() => setPlanAlert(false)}
          >
            <Alert
              onClose={() => setPlanAlert(false)}
              variant="filled"
              severity="error"
            >
              You are only allowed to create a maximum of 3 draft plans.
            </Alert>
          </Snackbar>
          <CreatePlanDialog
            openDialog={openDialog}
            handleCloseDialog={() => setOpenDialog(false)}
            currentAcademicInfo={emptyAcademicInfo}
            onSubmit={(newTabInfo) => setNewTabAcademicInfo(newTabInfo)} // this is so that the requirements for the new plan can be calculated and then displayed
          />
        </Box>
      </Box>
    </div>
  );
};
export default ModulesPage;
