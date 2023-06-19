import { Tooltip, IconButton, Box } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { sampleSemesterModules, HonoursGPAGuide } from "../Constants";
import { DefaultNativeSelect } from "../FormStyledComponents";
import React, { useState } from "react";
import ByYearView from "./ByYearView";
import { PageHeaderNoSubtitle } from "../StyledComponents";

// component for switching between different views
const GPACalculatorContent = (props) => {
  const { viewList } = props;
  const maxViewIndex = viewList.length - 1;
  const [currentView, setCurrentView] = useState(0);

  const handlePrevView = () => {
    currentView === 0
      ? setCurrentView(maxViewIndex)
      : setCurrentView(currentView - 1);
  };

  const handleNextView = () => {
    currentView === maxViewIndex
      ? setCurrentView(0)
      : setCurrentView(currentView + 1);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Tooltip title="Switch to previous view">
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                transform: "translateX(-5px)",
                transition: "transform 0.1s",
              },
            }}
            onClick={handlePrevView}
          >
            <NavigateBeforeRoundedIcon
              sx={{
                color: "#536DFE",
                fontSize: "40px",
              }}
            />
          </IconButton>
        </Tooltip>
        <PageHeaderNoSubtitle header={viewList[currentView]} />
        <Tooltip title="Switch to next view">
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                transform: "translateX(5px)",
                transition: "transform 0.1s",
              },
            }}
            onClick={handleNextView}
          >
            <NavigateNextRoundedIcon
              sx={{
                color: "#536DFE",
                fontSize: "40px",
              }}
            />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box sx={{ marginLeft: "10px" }}>
            <DefaultNativeSelect
              optionsDict={HonoursGPAGuide}
              label="Grade Target"
            />
          </Box>
        </Box>
      </Box>
      {currentView === 0 && <ByYearView yearList={sampleSemesterModules} />}
    </div>
  );
};

export default GPACalculatorContent;
