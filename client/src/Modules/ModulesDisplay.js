import GradRequirements from "./GradRequirements";
import SemesterModulePlans from "./SemesterModulePlans";
import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import { emptyPlanLayout, getRequiredModules } from "./ModuleConstants";

// dialog for asking where to move the modules to
export const MoveModuleDialog = ({
  handleSubmitMovedModules,
  openDialog,
  handleCloseDialog,
  handleDestinationYearChange,
  destinationYear,
  destinationSemester,
  handleDestinationSemesterChange,
}) => {
  // list of year options
  const yearOptions = ["Year 1", "Year 2", "Year 3", "Year 4"];

  // list of semester options
  const semesterOptions = ["Semester 1", "Semester 2"];

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogContent sx={{ margin: "10px" }}>
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Please select a destination.
        </Typography>
        <FormControl fullWidth sx={{ marginTop: "20px" }}>
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            value={destinationYear}
            onChange={handleDestinationYearChange}
          >
            {yearOptions.map((option, index) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "20px" }}>
          <InputLabel>Semester</InputLabel>
          <Select
            label="Semester"
            value={destinationSemester}
            onChange={handleDestinationSemesterChange}
          >
            {semesterOptions.map((option, index) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            marginTop: "20px",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitMovedModules}
          >
            Move
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// manages moving of modules from one component to the other
const ModulesDisplay = ({ academicPlan }) => {
  // placeholder line to get the academic requirements from academic plan.
  const [requiredModulesDict, setRequiredModulesDict] = useState(
    getRequiredModules(academicPlan)
  );

  const [selectedModules, setSelectedModules] = useState([]);
  const [movedModules, setMovedModules] = useState(emptyPlanLayout);
  const [openDialog, setOpenDialog] = useState(false);
  const [destinationYear, setDestinationYear] = useState("");
  const handleDestinationYearChange = (event) => {
    setDestinationYear(event.target.value);
  };
  const [destinationSemester, setDestinationSemester] = useState("");
  const handleDestinationSemesterChange = (event) => {
    setDestinationSemester(event.target.value);
  };

  // just to make sure no confusion in state changes because select/deselect is toggled by clicking again
  const handleSelectModule = (module) => {
    setSelectedModules((prevSelectedModules) => [
      ...prevSelectedModules,
      module,
    ]);
  };

  const handleDeselectModule = (module) => {
    setSelectedModules((prevSelectedModules) =>
      prevSelectedModules.filter((selectedModule) => selectedModule !== module)
    );
  };

  // handle deletion of modules here and logging modules somewhere else
  const handleMoveModules = () => {
    setOpenDialog(true);
  };

  // handle moving of modules to correct destination year and semester
  const handleSubmitMovedModules = () => {
    const updatedModulesDict = requiredModulesDict.map((requirement) => {
      // check each requirement within and check if the modules within are inside selectedModules array
      const updatedModules = requirement.modules.filter(
        (module) => !selectedModules.includes(module)
      );
      return {
        ...requirement,
        modules: updatedModules,
      };
    });

    setRequiredModulesDict(updatedModulesDict);
    console.log(updatedModulesDict);

    const updatedMovedModules = { ...movedModules };

    // move the selected modules to the specified year and semester
    if (!updatedMovedModules.hasOwnProperty(destinationYear)) {
      updatedMovedModules[destinationYear] = {};
    }
    if (
      !updatedMovedModules[destinationYear].hasOwnProperty(destinationSemester)
    ) {
      updatedMovedModules[destinationYear][destinationSemester] = [];
    }
    updatedMovedModules[destinationYear][destinationSemester] = [
      ...updatedMovedModules[destinationYear][destinationSemester],
      ...selectedModules,
    ];

    setMovedModules(updatedMovedModules);
    console.log(updatedMovedModules);
    setSelectedModules([]);
    setOpenDialog(false);
  };

  return (
    <div>
      <GradRequirements
        academicPlan={academicPlan}
        type="default"
        handleSelectModule={handleSelectModule}
        handleDeselectModule={handleDeselectModule}
        requiredModulesDict={requiredModulesDict}
        selectedModules={selectedModules}
        handleMoveModules={handleMoveModules}
      />
      <Box sx={{ marginTop: "45px" }}>
        <SemesterModulePlans
          movedModules={movedModules}
          isComplete={requiredModulesDict.every(
            (entry) => entry.modules.length === 0
          )}
        />
      </Box>
      <MoveModuleDialog
        handleSubmitMovedModules={handleSubmitMovedModules}
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        handleDestinationYearChange={handleDestinationYearChange}
        destinationYear={destinationYear}
        destinationSemester={destinationSemester}
        handleDestinationSemesterChange={handleDestinationSemesterChange}
      />
    </div>
  );
};

export default ModulesDisplay;
