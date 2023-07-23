import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
import { Box, Card, CardContent, Tooltip, IconButton } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { PageHeader, PageHeaderNoSubtitle } from "../StyledComponents";
import AddNewTask from "./AddNewTask";
import { Link } from "react-router-dom";
import { combinedItems } from "../Home/HomePageStyledComponents";

const TasksPlannerPage = () => {
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
              <PageHeaderNoSubtitle header="To-do's" />
              <Tooltip title="Switch to events" placement="top">
                <IconButton
                  component={Link}
                  to="/planner-events"
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
            <AddNewTask />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default TasksPlannerPage;
