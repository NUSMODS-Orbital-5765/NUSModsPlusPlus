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
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import { FormatAcademicPlanDetails } from "./ModuleConstants";
import { grey } from "@mui/material/colors";
import ModuleBox from "./ModuleBox";
import { getSectionHeader } from "./ModuleConstants";
import SelectModuleBox from "./SelectModuleBox";

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

// graduation requirements component
const GradRequirements = ({
  planIndex,
  academicPlan,
  handleSelectModule,
  handleDeselectModule,
  gradRequirementsDict,
  selectedModules,
  handleMoveModules,
  handleDeleteModule,
  handleAddModule,
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
                    isSelectable={true}
                    key={index}
                    requirement={requirement.name}
                    moduleList={moduleOrArray}
                    handleSelectModule={handleSelectModule}
                    handleDeselectModule={handleDeselectModule}
                    selectedModules={selectedModules}
                  />
                ) : (
                  <ModuleBox
                    isSelectable={true}
                    key={index}
                    requirement={requirement.name}
                    module={moduleOrArray}
                    handleSelectModule={handleSelectModule}
                    handleDeselectModule={handleDeselectModule}
                    handleDeleteModule={handleDeleteModule}
                    selectedModules={selectedModules}
                  />
                )
              )}
              {(requirement.name === "primaryDegreeModules" ||
                requirement.name === "secondMajorModules" ||
                requirement.name === "secondDegreeModules") && (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      width: "230px",
                      height: "100px",
                      borderRadius: "10px",
                      border: "1px dashed",
                      marginBottom: "20px",
                    }}
                    onClick={() => handleAddModule("3k", requirement.name)} // change to map the optionsList or something
                  >
                    Add 3k Module
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      fontWeight: 600,
                      width: "230px",
                      height: "100px",
                      borderRadius: "10px",
                      border: "1px dashed",
                    }}
                    onClick={() => handleAddModule("4k", requirement.name)} // change to map the optionsList or something
                  >
                    Add 4k Module
                  </Button>
                </Box>
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
