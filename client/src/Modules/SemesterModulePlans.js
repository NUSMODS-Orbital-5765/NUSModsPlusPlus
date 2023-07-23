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
import axios from "axios";
import LoadingBackdrop from "./LoadingBackdrop";

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
  disabled,
  handleChooseModule,
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
              (moduleObject, index) =>
                moduleObject.module.hasOwnProperty("options") ? (
                  <SelectModuleBox
                    isSelectable={false}
                    isRevertable={disabled ? false : true}
                    handleChooseModule={handleChooseModule}
                    handleRevertModule={handleRevertModule}
                    key={index}
                    requirement={moduleObject.requirement}
                    module={moduleObject.module}
                  />
                ) : (
                  <ModuleBox
                    isSelectable={false}
                    isRevertable={disabled ? false : true}
                    handleRevertModule={handleRevertModule}
                    key={index}
                    requirement={moduleObject.requirement}
                    module={moduleObject.module}
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
  handleChooseModule,
  handleRevertModule,
  handleRecommendedPlan,
  handleRequestApproval,
  modulePlanStatus,
  disabled,
  semesterModulesDict,
  isComplete,
}) => {
  // request approval
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const handleRequest = () => {
    if (isComplete) {
      setRequestSuccess(true);
      handleRequestApproval();
    } else {
      setRequestError(true);
    }
  };

  // perform plan validation
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const [validateErrorContent, setValidateErrorContent] = useState();
  const handleValidatePlan = () => {
    setIsLoading(true);
    const ModulePlanValidateAPI = `${process.env.REACT_APP_API_LINK}/module-plan/validate`;

    axios
      .post(ModulePlanValidateAPI, {
        semesterModulesDict: semesterModulesDict,
      })
      .then((res) => {
        setIsLoading(false);
        const failedList = res.data.failedList;
        console.log(`failed list = ${failedList}`);
        if (failedList.length === 0) {
          setValidateSuccess(true);
        } else {
          setValidateError(true);
          setValidateErrorContent(failedList);
        }
      })
      .catch((err) => console.log(err));
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
      handleClick: handleRecommendedPlan,
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
            {modulePlanStatus && (
              <ModulePlanStatusChip status={modulePlanStatus} />
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
                  disabled={disabled}
                  academicPlan={academicPlan}
                  key={index}
                  currentYear={tabsList[index]}
                  handleChooseModule={handleChooseModule}
                  semesterModulesDict={semesterModulesDict}
                  handleRevertModule={handleRevertModule}
                />
              )
          )}
        </Box>
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
            {`Please address the following issues: ${validateErrorContent}`}
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
        {isLoading && <LoadingBackdrop />}
      </CardContent>
    </Card>
  );
};

export default SemesterModulePlans;
