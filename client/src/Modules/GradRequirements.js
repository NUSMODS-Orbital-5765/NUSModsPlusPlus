import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import React, { useState } from "react";
import {
  getRequiredModules,
  FormatAcademicPlanDetails,
  getRecommendedPlan,
} from "./ModuleConstants";
import { grey, red } from "@mui/material/colors";

// get different colors for different module categories
export function getModuleColors(module, academicPlan) {
  const defaultRequiredModules = getRequiredModules(academicPlan);

  for (const category of defaultRequiredModules) {
    const foundModule = category.modules.find(
      (item) => item.code === module.code
    );
    if (foundModule) {
      if (category.name === "commonModules") {
        return "#1a90ff";
      } else if (category.name === "primaryDegreeModules") {
        return red[500];
      } else if (
        category.name === "secondDegreeModules" ||
        category.name === "secondMajorModules"
      ) {
        return "#44b700";
      } else if (category.name === "minorModules") {
        return grey[500];
      }
    }
  }

  return "black";
}

// function for rewriting the module section header
export function getSectionHeader(req, academicPlan) {
  if (req === "commonModules") {
    return "Common Modules";
  } else if (req === "primaryDegreeModules") {
    return "Degree in " + academicPlan.primaryDegree.toString();
  } else if (req === "secondDegreeModules") {
    return "Second Degree in " + academicPlan.secondDegree.toString();
  } else if (req === "secondMajorModules") {
    return "Second Major in " + academicPlan.secondMajor.toString();
  } else if (req === "minorModules") {
    return (
      "Minor in " + academicPlan.minor.map((item) => item.toString()).join(",")
    );
  }
}

// styling for the alert feature
export const SelectedModulesAlert = ({
  handleMoveModules,
  selectedModules,
}) => {
  return (
    <Alert
      action={
        <Tooltip title="Add to Semester Plan" placement="top">
          <IconButton color="primary" onClick={handleMoveModules}>
            <DriveFileMoveRoundedIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
      }
      sx={{
        borderRadius: "10px",
        marginTop: "20px",
        backgroundColor: "#e7f2ff",
        color: "#1a90ff",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
      }}
      severity="info"
      variant="filled"
    >
      You have selected{" "}
      <span style={{ fontWeight: 700 }}>{selectedModules.length}</span> modules.
    </Alert>
  );
};

// styling for module box
export const ModuleBox = ({
  module,
  academicPlan,
  selectedModules,
  handleSelectModule,
  handleDeselectModule,
}) => {
  // check if the modulebox is selected, then activate selected display state
  const isSelected = selectedModules.includes(module);

  // handle selecting/de-selecting module
  const handleClickModule = () => {
    if (isSelected) {
      handleDeselectModule(module);
    } else {
      handleSelectModule(module);
    }
  };

  return (
    <Box id={module.code} sx={{ marginTop: "10px", marginBottom: "20px" }}>
      <Button
        sx={{
          borderRadius: "10px",
          color: getModuleColors(module, academicPlan),
          opacity: isSelected ? 0.5 : 1,
        }}
        onClick={handleClickModule}
        component={Card}
      >
        <CardContent
          sx={{
            width: "200px",
            margin: "-10px",
            backgroundColor: getModuleColors(module, academicPlan),
          }}
        >
          <a
            href={`https://nusmods.com/courses/${module.code}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {module.code}
          </a>
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

// graduation requirements component
const GradRequirements = ({
  academicPlan,
  type,
  requiredModulesDict,
  selectedModules,
  handleSelectModule,
  handleDeselectModule,
  handleMoveModules,
  handleDeletePlan,
  handleSaveGradRequirements,
}) => {
  // snackbar to show that changes have been saved
  const [saveSuccess, setSaveSuccess] = useState(false);
  const handleSaveSuccess = () => {
    handleSaveGradRequirements();
    setSaveSuccess(true);
  };

  // styling for the required modules area
  const RequiredModules = () => {
    return (
      <Box sx={{ overflowX: "auto", display: "flex", flexDirection: "row" }}>
        {requiredModulesDict.map((requirement, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              boxShadow: 0,
              minWidth: "280px",
            }}
          >
            <CardContent sx={{ margin: "20px", marginTop: "0px" }}>
              <Typography
                sx={{
                  marginBottom: "20px",
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                {getSectionHeader(requirement.name, academicPlan)}
              </Typography>
              {requirement.modules.map((module, index) => (
                <ModuleBox
                  selectedModules={selectedModules}
                  handleSelectModule={handleSelectModule}
                  handleDeselectModule={handleDeselectModule}
                  module={module}
                  academicPlan={academicPlan}
                  key={index}
                />
              ))}
            </CardContent>
          </Card>
        ))}
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
              {type === "default" && (
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
              )}
              {type === "draft" && (
                <Chip
                  sx={{
                    marginLeft: "30px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "white",
                    backgroundColor: grey[500],
                  }}
                  label="Draft"
                />
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title="Save Changes" placement="top">
                <IconButton onClick={handleSaveSuccess}>
                  <SaveAltRoundedIcon
                    sx={{ fontSize: "30px", color: "black" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" placement="top">
                <IconButton onClick={handleDeletePlan}>
                  <DeleteRoundedIcon sx={{ fontSize: "30px" }} color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <FormatAcademicPlanDetails academicPlan={academicPlan} />
          </Box>
          {selectedModules.length !== 0 && (
            <SelectedModulesAlert
              handleMoveModules={handleMoveModules}
              selectedModules={selectedModules}
            />
          )}
          <Box
            sx={{
              marginLeft: "-20px",
              marginRight: "-20px",
              marginTop: "10px",
            }}
          >
            <RequiredModules />
          </Box>
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
              Graduation requirements saved!
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradRequirements;
