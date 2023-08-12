// COMPLETE
// check if the indexes will be wonky when there are posts being removed (since there is no sorting)
// modularize code as much as possible when have time.
// delete past events
// add colors for category (? tbc)
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import { priorityList, priorityColors, priorityValues } from "../Constants";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";

/*
  const handleAddEvent = () => {
    const newEventObject = {
      id: events.length + 1,
      ...newEvent,
    };
    const newEvents = [...events, newEvent];
    setEvents(newEvents);

    const AddEventAPI = `${process.env.REACT_APP_API_LINK}/event/add`;

    axios
      .post(AddEventAPI, newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        setAddEventSuccess(true);
        newEventObject.eventId = response.data.res.id;
        setEvents((prevEvents) => [...prevEvents, newEventObject]);
        setOpenDialog(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        //undo the insertion
        setAddEventError(true);
      });
  };

  */

// styling for the add event dialog
// styling for dialog with form fields for event details
const AddNewEventDialog = ({
  openDialog,
  handleCloseDialog,
  handleNewEvent,
  handleEventDate,
  handleEventTime,
  eventCategoryList,
  handleAddEvent,
}) => {
  // select from current category list or add a new category

  return (
    <Dialog
      maxWidth="md"
      disableEscapeKeyDown
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <DialogContent sx={{ margin: "10px" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginRight: "20px" }}
        >
          <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
            Add New Event
          </Typography>
          <TextField
            data-testid="name-field"
            sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
            label="Event Name"
            variant="standard"
            name="name"
            onChange={handleNewEvent}
            placeholder="Enter a name for your event"
          />
          <Autocomplete
            freeSolo
            disablePortal
            options={eventCategoryList}
            sx={{ width: "100%", margin: "10px", marginBottom: "20px" }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                label="Event Category"
                placeholder="Select from the current category list, or enter a new one"
              />
            )}
          />
          <Autocomplete
            disablePortal
            options={priorityList}
            sx={{ width: "100%", margin: "10px", marginBottom: "20px" }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                label="Event Priority"
                placeholder="Select an event priority"
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              data-testid="date-field"
              label="Event Date"
              name="date"
              sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
              onChange={handleEventDate}
            />
            <TimePicker
              data-testid="time-field"
              label="Event Time"
              name="time"
              sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
              onChange={handleEventTime}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ margin: "20px" }}
          variant="contained"
          onClick={handleAddEvent}
          color="primary"
        >
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewEventDialog;
