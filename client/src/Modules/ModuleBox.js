import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { getModuleColors } from "./ModuleConstants";

// styling for module box
const ModuleBox = ({
  module,
  requirement,
  selectedModules,
  handleSelectModule,
  handleDeselectModule,
  handleDeleteModule,
  handleRevertModule,
  isSelectable,
  isRevertable,
}) => {
  // check if the modulebox is selected, then activate selected display state
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
    handleDeleteModule(module);
  };

  // handle selecting/de-selecting module
  const handleClickModule = () => {
    if (isSelectable) {
      if (isSelected) {
        handleDeselectModule(module);
      } else {
        handleSelectModule(module, requirement);
      }
    }
  };

  const handleClickRevert = () => {
    if (isRevertable) {
      handleRevertModule(module, requirement);
    }
  };

  return (
    <Box id={module.code} sx={{ marginTop: "10px", marginBottom: "20px" }}>
      <Button
        sx={{
          borderRadius: "10px",
          color: getModuleColors(requirement),
          opacity: isSelected ? 0.5 : 1,
        }}
        onClick={handleClickModule}
        component={Card}
      >
        <CardContent
          sx={{
            width: "200px",
            margin: "-10px",
            backgroundColor: getModuleColors(requirement),
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
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
            {module.name}
          </Typography>
        </CardContent>
      </Button>
    </Box>
  );
};

export default ModuleBox;
