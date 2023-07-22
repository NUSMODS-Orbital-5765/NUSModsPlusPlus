import React, { useState } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { getModuleColors } from "./ModuleConstants";

export const SelectModuleBox = ({
  module,
  requirement,
  selectedModules,
  handleSelectModule,
  handleDeselectModule,
  handleDeleteModule,
  handleRevertModule,
  isSelectable,
  isRevertable,
  moduleList,
  academicPlan,
  setSelectedModule,
  selectedModule,
}) => {
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const isSelected = selectedModules.includes(moduleList);

  const handleSelectButtonClick = (event) => {
    event.stopPropagation();
    if (isSelected) {
      handleDeselectModule(module);
    } else {
      handleSelectModule(module, requirement);
    }
  };

  const handleShowSelectOptions = (event) => {
    event.stopPropagation();
    setShowSelectOptions(!showSelectOptions);
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

export default SelectModuleBox;
