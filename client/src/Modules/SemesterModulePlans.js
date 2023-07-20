import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import React, { useState } from "react";
import {
  ModuleBox,
  SelectModuleBox,
  SelectedModulesAlert,
} from "./GradRequirements";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import { MoveModuleDialog } from "./ModulesDisplay";
import { sampleProfile } from "../Constants";
import { orange } from "@mui/material/colors";

// styling for each year plan
const EachYearPlan = ({
  academicPlan,
  currentYear,
  moduleList,
  handleSelectToShiftModule,
  handleDeselectToShiftModule,
  toShiftModules,
}) => {
  const semesters = ["Semester 1", "Semester 2"];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {semesters.map((semester, index) => (
        <Box
          sx={{
            marginTop: "20px",
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
            {semester}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {moduleList[currentYear][semester].map((moduleOrArray, index) =>
              Array.isArray(moduleOrArray) ? (
                <SelectModuleBox
                  key={index}
                  academicPlan={academicPlan}
                  moduleList={moduleOrArray}
                  handleSelectModule={handleSelectToShiftModule}
                  handleDeselectModule={handleDeselectToShiftModule}
                  selectedModules={toShiftModules}
                />
              ) : (
                <ModuleBox
                  academicPlan={academicPlan}
                  key={index}
                  module={moduleOrArray}
                  handleSelectModule={handleSelectToShiftModule}
                  handleDeselectModule={handleDeselectToShiftModule}
                  selectedModules={toShiftModules}
                />
              )
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// semester module plans
const SemesterModulePlans = ({ movedModules, isComplete, academicPlan }) => {
  // receives incoming modules from the grad requirements component
  const [moduleDict, setModuleDict] = useState(movedModules);

  // handle opening the dialog for moving modules
  const [openShiftModulesDialog, setOpenShiftModulesDialog] = useState(false);
  const handleOpenShiftModulesDialog = () => {
    setOpenShiftModulesDialog(true);
  };
  const handleCloseShiftModulesDialog = () => {
    setOpenShiftModulesDialog(false);
  };

  // select modules to be moved somewhere else within the component
  const [toShiftModules, setToShiftModules] = useState([]);
  const handleSelectToShiftModule = (module) => {
    setToShiftModules((prevSelectedModules) => [
      ...prevSelectedModules,
      module,
    ]);
  };

  const handleDeselectToShiftModule = (module) => {
    setToShiftModules((prevSelectedModules) =>
      prevSelectedModules.filter((selectedModule) => selectedModule !== module)
    );
  };

  // handle the shifting of modules to another year/semester
  const [destinationYear, setDestinationYear] = useState("");
  const handleDestinationYearChange = (event) => {
    setDestinationYear(event.target.value);
  };
  const [destinationSemester, setDestinationSemester] = useState("");
  const handleDestinationSemesterChange = (event) => {
    setDestinationSemester(event.target.value);
  };

  // handle the shifting of modules to another year/semester
  const handleSubmitShiftModules = () => {
    const updatedModuleDict = { ...moduleDict };

    toShiftModules.forEach((module) => {
      for (const year in updatedModuleDict) {
        for (const semester in updatedModuleDict[year]) {
          const currentModuleIndex = updatedModuleDict[year][
            semester
          ].findIndex((m) => m === module);

          if (currentModuleIndex !== -1) {
            updatedModuleDict[year][semester].splice(currentModuleIndex, 1);

            updatedModuleDict[destinationYear][destinationSemester].push(
              module
            );
            return;
          }
        }
      }
    });

    setOpenShiftModulesDialog(false);
    setModuleDict(updatedModuleDict);
    setToShiftModules([]);
  };

  // request approval
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const handleRequest = () => {
    if (isComplete) {
      setRequestSuccess(true);
      handleSubmitRequest();
    } else {
      setRequestError(true);
    }
  };

  // handle saving plan into database with "pending" status
  // doesnt matter default or not default lol maybe they want change major?
  const handleSubmitRequest = () => {
    setRequestSubmitted(true);
    console.log({
      student: sampleProfile, // replace with the current user
      status: "Pending",
      modulePlan: moduleDict,
    });
  };

  // perform plan validation
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const handleValidatePlan = () => {
    setValidateSuccess(true);
  };

  // plan recommendation dialog
  const [useRecommended, setUseRecommended] = useState(false);
  const handleUseRecommended = () => {
    setUseRecommended(true);
  };

  // save changes
  const [saveSuccess, setSaveSuccess] = useState(false);
  const handleSavePlan = () => {
    setSaveSuccess(true);
    console.log({
      student: sampleProfile, // replace with the current user
      status: requestSubmitted ? "Pending" : " ",
      modulePlan: moduleDict,
    });
  };

  // list of action buttons available
  const actionsList = [
    {
      tooltip: "Save Changes",
      handleClick: handleSavePlan,
      icon: <SaveAltRoundedIcon sx={{ color: "black", fontSize: "30px" }} />,
    },
    {
      tooltip: "Validate Plan",
      handleClick: handleValidatePlan,
      icon: <DoneAllRoundedIcon color="error" sx={{ fontSize: "30px" }} />,
    },
    {
      tooltip: "Auto-allocate Modules",
      handleClick: handleUseRecommended,
      icon: (
        <AutoAwesomeRoundedIcon color="primary" sx={{ fontSize: "30px" }} />
      ),
    },
    {
      tooltip: "Request Admin Approval",
      handleClick: handleRequest,
      icon: <ThumbUpRoundedIcon color="success" sx={{ fontSize: "30px" }} />,
    },
  ];

  // handle tabs system for different years
  const [currentTab, setCurrentTab] = useState(0);
  const tabsList = ["Year 1", "Year 2", "Year 3", "Year 4"];
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  return (
    <Card
      sx={{
        border: "1px solid #f2f2f2",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Semester Module Plans
            </Typography>
            {isComplete && (
              <Chip
                variant="outlined"
                color="success"
                label="Complete"
                sx={{
                  fontWeight: 600,
                  marginLeft: "30px",
                  marginRight: "-20px",
                  textTransform: "uppercase",
                }}
              />
            )}
            {requestSubmitted && (
              <Chip
                variant="filled"
                label="Pending"
                sx={{
                  fontWeight: 600,
                  backgroundColor: orange[600],
                  color: "white",
                  marginLeft: "30px",
                  textTransform: "uppercase",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {actionsList.map((action, index) => (
              <Tooltip title={action.tooltip} placement="top" key={index}>
                <IconButton onClick={action.handleClick}>
                  {action.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          {tabsList.map((tab, index) => (
            <Tab
              label={tab}
              sx={{ fontWeight: currentTab === index && 600 }}
            ></Tab>
          ))}
        </Tabs>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {toShiftModules.length !== 0 && (
            <SelectedModulesAlert
              handleMoveModules={handleOpenShiftModulesDialog}
              selectedModules={toShiftModules}
            />
          )}
          {tabsList.map(
            (tab, index) =>
              currentTab === index && (
                <EachYearPlan
                  academicPlan={academicPlan}
                  key={index}
                  currentYear={tabsList[index]}
                  moduleList={moduleDict}
                  handleSelectToShiftModule={handleSelectToShiftModule}
                  handleDeselectToShiftModule={handleDeselectToShiftModule}
                  toShiftModules={toShiftModules}
                />
              )
          )}
        </Box>
        <MoveModuleDialog
          openDialog={openShiftModulesDialog}
          handleCloseDialog={handleCloseShiftModulesDialog}
          handleDestinationYearChange={handleDestinationYearChange}
          handleDestinationSemesterChange={handleDestinationSemesterChange}
          destinationYear={destinationYear}
          destinationSemester={destinationSemester}
          handleSubmitMovedModules={handleSubmitShiftModules}
        />
        <PlanRecommendationDialog
          openDialog={useRecommended}
          handleCloseDialog={() => setUseRecommended(false)}
        />
        {/* snackbars and alerts that need to be shown accordingly */}
        <Snackbar
          open={validateSuccess}
          autoHideDuration={3000}
          onClose={() => setValidateSuccess(false)}
        >
          <Alert
            onClose={() => setValidateSuccess(false)}
            variant="filled"
            sx={{ color: "white" }}
            severity="success"
          >
            Your plan looks good!
          </Alert>
        </Snackbar>
        <Snackbar
          open={validateError}
          autoHideDuration={3000}
          onClose={() => setValidateError(false)}
        >
          <Alert
            onClose={() => setValidateError(false)}
            variant="filled"
            severity="error"
          >
            Please address the following issues:
          </Alert>
        </Snackbar>
        <Snackbar
          open={requestSuccess}
          autoHideDuration={3000}
          onClose={() => setRequestSuccess(false)}
        >
          <Alert
            onClose={() => setRequestSuccess(false)}
            sx={{ color: "white" }}
            variant="filled"
            severity="success"
          >
            Your request has been sent.
          </Alert>
        </Snackbar>
        <Snackbar
          open={requestError}
          autoHideDuration={3000}
          onClose={() => setRequestError(false)}
        >
          <Alert
            onClose={() => setRequestError(false)}
            sx={{ color: "white" }}
            variant="filled"
            severity="error"
          >
            Your plan is incomplete!
          </Alert>
        </Snackbar>
        <Snackbar
          open={saveSuccess}
          autoHideDuration={3000}
          onClose={() => setSaveSuccess(false)}
        >
          <Alert
            onClose={() => setSaveSuccess(false)}
            variant="filled"
            sx={{ color: "white" }}
            severity="success"
          >
            Plan saved!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

// plan recommendation dialog styling
export const PlanRecommendationDialog = ({ openDialog, handleCloseDialog }) => {
  // snackbar alert for successful replacement of recommended plan
  const [recommendedSuccess, setRecommendedSuccess] = useState(false);
  const handleRecommendedSuccess = () => {
    setRecommendedSuccess(true);
    handleCloseDialog();
  };

  return (
    <div>
      <Dialog sx={{ borderRadius: "10px" }} open={openDialog}>
        <DialogContent sx={{ margin: "5px" }}>
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
              Are you sure?
            </Typography>
            <IconButton>
              <CloseRoundedIcon
                color="error"
                sx={{ fontSize: "30px" }}
                onClick={handleCloseDialog}
              />
            </IconButton>
          </Box>
          <Typography sx={{ marginTop: "10px" }}>
            This will erase all current semester/yearly plans.
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleRecommendedSuccess}
            >
              Proceed
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={recommendedSuccess}
        autoHideDuration={3000}
        onClose={() => setRecommendedSuccess(false)}
      >
        <Alert
          onClose={() => setRecommendedSuccess(false)}
          variant="filled"
          sx={{ color: "white" }}
          severity="success"
        >
          Successfully replaced with recommended plan.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SemesterModulePlans;
