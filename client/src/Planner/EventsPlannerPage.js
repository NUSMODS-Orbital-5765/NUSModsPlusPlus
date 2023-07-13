// COMPLETE
// add transitions when ur done with everything
// date picker might want to add date range as well
// MUST BE ABLE TO IMPORT TIMETABLE.
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import { Box, Card, CardContent, Tooltip, IconButton } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { PageHeader, PageHeaderNoSubtitle } from "../StyledComponents";
import AddNewEvent from "./AddNewEvent";
import { Link } from "react-router-dom";
import { combinedItems } from "../Home/HomePageStyledComponents";

// main component
const EventsPlannerPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={2} tabsList={combinedItems} />
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <PageHeaderNoSubtitle header="Events" />
              <Tooltip title="Switch to tasks" placement="top">
                <IconButton
                  component={Link}
                  to="/planner-tasks"
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      transform: "translateX(5px)",
                      transition: "transform 0.1s",
                    },
                  }}
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
            <AddNewEvent />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default EventsPlannerPage;
