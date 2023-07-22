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
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import React, { useState } from "react";
import ModuleBox from "./ModuleBox";
import SelectModuleBox from "./SelectModuleBox";
import { sampleProfile } from "../Constants";
import { orange, red } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";

// styling for module plan chips
export const ModulePlanStatusChip = ({ status }) => {
  function getChipColor(status) {
    if (status === "Approved") {
      return "#44b700";
    } else if (status === "Pending") {
      return orange[600];
    } else {
      return red[500];
    }
  }

  return (
    <Chip
      variant="filled"
      label={status}
      sx={{
        fontWeight: 600,
        backgroundColor: getChipColor(status),
        color: "white",
        marginLeft: "30px",
        textTransform: "uppercase",
      }}
    />
  );
};

// semester module plans data grid (use for admin viewing)
export const SemesterModulePlansDataGrid = ({
  semesterModulesDict,
  modulePlanStatus,
}) => {
  const allYears = Object.keys(semesterModulesDict);
  const allSemesters = Object.keys(semesterModulesDict[allYears[0]]);

  const columns = allYears.reduce((cols, year) => {
    const semesterColumns = allSemesters.map((semester) => ({
      field: `${year}-${semester}`,
      headerName: `Y${year.slice(-1)}S${semester.slice(-1)}`,
      flex: 1,
      valueGetter: (params) => {
        const module = semesterModulesDict[year][semester][params.row.id];
        return module ? module : "";
      },
      renderCell: (params) => {
        const moduleCode = params.value.code;
        const moduleName = params.value.name;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100px",
            }}
          >
            <a
              href={`https://nusmods.com/courses/${moduleCode}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
              }}
            >
              {moduleCode}
            </a>
            <Typography
              sx={{
                marginTop: "5px",
                fontSize: "14px",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              {moduleName}
            </Typography>
          </Box>
        );
      },
    }));

    return [...cols, ...semesterColumns];
  }, []);

  const rows = [];
  allYears.forEach((year) => {
    allSemesters.forEach((semester, index) => {
      semesterModulesDict[year][semester].forEach((module) => {
        rows.push({
          id: rows.length + 1,
          year: year,
          semester: semester,
          [`${year}-${semester}`]: module,
        });
      });
    });
  });

  const rowsPerPage = 10;

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
            flexDirection: "column",
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
            <ModulePlanStatusChip status={modulePlanStatus} />
          </Box>
          <div style={{ marginTop: "20px", height: 1000, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              rowHeight={150}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

// styling for each year plan
export const EachYearPlan = ({
  currentYear,
  semesterModulesDict,
  handleRevertModule,
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
            {semesterModulesDict[currentYear][semester].map(
              (moduleOrArray, index) =>
                Array.isArray(moduleOrArray) ? (
                  <SelectModuleBox
                    isSelectable={false}
                    key={index}
                    moduleList={moduleOrArray}
                  />
                ) : (
                  <ModuleBox
                    isSelectable={false}
                    isRevertable={true}
                    handleRevertModule={handleRevertModule}
                    key={index}
                    requirement={moduleOrArray.requirement}
                    module={moduleOrArray.module}
                  />
                )
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// semester module plans (functioning) for student use
const SemesterModulePlans = ({
  academicPlan,
  handleRevertModule,
  semesterModulesDict,
  isComplete,
  modulePlanStatus,
}) => {
  // retrieve status from database and update status when the user requests for approval
  const [newModulePlanStatus, setNewModulePlanStatus] =
    useState(modulePlanStatus);

  // request approval
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const handleRequest = () => {
    if (isComplete) {
      setRequestSuccess(true);
      handleSubmitRequest();
      setNewModulePlanStatus("Pending");
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
      academicPlan: academicPlan,
      semesterModules: semesterModulesDict,
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

  // list of action buttons available
  const actionsList = [
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
            {newModulePlanStatus && (
              <ModulePlanStatusChip status={newModulePlanStatus} />
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
          {tabsList.map(
            (tab, index) =>
              currentTab === index && (
                <EachYearPlan
                  academicPlan={academicPlan}
                  key={index}
                  currentYear={tabsList[index]}
                  semesterModulesDict={semesterModulesDict}
                  handleRevertModule={handleRevertModule}
                />
              )
          )}
        </Box>
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
