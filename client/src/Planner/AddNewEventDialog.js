// COMPLETE
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Autocomplete,
} from "@mui/material";
import { priorityList, priorityColors, priorityValues } from "../Constants";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "date-fns";
import { nanoid } from "nanoid";



// styling for the add event dialog
// styling for dialog with form fields for event details
const AddNewEventDialog = ({
  openDialog,
  handleCloseDialog,
  eventCategoryList,
  handleAddEvent,
}) => {
  // select from current category list or add a new category
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventPriority, setEventPriority] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);

  // ensure that the values are reset when the dialog is closed
  const handleClickCloseDialog = () => {
    setEventName("");
    setEventCategory("");
    setEventPriority("");
    setEventDate(null);
    setEventTime(null);
    handleCloseDialog();
  };

  // handle state change
  const handleEventName = (event) => {
    setEventName(event.target.value);
  };

  const handleEventCategory = (event, value) => {
    setEventCategory(value);
  };

  const handleEventPriority = (event, value) => {
    setEventPriority(value);
  };

  const handleEventDate = (dateInput) => {
    console.log(dateInput);
    setEventDate(dateInput.format("DD MMMM YYYY"));
  };

  const handleEventTime = (timeInput) => {
    console.log(timeInput);
    setEventTime(timeInput.format("hh:mm A"));
  };

  // handle creation of a new event object
  const handleSubmitNewEvent = () => {
    const newEventObject = {
      name: eventName,
      category: eventCategory,
      priority: eventPriority,
      date: eventDate,
      time: eventTime,
      nanoid: nanoid()
    };
    console.log(newEventObject);
    handleAddEvent(newEventObject);
    handleCloseDialog();
    setEventName("");
    setEventCategory("");
    setEventPriority("");
    setEventDate(null);
    setEventTime(null);
  };

  return (
    <Dialog
      maxWidth="md"
      disableEscapeKeyDown
      open={openDialog}
      onClose={handleClickCloseDialog}
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
            onChange={handleEventName}
            placeholder="Enter a name for your event"
          />
          <Autocomplete
            freeSolo
            disablePortal
            inputValue={eventCategory}
            onInputChange={handleEventCategory}
            options={eventCategoryList}
            sx={{ width: "100ch", margin: "10px", marginBottom: "20px" }}
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
            onChange={handleEventPriority}
            options={priorityList}
            sx={{ width: "100ch", margin: "10px", marginBottom: "20px" }}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSubmitNewEvent}
            disabled={
              !eventName ||
              !eventCategory ||
              !eventPriority ||
              !eventDate ||
              !eventTime
            }
            color="primary"
          >
            Create Event
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewEventDialog;
