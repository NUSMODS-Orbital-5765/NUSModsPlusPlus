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
  Autocomplete,
  TextField,
} from "@mui/material";
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import React, { useState } from "react";
import {
  getRequiredModules,
  FormatAcademicPlanDetails,
  getRecommendedPlan,
} from "./ModuleConstants";
import { grey, red } from "@mui/material/colors";

// get different colors for different modules
export function getModuleColors(module, academicPlan) {
  const defaultRequiredModules = getRequiredModules(academicPlan);

  function findModuleInCategory(category, moduleCode) {
    for (const item of category.modules) {
      if (Array.isArray(item)) {
        const foundModule = findModuleInCategory({ modules: item }, moduleCode);
        if (foundModule) {
          return foundModule;
        }
      } else if (item.code === moduleCode) {
        return item;
      }
    }
    return null;
  }

  for (const category of defaultRequiredModules) {
    const foundModule = findModuleInCategory(category, module.code);
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

export const SelectModuleBox = ({
  moduleList,
  academicPlan,
  selectedModules,
  handleSelectModule,
  handleDeselectModule,
}) => {
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);
  const [showSelectOptions, setShowSelectOptions] = useState(false);

  const isSelected = selectedModules.includes(moduleList);

  const handleSelectButtonClick = (event) => {
    event.stopPropagation();
    if (isSelected) {
      handleDeselectModule(moduleList);
    } else {
      handleSelectModule(moduleList);
    }
  };

  const handleShowSelectOptions = (event) => {
    event.stopPropagation();
    setShowSelectOptions(true);
  };

  const handleChangeModule = (event, newValue) => {
    event.stopPropagation();
    if (newValue) {
      setSelectedModule(moduleList.find((module) => module.code === newValue));
      setShowSelectOptions(false);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "10px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: getModuleColors(moduleList[0], academicPlan),
        opacity: isSelected ? 0.5 : 1,
        boxShadow: 1,
        width: "200px",
      }}
    >
      <Button
        sx={{
          borderRadius: "10px",
          color: getModuleColors(selectedModule, academicPlan),
          overflowY: "auto",
          boxShadow: 0,
          width: "100%",
        }}
        onClick={handleSelectButtonClick}
        component={Card}
      >
        <CardContent
          sx={{
            width: "100%",
            margin: "-10px",
            backgroundColor: getModuleColors(moduleList[0], academicPlan),
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <a
              href={`https://nusmods.com/courses/${selectedModule.code}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "white",
              }}
            >
              {selectedModule.code}
            </a>
            <Button sx={{ color: "white" }} onClick={handleShowSelectOptions}>
              Change
            </Button>
          </Box>
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "15px",
              textTransform: "none",
              color: "white",
            }}
          >
            {selectedModule.name}
          </Typography>
        </CardContent>
      </Button>
      {showSelectOptions && (
        <Autocomplete
          sx={{ marginTop: "10px", width: "200px" }}
          disablePortal
          options={moduleList.map((module) => module.code)}
          value={selectedModule.code}
          onChange={handleChangeModule}
          renderInput={(params) => (
            <TextField
              {...params}
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
              label="Select Module"
              InputProps={{
                ...params.InputProps,
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
          )}
        />
      )}
    </Box>
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
  planIndex,
  academicPlan,
  handleSelectModule,
  handleDeselectModule,
  gradRequirementsDict,
  selectedModules,
  handleMoveModules,
}) => {
  // styling for the required modules area
  const RequiredModules = () => {
    return (
      <Box sx={{ overflowX: "auto", display: "flex", flexDirection: "row" }}>
        {gradRequirementsDict.map((requirement, index) => (
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
              {requirement.modules.map((moduleOrArray, index) =>
                Array.isArray(moduleOrArray) ? (
                  <SelectModuleBox
                    key={index}
                    academicPlan={academicPlan}
                    moduleList={moduleOrArray}
                    handleSelectModule={handleSelectModule}
                    handleDeselectModule={handleDeselectModule}
                    selectedModules={selectedModules}
                  />
                ) : (
                  <ModuleBox
                    academicPlan={academicPlan}
                    key={index}
                    module={moduleOrArray}
                    handleSelectModule={handleSelectModule}
                    handleDeselectModule={handleDeselectModule}
                    selectedModules={selectedModules}
                  />
                )
              )}
              {(requirement.name === "primaryDegreeModules" ||
                requirement.name === "secondDegreeModules") && (
                <div>
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{
                      width: "200px",
                      height: "100px",
                      borderRadius: "10px",
                      border: "1px dashed",
                      marginBottom: "20px",
                    }}
                  >
                    Add 3k Module
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      width: "200px",
                      height: "100px",
                      borderRadius: "10px",
                      border: "1px dashed",
                    }}
                  >
                    Add 4k Module
                  </Button>
                </div>
              )}
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
              justifyItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Graduation Requirements
            </Typography>
            {planIndex === 0 && (
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
            {planIndex !== 0 && (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default GradRequirements;
