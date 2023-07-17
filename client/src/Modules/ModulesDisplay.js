import GradRequirements from "./GradRequirements";
import SemesterModulePlans from "./SemesterModulePlans";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { sampleAcademicPlan } from "./ModuleConstants";

// manages moving of modules from one component to the other
const ModulesDisplay = () => {
  // handle the modules that have been moved/have not been moved
  const [remainingModules, setRemainingModules] = useState([]);
  const [movedModules, setMovedModules] = useState([]);

  return (
    <div>
      <GradRequirements academicPlan={sampleAcademicPlan} />
      <Box sx={{ marginTop: "45px" }}>
        <SemesterModulePlans />
      </Box>
    </div>
  );
};

export default ModulesDisplay;
