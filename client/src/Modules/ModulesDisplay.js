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
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React, { useState } from "react";
import { sampleAcademicPlan, sampleAcademicRequirements } from "../Constants";
import { grey, red } from "@mui/material/colors";
import { SlideUpTransition } from "../StyledComponents";

// placeholder function for getting academic requirements
// i assume the plan that we get when we enter a sample academic plan is in this format..hahaha
export function CheckGradRequirements(academicPlan) {
  return sampleAcademicRequirements;
}

// semester module plans
// TODO: insert dialog for getting a plan recommendation
export const SemesterModulePlans = () => {
  // request approval
  const [requestSuccess, setRequestSuccess] = useState(false);
  const handleRequestSuccess = () => {
    setRequestSuccess(true);
  };

  // perform validation
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const handleValidatePlan = () => {
    setValidateSuccess(true);
  };

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
            <Chip
              variant="filled"
              color="error"
              label="Rejected"
              sx={{
                fontWeight: 600,
                marginLeft: "30px",
                textTransform: "uppercase",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Tooltip title="Validate Plan" placement="top">
              <IconButton onClick={handleValidatePlan}>
                <DoneAllRoundedIcon sx={{ fontSize: "30px" }} color="error" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Use Recommended Plan" placement="top">
              <IconButton>
                <AutoAwesomeRoundedIcon
                  sx={{ fontSize: "30px" }}
                  color="primary"
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Request Approval" placement="top">
              <IconButton onClick={handleRequestSuccess}>
                <ThumbUpRoundedIcon sx={{ fontSize: "30px" }} color="success" />
              </IconButton>
            </Tooltip>
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
      </CardContent>
    </Card>
  );
};

// styling for module box and module section
export const ModuleBox = ({ module, category, handleSelectModule }) => {
  // get different colors for different module categories
  function getModuleColors(cat) {
    if (cat === "commonModules") {
      return "#1a90ff";
    } else if (cat === "primaryDegreeModules") {
      return red[500];
    } else if (cat === "secondDegreeModules" || cat === "secondMajorModules") {
      return "#44b700";
    } else if (cat === "minorModules") {
      return grey[500];
    } else {
      return "black";
    }
  }

  const [clicked, setClicked] = useState(false);
  const toggleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Box
      id={module.code}
      sx={{ borderRadius: "10px", marginTop: "10px", marginBottom: "20px" }}
    >
      <Button
        sx={{ color: getModuleColors(category), opacity: clicked ? 0.5 : 1 }}
        onClick={toggleClick}
        component={Card}
      >
        <CardContent
          sx={{
            width: "200px",
            margin: "-10px",
            backgroundColor: getModuleColors(category),
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {module.code}
          </Typography>
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "15px",
              textTransform: "none",
              color: "white",
            }}
          >
            {module.name}
          </Typography>
        </CardContent>
      </Button>
    </Box>
  );
};

// white card containing the module boxes, organised by grad requirement
export const ModuleSection = ({ requirement }) => {
  // expand more button
  const [expandMore, setExpandMore] = useState(false);
  const handleExpandMore = () => {
    setExpandMore(true);
  };

  // function for rewriting the module section header
  function getSectionHeader(req) {
    if (req === "commonModules") {
      return "Common";
    } else if (req === "primaryDegreeModules") {
      return "Primary Degree";
    } else if (req === "secondDegreeModules") {
      return "Second Degree";
    } else if (req === "secondMajorModules") {
      return "Second Major";
    } else if (req === "minorModules") {
      return "Minor";
    }
  }
  return (
    <Card
      sx={{
        borderRadius: "10px",
        backgroundColor: "white",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ margin: "20px", marginTop: "0px" }}>
        <Typography
          sx={{
            marginBottom: "20px",
            fontSize: "30px",
            fontWeight: 700,
          }}
        >
          {getSectionHeader(requirement.name)}
        </Typography>
        {requirement.modules.map((module, index) => (
          <ModuleBox module={module} category={requirement.name} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

// graduation requirements component
export const GradRequirements = ({ academicPlan }) => {
  // expand more button
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // display of the inputs for students' selected academic plan
  const AcademicPlanDetails = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>Double Major </span> in Information
          Systems and Economics •{" "}
          <span style={{ fontWeight: 600 }}>Minor </span> in Geography, History
        </Typography>
        <IconButton sx={{ marginLeft: "10px" }}>
          <EditRoundedIcon color="primary" />
        </IconButton>
      </Box>
    );
  };

  return (
    <div>
      <Card
        sx={{
          borderRadius: "10px",
          backgroundColor: "#f2f2f2",
          boxShadow: 0,
        }}
      >
        <CardContent
          sx={{
            margin: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
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
                Graduation Requirements
              </Typography>
              <Chip
                sx={{
                  marginLeft: "30px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "white",
                }}
                label="Default"
                color="success"
                variant="filled"
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title="Delete" placement="top">
                <IconButton>
                  <DeleteRoundedIcon color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            <AcademicPlanDetails />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", overflowX: "auto" }}
          >
            {sampleAcademicRequirements.map((requirement, index) => (
              <ModuleSection requirement={requirement} key={index} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

// combination of semester and grad requirement designs
const ModulesDisplay = () => {
  // handle the modules that have been moved/have not been moved
  const [remainingModules, setRemainingModules] = useState([]);
  const [movedModules, setMovedModules] = useState([]);

  return (
    <div>
      <GradRequirements academicPlan={sampleAcademicPlan} />
      <Box sx={{ marginTop: "45px" }}>
        <SemesterModulePlans />
      </Box>
    </div>
  );
};

export default ModulesDisplay;
