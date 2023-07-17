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
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import React, { useState, useEffect } from "react";
import {
  getRequiredModules,
  FormatAcademicPlanDetails,
} from "./ModuleConstants";
import { grey, red } from "@mui/material/colors";

// get different colors for different module categories
export function getModuleColors(cat) {
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

// graduation requirements component
const GradRequirements = ({
  academicPlan,
  type,
  requiredModulesDict,
  selectedModules,
  handleSelectModule,
  handleDeselectModule,
  handleMoveModules,
}) => {
  // styling for module box
  const ModuleBox = ({ module, category }) => {
    const isSelected = selectedModules.includes(module);

    return (
      <Box id={module.code} sx={{ marginTop: "10px", marginBottom: "20px" }}>
        <Button
          sx={{
            borderRadius: "10px",
            color: getModuleColors(category),
            opacity: isSelected ? 0.5 : 1,
          }}
          onClick={
            isSelected
              ? () => handleDeselectModule(module)
              : () => handleSelectModule(module)
          }
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
                  module={module}
                  category={requirement.name}
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
                  label="Default"
                />
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title="Delete" placement="top">
                <IconButton disabled={type === "default"}>
                  <DeleteRoundedIcon sx={{ fontSize: "30px" }} color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <FormatAcademicPlanDetails academicPlan={academicPlan} />
          </Box>
          {selectedModules.length !== 0 && (
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
              <span style={{ fontWeight: 700 }}>{selectedModules.length}</span>{" "}
              modules.
            </Alert>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default GradRequirements;
