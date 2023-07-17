import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React, { useState } from "react";
import {
  sampleAcademicRequirements,
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

// styling for module box and module section
export const ModuleBox = ({ module, category, handleSelectModule }) => {
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
export const ModuleSection = ({ requirement, academicPlan }) => {
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
        minWidth: "300px",
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
          <ModuleBox module={module} category={requirement.name} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

// graduation requirements component
const GradRequirements = ({ academicPlan, type }) => {
  // placeholder line to get the academic requirements from academic plan.
  const requiredModulesDict = getRequiredModules(academicPlan);

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
          <Box
            sx={{ overflowX: "auto", display: "flex", flexDirection: "row" }}
          >
            {sampleAcademicRequirements.map((requirement, index) => (
              <ModuleSection
                academicPlan={academicPlan}
                requirement={requirement}
                key={index}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradRequirements;
