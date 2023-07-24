// COMPLETE
// add transitions when ur done with everything
// date picker might want to add date range as well
// MUST BE ABLE TO IMPORT TIMETABLE.
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
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
import { priorityColors } from "../Constants";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";

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



export const EventsDataGrid = ({ eventsList , handleDeleteEvent}) => {
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
      <DataGrid sx={{ fontSize: "15px" }} rows={eventsList} columns={columns} />
    </Box>
  );
};


// main component
const EventsPlannerPage = () => {
  const [events,setEvents] = useState([]);
  
  const handleDeleteEvent = (id, eventId) => {
    const DeleteEventAPI = `${process.env.REACT_APP_API_LINK}/event/delete`;
    const deleteJsonBody = {eventId: eventId};
    axios
      .post(DeleteEventAPI, deleteJsonBody, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user-token")}` }
    })
      .then((response) => {
        alert("Delete Event Successfully");
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      })
      .catch((error) => {
        console.log(error);
        //undo the insertion
        alert("Event Delete Failed" + error.message);
      });
  };
  
  useEffect(()=> {
    const GetEventAPI = `${process.env.REACT_APP_API_LINK}/event/get`;
    axios
    .get(GetEventAPI, {
      params:{userId:localStorage.getItem("userId")},
      headers: { Authorization: `Bearer ${localStorage.getItem("user-token")}` }
  })
    .then((response) => {
      const postedEvents = response.data.events;
      let count = 1;
      postedEvents.map(event=>{
        event.eventId = event.id;
        event.id = count;
        delete event.userId;
        count++;
      });
      console.log(postedEvents)
      setEvents((prevEvents) => postedEvents);
    })
    .catch((error) => {
      console.log(error);
      //undo the insertion
      alert("Event added Failed " + error.message);
      })}
      ,[]
    )
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
              
            </Box>
          </CardContent>
          <CardContent>
            <EventsDataGrid eventsList={events} handleDeleteEvent={handleDeleteEvent}/>
          </CardContent>
        </Card>
        
      </Box>
    </div>
  );
};

export default EventsPlannerPage;
