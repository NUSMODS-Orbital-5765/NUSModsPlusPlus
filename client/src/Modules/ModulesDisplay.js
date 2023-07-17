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
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React, { useState } from "react";
import { sampleAcademicRequirements } from "../Constants";
import { grey, red } from "@mui/material/colors";

// semester module plans
export const SemesterModulePlans = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, activeTab) => {
    setCurrentTab(activeTab);
  };

  // list of tabs to be mapped
  const tabsList = ["Year 1", "Year 2", "Year 3", "Year 4"];

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
          <Button variant="contained">Request Approval</Button>
        </Box>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          {tabsList.map((tab, index) => (
            <Tab
              label={tab}
              sx={{ fontWeight: currentTab === index && 600 }}
            ></Tab>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

// check grad requirements
export function CheckGradRequirements(academicPlan) {
  let basicRequirements = ["commonModules", "primaryDegreeModules"];
  if (academicPlan.secondDegree) {
    basicRequirements.push("secondDegreeModules");
  } else if (academicPlan.secondMajor) {
    basicRequirements.push("secondMajorModules");
  }
  return basicRequirements;
}

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
export const GradRequirements = () => {
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
  return (
    <div>
      <GradRequirements />
      <Box sx={{ marginTop: "45px" }}>
        <SemesterModulePlans />
      </Box>
    </div>
  );
};

export default ModulesDisplay;
