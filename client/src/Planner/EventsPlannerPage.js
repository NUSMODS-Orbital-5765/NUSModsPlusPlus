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
  Tooltip,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { PageHeader, PageHeaderNoSubtitle } from "../StyledComponents";
import AddNewEvent from "./AddNewEvent";
import { Link } from "react-router-dom";
import { combinedItems } from "../Home/HomePageStyledComponents";

export const EventsPageHeader = () => {
  return (
    <Box
      sx={{
        margin: "55px",
        marginTop: "20px",
        borderRadius: "10px",
        backgroundColor: "#e7f2ff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            margin: "30px",
            fontSize: "40px",
            fontWeight: "700",
            color: "#004d80",
          }}
        >
          Our handy scheduling tool.
        </Typography>
        <Typography
          sx={{
            margin: "30px",
            marginTop: "-10px",
            fontSize: "17px",
            color: "#004d80",
          }}
        >
          Easily keep track of academic and non-academic events.
        </Typography>
        <Box sx={{ marginLeft: "10px" }}>
          <AddNewEvent />
        </Box>
      </Box>
      <img
        style={{ width: "35%" }}
        src="/planner-intro.png"
        alt="Planner Header"
      />
    </Box>
  );
};

/*
// styling for events data grid (i need it here cause i want to delete events)
export const EventsDataGrid = ({ eventsList }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "name",
      headerName: "Event Name",
      width: 200,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: priorityColors[params.value], // priority is an integer from 1 to 4
            marginRight: "8px",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteEvent(params.row.id, params.row.eventId)}
        >
          <ClearRoundedIcon color="error" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid sx={{ fontSize: "15px" }} rows={events} columns={columns} />
    </Box>
  );
};
*/

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
        }}
      >
        <EventsPageHeader />
        <Card
          sx={{
            marginLeft: "55px",
            minHeight: "80ch",
            borderRadius: "10px",
            marginBottom: "50px",
            boxShadow: 0,
          }}
        >
          <CardContent>
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
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default EventsPlannerPage;
