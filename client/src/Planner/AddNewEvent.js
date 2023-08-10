// COMPLETE
// check if the indexes will be wonky when there are posts being removed (since there is no sorting)
// modularize code as much as possible when have time.
// delete past events
// add colors for category (? tbc)
import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
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

const currentSemesterModules = ["CS1010S", "CS2040"];

// styling of new event button + handle addition of new event
const AddNewEvent = () => {
  const eventCategoryList = [...currentSemesterModules, "Personal"];
  // to store variables of form inputs.
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [addEventSuccess, setAddEventSuccess] = useState(false);
  const [addEventError, setAddEventError] = useState(false);

  const emptyEventLayout = {
    name: "",
    date: null,
    time: null,
    category: "",
    priority: null,
  };

  const [newEvent, setNewEvent] = useState(emptyEventLayout);

  const handleNewEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEventDate = (dateInput) => {
    setNewEvent({ ...newEvent, ["date"]: dateInput.format("DD MMMM YYYY") });
  };

  const handleEventTime = (timeInput) => {
    setNewEvent({ ...newEvent, ["time"]: timeInput.format("hh:mm A") });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEvent(emptyEventLayout);
  };

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

  // main component
  return (
    <div>
      <Box sx={{ margin: "20px", marginTop: "20px" }}>
        <Button
          sx={{ marginBottom: "30px" }}
          onClick={handleOpenDialog}
          variant="contained"
        >
          Add New Event
        </Button>
        <AddNewEventDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleNewEvent={handleNewEvent}
          handleEventDate={handleEventDate}
          handleEventTime={handleEventTime}
          eventCategoryList={eventCategoryList}
          handleAddEvent={handleAddEvent}
        />
      </Box>
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
          Failed to add event. Please ensure all fields are filled in.
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
    </div>
  );
};

// styling for the add event dialog
// styling for dialog with form fields for event details
export const AddNewEventDialog = ({
  openDialog,
  handleCloseDialog,
  handleNewEvent,
  handleEventDate,
  handleEventTime,
  eventCategoryList,
  handleAddEvent,
}) => {
  return (
    <Dialog
      maxWidth="md"
      disableEscapeKeyDown
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Add New Event
            </Typography>
            <Button
              variant="contained"
              onClick={handleCloseDialog}
              color="error"
            >
              Cancel
            </Button>
          </Box>
          <TextField
            data-testid="name-field"
            sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
            label="Event Name"
            variant="standard"
            name="name"
            onChange={handleNewEvent}
          />
          <FormControl sx={{ margin: "10px", marginBottom: "20px" }}>
            <InputLabel variant="standard">Event Category</InputLabel>
            <Select
              data-testid="category-field"
              variant="standard"
              label="Event Category"
              name="category"
              onChange={handleNewEvent}
            >
              {eventCategoryList.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ margin: "10px", marginBottom: "20px" }}>
            <InputLabel variant="standard">Priority</InputLabel>
            <Select
              data-testid="priority-field"
              variant="standard"
              name="priority"
              onChange={handleNewEvent}
              label="priority"
            >
              {priorityList.map((priority, index) => (
                <MenuItem key={index} value={priorityValues[priority]}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AddNewEvent;
