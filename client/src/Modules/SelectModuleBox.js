import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { getModuleColors } from "./ModuleConstants";
import React, { useState } from "react";

export const SelectModuleBox = ({
  isSelectable,
  isRevertable,
  requirement,
  module,
  handleChooseModule,
  handleSelectModule,
  handleDeselectModule,
  handleDeleteModule,
  handleRevertModule,
  selectedModules,
}) => {
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const [newModule, setNewModule] = useState(module);

  const isSelected =
    isSelectable &&
    selectedModules.some(
      (selectedModuleObject) =>
        selectedModuleObject.module.code === module.code &&
        selectedModuleObject.requirement === requirement
    );

  // handle delete button click without triggering module selection
  const handleClickDelete = (event) => {
    event.stopPropagation();
    console.log(module);
    handleDeleteModule(module);
  };

  // handle selecting/de-selecting module
  const handleClickModule = () => {
    if (isSelectable && !showSelectOptions) {
      if (isSelected) {
        handleDeselectModule(module);
      } else {
        !showSelectOptions && handleSelectModule(module, requirement);
      }
    }
  };

  const handleClickRevert = () => {
    if (isRevertable) {
      handleRevertModule(module, requirement);
    }
  };

  const handleShowSelectOptions = (event) => {
    event.stopPropagation();
    !isSelected && setShowSelectOptions(!showSelectOptions);
  };

  const handleChooseNewModule = (event, newValue) => {
    event.stopPropagation();
    if (newValue) {
      const selectedOption = module.options.find(
        (mod) => mod.code === newValue
      );
      const newModuleSubmit = {
        ...selectedOption,
        options: module.options,
      };
      setNewModule(newModuleSubmit);
      console.log(newModuleSubmit);
      setShowSelectOptions(false);
      handleChooseModule(newModuleSubmit);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "10px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: getModuleColors(requirement),
        opacity: isSelected ? 0.5 : 1,
        boxShadow: 1,
        width: "200px",
      }}
    >
      <Button
        sx={{
          borderRadius: "10px",
          color: getModuleColors(requirement),
          overflowY: "auto",
          boxShadow: 0,
          width: "100%",
        }}
        onClick={handleClickModule}
        component={Card}
      >
        <CardContent
          sx={{
            width: "100%",
            margin: "-10px",
            backgroundColor: getModuleColors(requirement),
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
              href={`https://nusmods.com/courses/${newModule.code}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "white",
              }}
            >
              {newModule.code}
            </a>
            {isSelectable && (
              <Tooltip title="Delete" placement="top">
                <IconButton onClick={handleClickDelete}>
                  <CloseRoundedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            )}
            {isRevertable && (
              <Tooltip title="Revert" placement="top">
                <IconButton onClick={handleClickRevert}>
                  <RestartAltRoundedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "15px",
              textTransform: "none",
              color: "white",
            }}
          >
            {newModule.name}
          </Typography>
          <Button onClick={handleShowSelectOptions} sx={{ color: "white" }}>
            Change
          </Button>
        </CardContent>
      </Button>
      {showSelectOptions && (
        <Autocomplete
          sx={{ marginTop: "10px", width: "200px" }}
          disablePortal
          options={module.options.map((mod) => mod.code)}
          value={newModule.code}
          onChange={handleChooseNewModule}
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
