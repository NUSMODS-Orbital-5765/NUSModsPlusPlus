import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  Dialog,
  DialogContent,
  Button,
  Card,
  CardContent,
  Chip,
  Fab,
  Grid,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import React, { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModulesDisplay from "./ModulesDisplay";
import {
  emptyPlanLayout,
  getRequiredModules,
  sampleAcademicPlan,
} from "./ModuleConstants";
import CreatePlanDialog from "./CreatePlanDialog";
import { combinedItems } from "../Home/HomePageStyledComponents";
import { BackToTop } from "../StyledComponents";
import { grey } from "@mui/material/colors";
import { FormatAcademicPlanTitle } from "./ModuleConstants";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { nanoid } from "nanoid";
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

// export const ModuleDisplayCards
export const ModuleDisplayCard = ({
  planIndex,
  academicPlan,
  gradRequirementsDict,
  semesterModulesDict,
  handleDeletePlan,
  nanoid
}) => {
  const [openPlan, setOpenPlan] = useState(false);
  const handleOpenPlan = () => {
    setOpenPlan(true);
  };

  const handleClosePlan = () => {
    setOpenPlan(false);
  };

  return (
    <div>
      <Card
        sx={{
          borderRadius: "10px",
          backgroundColor: planIndex === 0 ? "#f2f2f2" : "white",
          boxShadow: planIndex === 0 ? 0 : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ margin: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Chip
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                color: "white",
                backgroundColor: planIndex === 0 ? "#44b700" : grey[500],
              }}
              label={planIndex === 0 ? "Default" : "Draft"}
            />
            <Tooltip title="View Plan" placement="top">
              <IconButton
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    transform: "translateX(5px)",
                    transition: "transform 0.1s",
                  },
                }}
                onClick={handleOpenPlan}
              >
                <ArrowForwardRoundedIcon
                  color="primary"
                  sx={{ fontSize: "30px" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <FormatAcademicPlanTitle academicPlan={academicPlan} />
          <Dialog open={openPlan} fullScreen>
            <DialogContent>
              <ModulesDisplay
                academicPlan={academicPlan}
                gradRequirementsDict={gradRequirementsDict}
                semesterModulesDict={semesterModulesDict}
                planIndex={planIndex}
              />
              <Tooltip title="Close Plan" placement="top">
                <Fab
                  color="error"
                  onClick={handleClosePlan}
                  sx={{
                    position: "fixed",
                    top: "3rem",
                    right: "3rem",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <CloseRoundedIcon
                    sx={{ fontSize: "30px", fontWeight: 600 }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="Delete Plan" placement="top">
                <Fab
                  onClick={handleDeletePlan}
                  sx={{
                    backgroundColor: "black",
                    position: "fixed",
                    bottom: "3rem",
                    right: "3rem",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor: "black",
                    },
                  }}
                >
                  <DeleteRoundedIcon
                    sx={{ fontSize: "30px", fontWeight: 600, color: "white" }}
                  />
                </Fab>
              </Tooltip>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

// get the student plan list from the database
// calls function getRequiredModules here to get the module plan
export const defaultStudentPlanList = [
  {
    academicPlan: sampleAcademicPlan,
    gradRequirementsDict: getRequiredModules(sampleAcademicPlan),
    semesterModulesDict: emptyPlanLayout,
  },
];

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

  // warning for trying to delete the default plan
  const [deleteAlert, setDeleteAlert] = useState(false);

  // track the current student list of student plans
  const [planList, setPlanList] = useState([]);

  // only add a new plan if the input is not empty, add to the planList for mapping.
  const handleAddPlan = (academicPlanInfo) => {
    setPlanList((prevPlanList) => [
      ...prevPlanList,
      {
        nanoid: nanoid(),
        academicPlan: academicPlanInfo,
        gradRequirementsDict: getRequiredModules(academicPlanInfo),
        semesterModulesDict: emptyPlanLayout, // always begin with an empty plan layout
      },
    ]);
  };
  // Retrieve module plan from the database
  useEffect(()=>console.log(planList),[planList])
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
    setOpenDialog(true);
  };

  return (
    <div className="homepage">
      <DrawerComponent defaultTab={3} tabsList={combinedItems} />
      <AppBarComponent />
      <Box className="remainingViewport">
        <ModulesPageHeader handleOpenDialog={handleOpenDialog} />
        <Box sx={{ margin: "55px", marginBottom: "100px" }}>
          <Grid sx={{ marginTop: "-65px" }} container spacing={7}>
            {planList.map((plan, index) => (
              <Grid item xs={6} key={index}>
                <ModuleDisplayCard
                  title={plan.title}
                  planIndex={index}
                  academicPlan={plan.academicPlan}
                  nanoid={plan.nanoid}
                  gradRequirementsDict={plan.gradRequirementsDict}
                  semesterModulesDict={plan.semesterModulesDict}
                  handleDeletePlan={() => handleDeletePlan(index)}
                />
              </Grid>
            ))}
          </Grid>
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
