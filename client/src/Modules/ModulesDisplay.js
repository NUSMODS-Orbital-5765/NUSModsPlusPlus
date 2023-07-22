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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import { getRecommendedPlan, sampleOptionsList } from "./ModuleConstants";
import { AdminCommentsDialog } from "../StudentModuleProfileView";
import { adminSampleProfile } from "../Admin/AdminConstants";
import { sampleProfile } from "../Constants";
import { nanoid } from "nanoid";
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
    <Dialog
      minWidth="md"
      open={openAddModuleDialog}
      onClose={handleCloseAddModuleDialog}
    >
      <DialogContent sx={{ margin: "10px", height: "60vh" }}>
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Please select a module.
        </Typography>
        <Autocomplete
          sx={{ marginTop: "20px", maxHeight: "40vh" }}
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
  nanoid,
  academicPlan,
  planStatus,
  gradRequirementsDict,
  semesterModulesDict,
  planIndex,
  handleClosePlan,
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

  const [openComments, setOpenComments] = useState(false);
  const handleOpenComments = () => {
    setOpenComments(true);
  };
  const handleCloseComments = () => {
    setOpenComments(false);
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
  const handleSelectModule = (module, requirement) => {
    setSelectedModules((prevSelectedModules) => [
      ...prevSelectedModules,
      { module: module, requirement: requirement },
    ]);
  };

  const handleDeselectModule = (module) => {
    setSelectedModules((prevSelectedModules) =>
      prevSelectedModules.filter(
        (selectedModuleObject) => selectedModuleObject.module !== module
      )
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

  const handleRevertModule = (moduleObject, requirement) => {
    const moduleMatches = (module1, module2) => {
      return module1.code === module2.code && module1.name === module2.name;
    };

    const moduleObjectMatches = (module1, module2) => {
      return (
        moduleMatches(module1.module, module2.module) &&
        module1.requirement === module2.requirement
      );
    };

    const requirementIndex = gradRequirementsDict.findIndex(
      (req) => req.name === requirement
    );

    if (requirementIndex === -1) {
      return;
    }

    const moduleToRemove = {
      module: moduleObject,
      requirement: requirement,
    };

    const updatedModulesArray = newGradRequirements[
      requirementIndex
    ].modules.filter((mod) => !moduleMatches(mod, moduleToRemove.module));

    const updatedGradRequirements = [...newGradRequirements];
    updatedGradRequirements[requirementIndex].modules = updatedModulesArray;
    setNewGradRequirements(updatedGradRequirements);

    const updatedMovedModules = { ...newSemesterModules };

    const semesterModulesArray =
      updatedMovedModules[destinationYear]?.[destinationSemester];

    if (semesterModulesArray) {
      const updatedSemesterModules = semesterModulesArray.filter(
        (mod) => !moduleObjectMatches(mod, moduleToRemove)
      );

      updatedMovedModules[destinationYear][destinationSemester] =
        updatedSemesterModules;
      setNewSemesterModules(updatedMovedModules);
    }

    const targetRequirementIndex = updatedGradRequirements.findIndex(
      (req) => req.name === moduleToRemove.requirement
    );

    if (targetRequirementIndex !== -1) {
      updatedGradRequirements[targetRequirementIndex].modules.push(
        moduleToRemove.module
      );
      setNewGradRequirements(updatedGradRequirements);
    }
  };

  const handleDeleteModule = (moduleInput) => {
    setNewGradRequirements((prevGradRequirements) => {
      const updatedGradRequirements = JSON.parse(
        JSON.stringify(prevGradRequirements)
      );

      // Find the section index that contains the module to be deleted
      const sectionIndex = updatedGradRequirements.findIndex((requirement) =>
        requirement.modules.some((module) => module.code === moduleInput.code)
      );

      if (sectionIndex !== -1) {
        // Remove the entire module object from the array
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

  // handle shifting of modules
  const handleSubmitMovedModules = () => {
    setSelectedModules([]);

    const updatedModulesDict = newGradRequirements.map((requirement) => {
      const updatedModules = requirement.modules.filter((module) => {
        return !selectedModules.some(
          (selectedModuleObject) =>
            selectedModuleObject.module.code === module.code &&
            selectedModuleObject.requirement === requirement.name
        );
      });

      return {
        ...requirement,
        modules: updatedModules,
      };
    });

    setNewGradRequirements(updatedModulesDict);
    console.log(updatedModulesDict);

    const updatedMovedModules = { ...newSemesterModules };
    if (!updatedMovedModules.hasOwnProperty(destinationYear)) {
      updatedMovedModules[destinationYear] = {};
    }
    if (
      !updatedMovedModules[destinationYear].hasOwnProperty(destinationSemester)
    ) {
      updatedMovedModules[destinationYear][destinationSemester] = [];
    }

    const filteredMovedModules = updatedMovedModules[destinationYear][
      destinationSemester
    ].filter(
      (moduleObject) =>
        !selectedModules.some(
          (selectedModuleObject) =>
            selectedModuleObject.module.code === moduleObject.module.code &&
            selectedModuleObject.requirement === moduleObject.requirement
        )
    );

    updatedMovedModules[destinationYear][destinationSemester] = [
      ...filteredMovedModules,
      ...selectedModules,
    ];

    setNewSemesterModules(updatedMovedModules);
    console.log(updatedMovedModules);

    setOpenDialog(false);
  };

  // handle choose module function
  const handleChooseModule = (newModule) => {
    const moduleOptions = newModule.options;

    setNewGradRequirements((prevRequirements) => {
      const updatedRequirements = prevRequirements.map((requirement) => {
        const updatedModules = requirement.modules.map((mod) =>
          JSON.stringify(mod.options) === JSON.stringify(moduleOptions)
            ? newModule
            : mod
        );
        return { ...requirement, modules: updatedModules };
      });
      return updatedRequirements;
    });

    setNewSemesterModules((prevLayout) => {
      const updatedLayout = {};
      for (const yearKey in prevLayout) {
        const semesters = prevLayout[yearKey];
        const updatedSemesters = {};
        for (const semesterKey in semesters) {
          const updatedModules = semesters[semesterKey].map((mod) =>
            JSON.stringify(mod.options) === JSON.stringify(moduleOptions)
              ? newModule
              : mod
          );
          updatedSemesters[semesterKey] = updatedModules;
        }
        updatedLayout[yearKey] = updatedSemesters;
      }
      return updatedLayout;
    });
  };

  // handle reset plan to last saved
  const handleResetChanges = () => {
    setNewGradRequirements(gradRequirementsDict);
    setNewSemesterModules(semesterModulesDict);
  };

  const [newModulePlanStatus, setNewModulePlanStatus] = useState(planStatus);
  // handle submit request
  const handleRequestApproval = () => {
    setNewModulePlanStatus("Pending");
    handleSaveGradRequirements();
  };

  // handle autoallocate
  const handleRecommendedPlan = () => {
    const clearedRequirements = newGradRequirements.map((requirement) => ({
      ...requirement,
      modules: [],
    }));
    setNewGradRequirements(clearedRequirements);
    setNewSemesterModules(getRecommendedPlan(academicPlan));
  };

  // handle saving of the grad requirements and semester modules together
  const handleSaveGradRequirements = () => {
    console.log({
      nanoid: nanoid,
      owner: localStorage.getItem("username"),
      academicPlan: academicPlan,
      modulePlanStatus: newModulePlanStatus,
      gradRequirementsDict: newGradRequirements,
      semesterModulesDict: newSemesterModules,
    });
  };

  const handleClickClose = () => {
    handleSaveGradRequirements();
    handleClosePlan();
  };

  return (
    <div>
      <GradRequirements
        disabled={newModulePlanStatus === "Pending"}
        planIndex={planIndex}
        academicPlan={academicPlan}
        handleResetChanges={handleResetChanges}
        handleSelectModule={handleSelectModule}
        handleDeselectModule={handleDeselectModule}
        gradRequirementsDict={newGradRequirements}
        selectedModules={selectedModules}
        handleChooseModule={handleChooseModule}
        handleMoveModules={handleMoveModules}
        handleDeleteModule={handleDeleteModule}
        handleAddModule={handleAddModule}
      />
      <Box sx={{ marginTop: "35px" }}>
        <SemesterModulePlans
          disabled={newModulePlanStatus === "Pending"}
          modulePlanStatus={newModulePlanStatus}
          academicPlan={academicPlan}
          handleRequestApproval={handleRequestApproval}
          handleRecommendedPlan={handleRecommendedPlan}
          handleChooseModule={handleChooseModule}
          handleRevertModule={handleRevertModule}
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
      <Tooltip title="Close Plan" placement="top">
        <Fab
          color="error"
          onClick={handleClickClose}
          sx={{
            position: "fixed",
            top: "3rem",
            right: "3rem",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: "30px", fontWeight: 600 }} />
        </Fab>
      </Tooltip>
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
      <Tooltip title="View Comments" placement="top">
        <Fab
          onClick={handleOpenComments}
          color="primary"
          sx={{
            position: "fixed",
            bottom: "8rem",
            right: "3rem",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          <ChatRoundedIcon
            sx={{ fontSize: "30px", fontWeight: 600, color: "white" }}
          />
        </Fab>
      </Tooltip>
      {/* change user and admin accordingly */}
      <AdminCommentsDialog
        adminUser={adminSampleProfile}
        openDialog={openComments}
        handleCloseDialog={handleCloseComments}
        studentProfile={sampleProfile}
      />
    </div>
  );
};

export default ModulesDisplay;
