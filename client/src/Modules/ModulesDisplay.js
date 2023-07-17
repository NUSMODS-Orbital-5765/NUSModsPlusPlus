import GradRequirements from "./GradRequirements";
import SemesterModulePlans from "./SemesterModulePlans";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { getRequiredModules } from "./ModuleConstants";

// manages moving of modules from one component to the other
const ModulesDisplay = ({ academicPlan }) => {
  // handle the modules that have been moved/have not been moved
  // placeholder line to get the academic requirements from academic plan.
  const [requiredModulesDict, setRequiredModulesDict] = useState(
    getRequiredModules(academicPlan)
  );

  const [selectedModules, setSelectedModules] = useState([]);
  const [movedModules, setMovedModules] = useState([]);

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
    setMovedModules(selectedModules);

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
    setSelectedModules([]);
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
        <SemesterModulePlans movedModules={movedModules} />
      </Box>
    </div>
  );
};

export default ModulesDisplay;
