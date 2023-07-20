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
import React, { useState, useEffect } from "react";
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
  // dialog for creating a new plan
  const [openDialog, setOpenDialog] = useState(false);

  // warning if too many plans have been created
  const [planAlert, setPlanAlert] = useState(false);

  // warning for trying to delete the default plan
  const [deleteAlert, setDeleteAlert] = useState(false);

  // logic for switching tabs
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  // keep an array of objects to track the current number of tabs and corresponding academic plans
  const [tabsList, setTabsList] = useState([
    { title: "Default Plan", academicPlan: sampleAcademicPlan },
  ]);

  // only add a new plan if the input is not empty, add to the tabsList for mapping.
  const handleAddPlan = (academicPlanInfo) => {
    const newDraftPlan = "Draft Plan " + tabsList.length.toString();
    setTabsList((prevTabsList) => [
      ...prevTabsList,
      { title: newDraftPlan, academicPlan: academicPlanInfo },
    ]);
  };

  // handle deleting a plan
  const handleDeletePlan = (index) => {
    if (index === 0) {
      setDeleteAlert(true);
    } else {
      setTabsList((prevTabsList) => {
        const newTabsList = prevTabsList.filter((tab, ind) => ind !== index);
        return newTabsList;
      });
      setCurrentTab(0);
    }
  };

  // function for clicking on "add" button
  const handleOpenDialog = () => {
    if (tabsList.length === 4) {
      setPlanAlert(true);
    } else {
      setOpenDialog(true);
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
                  label={tab.title}
                  key={index}
                  sx={{ fontWeight: currentTab === index && 600 }}
                />
              ))}
            </Tabs>
            <Tooltip title="Add New Plan" placement="top">
              <IconButton onClick={handleOpenDialog}>
                <AddRoundedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
          {tabsList.map(
            (tab, index) =>
              index === currentTab && (
                <ModulesDisplay
                  index={index}
                  handleDeletePlan={() => handleDeletePlan(index)}
                  academicPlan={tab.academicPlan}
                  type={index === 0 ? "default" : "draft"}
                />
              )
          )}
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
          <Snackbar
            open={deleteAlert}
            autoHideDuration={3000}
            onClose={() => setDeleteAlert(false)}
          >
            <Alert
              onClose={() => setDeleteAlert(false)}
              variant="filled"
              severity="error"
            >
              You cannot delete a default plan!
            </Alert>
          </Snackbar>
          <CreatePlanDialog
            openDialog={openDialog}
            handleCloseDialog={() => setOpenDialog(false)}
            handleSubmitAcademicInfo={(academicPlanInfo) =>
              handleAddPlan(academicPlanInfo)
            }
          />
        </Box>
      </Box>
    </div>
  );
};
export default ModulesPage;
