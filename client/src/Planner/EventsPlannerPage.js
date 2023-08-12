// COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
import UpcomingEvents from "./UpcomingEvents";
import { Box, Typography, Snackbar, Alert, Button } from "@mui/material";
import { combinedItems } from "../Home/HomePageStyledComponents";
import { priorityColors, sampleWeekEvents } from "../Constants";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventsDataGrid from "./EventsDataGrid";
import AddNewEventDialog from "./AddNewEventDialog";

// page header (contains the add event button)
export const EventsPageHeader = ({ handleOpenDialog }) => {
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
      <Box sx={{ marginLeft: "30px" }}>
        <Typography
          sx={{
            marginBottom: "30px",
            fontSize: "40px",
            fontWeight: "700",
            color: "#004d80",
          }}
        >
          Our handy scheduling tool.
        </Typography>
        <Typography
          sx={{
            marginBottom: "20px",
            marginTop: "-10px",
            fontSize: "17px",
            color: "#004d80",
          }}
        >
          Easily keep track of academic and non-academic events.
        </Typography>
        <Button onClick={handleOpenDialog} variant="contained">
          Add New Event
        </Button>
      </Box>
      <img
        style={{ width: "35%" }}
        src="/planner-intro.png"
        alt="Planner Header"
      />
    </Box>
  );
};

// main component
const EventsPlannerPage = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [addEventSuccess, setAddEventSuccess] = useState(false);
  const [addEventError, setAddEventError] = useState(false);
  const [deleteEventSuccess, setDeleteEventSuccess] = useState(false);
  const [deleteEventError, setDeleteEventError] = useState(false);
  const [eventCategoryList, setEventCategoryList] = useState(
    Array.from(new Set(sampleWeekEvents.map((event) => event.category)))
  );

  // handle opening/closing the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // handle the addition/deletion of an event category
  const handleAddEventCategory = (newCategory) => {
    setEventCategoryList([...eventCategoryList, newCategory]);
  };

  const handleDeleteEventCategory = (newCategory) => {
    setEventCategoryList(
      eventCategoryList.filter((category) => category !== newCategory)
    );
  };

  // handle the addition/editing/deletion of an event
  const handleAddEvent = (eventInfo) => {
    setEvents([...events, eventInfo]);
  };

  const handleEditEvent = (eventInfo) => {};

  const handleDeleteEvent = (id, eventId) => {
    const DeleteEventAPI = `${process.env.REACT_APP_API_LINK}/event/delete`;
    const deleteJsonBody = { eventId: eventId };
    axios
      .post(DeleteEventAPI, deleteJsonBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        setDeleteEventSuccess(true);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        //undo the insertion
        setDeleteEventError(true);
      });
  };

  /*
  useEffect(() => {
    const GetEventAPI = `${process.env.REACT_APP_API_LINK}/event/get`;
    axios
      .get(GetEventAPI, {
        params: { userId: localStorage.getItem("userId") },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        const postedEvents = response.data.events;
        let count = 1;
        postedEvents.map((event) => {
          event.eventId = event.id;
          event.id = count;
          delete event.userId;
          count++;
        });
        console.log(postedEvents);
        setEvents((prevEvents) => postedEvents);
      })
      .catch((error) => {
        console.log(error);
        //undo the insertion
        alert("Event added Failed " + error.message);
      });
  }, []);
  */

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
        <EventsPageHeader handleOpenDialog={handleOpenDialog} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: "55px",
            marginRight: "55px",
          }}
        >
          <Box sx={{ width: "70%" }}>
            <EventsDataGrid
              eventsList={events}
              handleDeleteEvent={handleDeleteEvent}
            />
          </Box>
          <Box sx={{ width: "30%", marginLeft: "40px" }}>
            <UpcomingEvents />
          </Box>
        </Box>
      </Box>
      <AddNewEventDialog
        openDialog={openDialog}
        eventCategoryList={eventCategoryList}
        handleCloseDialog={handleCloseDialog}
      />
      <Snackbar
        open={deleteEventError}
        autoHideDuration={3000}
        onClose={() => setDeleteEventError(false)}
      >
        <Alert
          onClose={() => setDeleteEventError(false)}
          sx={{ color: "white" }}
          variant="filled"
          severity="error"
        >
          Failed to delete event.
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteEventSuccess}
        autoHideDuration={3000}
        onClose={() => setDeleteEventSuccess(false)}
      >
        <Alert
          onClose={() => setDeleteEventSuccess(false)}
          sx={{ color: "white" }}
          variant="filled"
          severity="success"
        >
          Event deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EventsPlannerPage;
