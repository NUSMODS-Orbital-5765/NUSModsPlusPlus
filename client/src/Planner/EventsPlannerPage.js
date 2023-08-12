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
      <Box sx={{ marginLeft: "30px", marginTop: "30px" }}>
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
        <Button
          sx={{ marginBottom: "30px" }}
          onClick={handleOpenDialog}
          variant="contained"
        >
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
  const [events, setEvents] = useState(sampleWeekEvents); // should be replaced with the events list fetched from database
  const [openDialog, setOpenDialog] = useState(false);
  const [addEventSuccess, setAddEventSuccess] = useState(false);
  const [addEventError, setAddEventError] = useState(false);
  const [editEventSuccess, setEditEventSuccess] = useState(false);
  const [editEventError, setEditEventError] = useState(false);
  const [deleteEventSuccess, setDeleteEventSuccess] = useState(false);
  const [deleteEventError, setDeleteEventError] = useState(false);

  // will be refreshed when the array of events changes (e.g. with deleted events or new ones added)
  const eventCategoryList = Array.from(
    new Set(events.map((event) => event.category))
  );

  // handle opening/closing the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // handle the addition/editing/deletion of an event
  const handleAddEvent = (eventInfo) => {
    const newEventObject = { ...eventInfo, id: events.length };
    const updatedEvents = [...events, newEventObject];
    console.log(updatedEvents);
    setEvents(updatedEvents);
    setAddEventSuccess(true);
  };

  const handleEditEvent = (eventInfo) => {
    const updatedEvents = [...sampleWeekEvents];

    const eventIndex = updatedEvents.findIndex(
      (eventObject) => eventObject.id === eventInfo.id
    );

    if (eventIndex !== -1) {
      updatedEvents[eventIndex] = eventInfo;
      console.log(updatedEvents);
      setEvents(updatedEvents);
      setEditEventSuccess(true);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((eventObject) => eventObject.id !== eventId));
    setDeleteEventSuccess(true);
  };

  /*
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
  */

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
              eventCategoryList={eventCategoryList}
              handleEditEvent={handleEditEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          </Box>
          <Box sx={{ width: "30%", marginLeft: "40px" }}>
            <UpcomingEvents
              eventsList={events}
              eventCategoryList={eventCategoryList}
            />
          </Box>
        </Box>
      </Box>
      <AddNewEventDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        eventCategoryList={eventCategoryList}
        handleAddEvent={handleAddEvent}
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
      <Snackbar
        open={addEventError}
        autoHideDuration={3000}
        onClose={() => setAddEventError(false)}
      >
        <Alert
          onClose={() => setAddEventError(false)}
          sx={{ color: "white" }}
          variant="filled"
          severity="error"
        >
          Failed to add event. Please ensure all fields are filled in correctly.
        </Alert>
      </Snackbar>
      <Snackbar
        open={addEventSuccess}
        autoHideDuration={3000}
        onClose={() => setAddEventSuccess(false)}
      >
        <Alert
          onClose={() => setAddEventSuccess(false)}
          sx={{ color: "white" }}
          variant="filled"
          severity="success"
        >
          Event added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={editEventError}
        autoHideDuration={3000}
        onClose={() => setEditEventError(false)}
      >
        <Alert
          onClose={() => setEditEventError(false)}
          sx={{ color: "white" }}
          variant="filled"
          severity="error"
        >
          Failed to updated event. Please ensure all fields are filled in
          correctly.
        </Alert>
      </Snackbar>
      <Snackbar
        open={editEventSuccess}
        autoHideDuration={3000}
        onClose={() => setEditEventSuccess(false)}
      >
        <Alert
          onClose={() => setEditEventSuccess(false)}
          sx={{ color: "white" }}
          variant="filled"
          severity="success"
        >
          Event updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EventsPlannerPage;
