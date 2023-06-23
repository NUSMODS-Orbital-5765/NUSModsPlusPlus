// COMPLETE
// add transitions when ur done with everything
// date picker might want to add date range as well
// MUST BE ABLE TO IMPORT TIMETABLE.
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { PageHeader, PageHeaderNoSubtitle } from "../StyledComponents";
import React, { useState } from "react";
import AddNewTask from "./AddNewTask";
import AddNewEvent from "./AddNewEvent";

// multiple tabs view (will find out a way to reduce code overlap later)
const plannerTabsList = ["Events", "To-do's"];

export const PlannerPageTabs = (props) => {
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      </Box>
      {currentView === 0 && <AddNewEvent />}
      {currentView === 1 && <AddNewTask />}
    </Box>
  );
};

// main component
const PlannerPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={2} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <PageHeader
          header="Planner"
          subtitle={
            <div>
              Plan upcoming events and tasks{" "}
              <span style={{ color: "#536DFE" }}>quickly</span> and{" "}
              <span style={{ color: "#536DFE" }}>efficiently</span>.
            </div>
          }
        />
        <Card
          sx={{
            minHeight: "80ch",
            borderRadius: "5px",
            width: "90%",
            marginTop: "40px",
            marginBottom: "50px",
            boxShadow: 1,
          }}
        >
          <CardContent sx={{ marginTop: "10px" }}>
            <PlannerPageTabs viewList={plannerTabsList} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default PlannerPage;
