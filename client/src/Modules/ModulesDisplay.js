import GradRequirements from "./GradRequirements";
import SemesterModulePlans from "./SemesterModulePlans";
import React, { useState, useEffect } from "react";
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
  Tooltip,
  Fab,
  Autocomplete,
  TextField,
} from "@mui/material";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import {
  emptyPlanLayout,
  getRequiredModules,
  sampleOptionsList,
} from "./ModuleConstants";

// dialog for adding modules
export const AddModuleDialog = ({
  openAddModuleDialog,
  handleCloseAddModuleDialog,
  academicPlan,
  newModuleInfo,
  handleSubmitNewModule,
}) => {
  const [newModuleObject, setNewModuleObject] = useState({});

  // placeholder fn, get options for selecting a new module
  function getOptions(academicPlan, newModuleInfo) {
    // new module gives the primarydeg, seconddeg/etc and also gives 3k/4k req.
    return sampleOptionsList.map((module) => module.code);
  }

  const handleClickSubmitNewModule = () => {
    handleCloseAddModuleDialog();
    handleSubmitNewModule(newModuleInfo, newModuleObject);
    console.log(newModuleObject);
    console.log(newModuleInfo);
    setNewModuleObject({});
  };

  return (
    <Dialog open={openAddModuleDialog} onClose={handleCloseAddModuleDialog}>
      <DialogContent sx={{ margin: "10px" }}>
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Please select a module.
        </Typography>
        <Autocomplete
          onChange={(event, value) =>
            setNewModuleObject(
              sampleOptionsList.find((module) => module.code === value)
            )
          }
          disablePortal
          options={getOptions(academicPlan, newModuleInfo)}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Select Module" />
          )}
        />
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
            disabled={newModuleObject === {}}
            onClick={handleClickSubmitNewModule}
          >
            Add Module
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

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

  // TODO: might change the select components to a radio group instead
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
const ModulesDisplay = ({
  academicPlan,
  gradRequirementsDict,
  semesterModulesDict,
  planIndex,
}) => {
  // set the state, this is because addition of 3k 4k modules is allowed
  const [newGradRequirements, setNewGradRequirements] =
    useState(gradRequirementsDict);

  const [newSemesterModules, setNewSemesterModules] =
    useState(semesterModulesDict);

  const [newModuleInfo, setNewModuleInfo] = useState({
    moduleType: "",
    requirement: "",
  });

  const [openAddModuleDialog, setOpenAddModuleDialog] = useState(false);
  const handleCloseAddModuleDialog = () => {
    setOpenAddModuleDialog(false);
  };

  const [selectedModules, setSelectedModules] = useState([]);
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

  // for rendering a new select module box
  const handleAddModule = (moduleTypeInput, requirementName) => {
    setOpenAddModuleDialog(true);
    setNewModuleInfo({
      moduleType: moduleTypeInput,
      requirement: requirementName,
    });
    console.log(moduleTypeInput); // testing to check if correct
    console.log(requirementName); // testing to check if correct
  };

  // for adding the new selected module (does NOT allow for further change)
  const handleSubmitNewModule = (moduleInfo, moduleObject) => {
    const updatedGradRequirements = [...newGradRequirements];
    const requirementIndex = updatedGradRequirements.findIndex(
      (requirement) => requirement.name === moduleInfo.requirement
    );

    if (requirementIndex !== -1) {
      updatedGradRequirements[requirementIndex].modules.push(moduleObject);
      setNewGradRequirements(updatedGradRequirements);
    }
  };

  // code for deleting a module
  const handleDeleteModule = (moduleInput) => {
    setNewGradRequirements((prevGradRequirements) => {
      const updatedGradRequirements = JSON.parse(
        JSON.stringify(prevGradRequirements)
      );

      const sectionIndex = updatedGradRequirements.findIndex((section) =>
        section.modules.some((module) => module.code === moduleInput.code)
      );

      if (sectionIndex !== -1) {
        updatedGradRequirements[sectionIndex].modules = updatedGradRequirements[
          sectionIndex
        ].modules.filter((module) => module.code !== moduleInput.code);
      }

      return updatedGradRequirements;
    });
  };

  // handle deletion of modules here and logging modules somewhere else
  const handleMoveModules = () => {
    setOpenDialog(true);
  };

  // handle moving of modules to correct destination year and semester
  const handleSubmitMovedModules = () => {
    setSelectedModules([]);
    const updatedModulesDict = newGradRequirements.map((requirement) => {
      // check each requirement within and check if the modules within are inside selectedModules array
      const updatedModules = requirement.modules.filter(
        (module) => !selectedModules.includes(module)
      );
      return {
        ...requirement,
        modules: updatedModules,
      };
    });

    setNewGradRequirements(updatedModulesDict);
    console.log(updatedModulesDict);

    const updatedMovedModules = { ...newSemesterModules };

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

    setNewSemesterModules(updatedMovedModules);
    console.log(updatedMovedModules);
    setOpenDialog(false);
  };

  // handle saving of the grad requirements and semester modules together
  const handleSaveGradRequirements = () => {
    console.log(newGradRequirements);
    console.log(newSemesterModules);
  };

  return (
    <div>
      <GradRequirements
        planIndex={planIndex}
        academicPlan={academicPlan}
        handleSelectModule={handleSelectModule}
        handleDeselectModule={handleDeselectModule}
        gradRequirementsDict={newGradRequirements}
        selectedModules={selectedModules}
        handleMoveModules={handleMoveModules}
        handleDeleteModule={handleDeleteModule}
        handleAddModule={handleAddModule}
      />
      <Box sx={{ marginTop: "35px" }}>
        <SemesterModulePlans
          academicPlan={academicPlan}
          handleDeleteModule={handleDeleteModule}
          semesterModulesDict={newSemesterModules}
          isComplete={newGradRequirements.every(
            (entry) => entry.modules.length === 0
          )} // shows that everything has been moved over
        />
      </Box>
      <MoveModuleDialog
        academicPlan={academicPlan}
        handleSubmitMovedModules={handleSubmitMovedModules}
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        handleDestinationYearChange={handleDestinationYearChange}
        destinationYear={destinationYear}
        destinationSemester={destinationSemester}
        handleDestinationSemesterChange={handleDestinationSemesterChange}
      />
      <AddModuleDialog
        openAddModuleDialog={openAddModuleDialog}
        handleCloseAddModuleDialog={handleCloseAddModuleDialog}
        academicPlan={academicPlan}
        newModuleInfo={newModuleInfo}
        handleSubmitNewModule={handleSubmitNewModule}
      />
      <Tooltip title="Save Plan" placement="top">
        <Fab
          onClick={handleSaveGradRequirements}
          color="success"
          sx={{
            position: "fixed",
            top: "3rem",
            right: "8rem",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          <SaveAltRoundedIcon
            sx={{ fontSize: "30px", fontWeight: 600, color: "white" }}
          />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ModulesDisplay;
