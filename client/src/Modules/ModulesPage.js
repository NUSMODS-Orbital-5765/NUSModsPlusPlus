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
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, { useState, useEffect } from "react";
import ModulesDisplay from "./ModulesDisplay";
import { emptyAcademicInfo, sampleAcademicPlan } from "./ModuleConstants";
import CreatePlanDialog from "./CreatePlanDialog";
import { BackToTop } from "../StyledComponents";

// header for modules page
export const ModulesPageHeader = ({ handleOpenDialog }) => {
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
          <Button variant="contained" onClick={handleOpenDialog}>
            Create New Plan
          </Button>
        </Box>
        <img src="/module-header.png" style={{ width: "30%" }} />
      </Box>
    </div>
  );
};

// main page component
const ModulesPage = () => {
  // ensure that users don't attempt to leave the page without saving their stuff
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handleBlur = () => {
      const confirmationMessage =
        "You have unsaved changes. Are you sure you want to leave the page?";
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // dialog for creating a new plan
  const [openDialog, setOpenDialog] = useState(false);

  // warning if too many plans have been created
  const [planAlert, setPlanAlert] = useState(false);

  // warning for trying to delete the default plan
  const [deleteAlert, setDeleteAlert] = useState(false);

  // keep an array of objects to track the current number of tabs and corresponding academic plans
  const [planList, setPlanList] = useState([
    { title: "Default Plan", academicPlan: sampleAcademicPlan },
  ]);

  // only add a new plan if the input is not empty, add to the planList for mapping.
  const handleAddPlan = (academicPlanInfo) => {
    const newDraftPlan = "Draft Plan " + planList.length.toString();
    setPlanList((prevPlanList) => [
      ...prevPlanList,
      { title: newDraftPlan, academicPlan: academicPlanInfo },
    ]);
  };

  // handle deleting a plan
  const handleDeletePlan = (index) => {
    if (index === 0) {
      setDeleteAlert(true);
    } else {
      setPlanList((prevPlanList) => {
        const newPlanList = prevPlanList.filter((plan, ind) => ind !== index);
        return newPlanList;
      });
    }
  };

  // function for clicking on "add" button
  const handleOpenDialog = () => {
    if (planList.length === 3) {
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
        <ModulesPageHeader handleOpenDialog={handleOpenDialog} />
        <Box sx={{ margin: "55px", marginTop: "-20px", marginBottom: "100px" }}>
          {planList.map((plan, index) => (
            <Box sx={{ marginBottom: "35px" }}>
              <ModulesDisplay
                index={index}
                handleDeletePlan={() => handleDeletePlan(index)}
                academicPlan={plan.academicPlan}
                type={index === 0 ? "default" : "draft"}
              />
            </Box>
          ))}
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
              You are only allowed to create a maximum of 2 draft plans.
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
          <BackToTop />
        </Box>
      </Box>
    </div>
  );
};
export default ModulesPage;
