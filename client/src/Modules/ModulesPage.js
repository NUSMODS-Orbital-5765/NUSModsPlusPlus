import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState, useEffect } from "react";
import ModulesDisplay from "./ModulesDisplay";
import { SlideUpTransition } from "../StyledComponents";
import {
  FormAutocomplete,
  FormFacultyMajorField,
  FormMinorField,
} from "../FormStyledComponents";
import { majorList, progsList } from "../Constants";

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

// styling for academic info
export const emptyAcademicInfo = {
  faculty: "",
  primaryDegree: "",
  secondDegree: "",
  secondMajor: "",
  minor: [],
  programme: "",
};

// dialog for creating a new plan
export const CreatePlanDialog = ({
  openDialog,
  handleCloseDialog,
  currentAcademicInfo,
  onSubmit,
}) => {
  const [academicPlanInfo, setAcademicPlanInfo] = useState(currentAcademicInfo);

  const handleAcademicPlanInfo = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAcademicPlanInfo({ ...academicPlanInfo, [name]: value });
  };

  const [academicPlan, setAcademicPlan] = useState("");
  const handleAcademicPlanChange = (event) => {
    setAcademicPlan(event.target.value);
  };

  const handleMinorInfo = (value) => {
    setAcademicPlanInfo({
      ...academicPlanInfo,
      ["minor"]: value,
    });
  };

  const submitAcademicPlanInfo = () => {
    handleCloseDialog();
    onSubmit(academicPlanInfo);
    console.log(academicPlanInfo);
  };

  // check form completion status
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    faculty: academicPlanInfo.faculty === "",
    primaryDegree: academicPlanInfo.primaryDegree === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [academicPlanInfo]);

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={SlideUpTransition}
      fullWidth
      maxWidth="md"
      borderRadius="10px"
    >
      <DialogContent sx={{ margin: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
            Create New Plan
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseRoundedIcon sx={{ fontSize: "30px" }} color="error" />
          </IconButton>
        </Box>
        <Box
          sx={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <FormFacultyMajorField
              filledMajor=""
              filledFaculty=""
              setfn={handleAcademicPlanInfo}
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
              <InputLabel id="academic-plan">Academic Plan</InputLabel>
              <Select label="Academic Plan" onChange={handleAcademicPlanChange}>
                <MenuItem value={"Single Degree"}>Single Degree</MenuItem>
                <MenuItem value={"Double Degree"}>Double Degree</MenuItem>
                <MenuItem value={"Double Major"}>Double Major</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {academicPlan === "Double Degree" && (
            <Box sx={{ marginBottom: "20px" }}>
              <FormAutocomplete
                optionsList={majorList}
                label="Second Degree"
                name="secondDegree"
                setfn={handleAcademicPlanInfo}
              />
            </Box>
          )}
          {academicPlan === "Double Major" && (
            <Box sx={{ marginBottom: "20px" }}>
              <FormAutocomplete
                optionsList={majorList}
                label="Second Major"
                name="secondMajor"
                setfn={handleAcademicPlanInfo}
              />
            </Box>
          )}
          <Box sx={{ marginBottom: "20px" }}>
            <FormMinorField setfn={handleMinorInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormAutocomplete
              optionsList={progsList}
              label="Special Programme (if any)"
              name="programme"
              setfn={handleAcademicPlanInfo}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormComplete}
            onClick={submitAcademicPlanInfo}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
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

  // for adding more draft plans
  const [tabsList, setTabsList] = useState(["Default Plan"]);

  // only add a new plan if the input is not empty
  // otherwise users are still allowed to close the dialog, then there won't be any plan being rendered.
  const handleAddPlan = () => {
    if (tabsList.length === 1) {
      setOpenDialog(true);
      console.log(newTabAcademicInfo);
      newTabAcademicInfo !== emptyAcademicInfo &&
        setTabsList([...tabsList, "Draft Plan 1"]);
      console.log(newTabAcademicInfo);
    } else if (tabsList.length === 4) {
      setPlanAlert(true);
    } else {
      setOpenDialog(true);
      const newDraftPlan = "Draft Plan " + tabsList.length.toString();
      newTabAcademicInfo !== emptyAcademicInfo &&
        setTabsList([...tabsList, newDraftPlan]);
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
            <IconButton onClick={handleAddPlan}>
              <AddRoundedIcon color="primary" />
            </IconButton>
          </Box>
          <ModulesDisplay />
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
