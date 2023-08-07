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
} from "@mui/material";
import { priorityList, priorityColors, priorityValues } from "../Constants";
import { sampleModuleGrades } from "../GPACalculator/GPACalculatorConstants";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// styling of new event button + handle addition of new event
const AddNewEvent = () => {
  // for toggling display of add event textfield
  const [openAddEventCategory, setOpenAddEventCategory] = useState(false);
  const handleToggleAddEventCategory = () => {
    setOpenAddEventCategory(!openAddEventCategory);
  };

  // setting the list of event category options. default are current modules + personal
  // depends on the current semester
  const currentEventCategoryList = ["Personal"];
  const [eventCategoryList, setEventCategoryList] = useState(
    currentEventCategoryList
  );

  // to keep the add event category textfield input as a variable
  const [addEventCategory, setAddEventCategory] = useState("");
  const handleAddEventCategory = (event) => {
    setAddEventCategory(event.target.value);
  };

  // to make the change to the list of category options
  const confirmAddEventCategory = () => {
    setEventCategoryList([...eventCategoryList, addEventCategory]);
    setOpenAddEventCategory(false);
  };

  // to store variables of form inputs.
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [eventCategory, setEventCategory] = useState("");
  const [eventPriority, setEventPriority] = useState(0);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      name: eventName,
      date: eventDate.format("DD MMMM YYYY"),
      time: eventTime.format("hh:mm A"),
      category: eventCategory,
      priority: eventPriority,
    };
    const AddEventAPI = `${process.env.REACT_APP_API_LINK}/event/add`;

    axios
      .post(AddEventAPI, newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        alert("Upload Event Successfully");
        newEvent.eventId = response.data.res.id;
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
        //undo the insertion
        alert("Event added Failed" + error.message);
      });
  };

  // handle deletion of events
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
        alert("Delete Event Successfully");
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        //undo the insertion
        alert("Event Delete Failed" + error.message);
      });
  };

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
  useEffect(() => console.log(events), [events]);
  // styling for dialog with form fields for event details
  const AddNewEventDialog = () => {
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
              <Typography sx={{ fontSize: "40px", fontWeight: 700 }}>
                Add New <span style={{ color: "#536DFE" }}>Event</span>
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
              sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
              label="Event Name"
              variant="standard"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            />
            <FormControl sx={{ margin: "10px", marginBottom: "20px" }}>
              <InputLabel variant="standard">Event Category</InputLabel>
              <Select
                variant="standard"
                label="Event Category"
                onChange={(event) => setEventCategory(event.target.value)}
              >
                {eventCategoryList.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                margin: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleToggleAddEventCategory}
              >
                Add New Category
              </Button>
              {openAddEventCategory && (
                <div>
                  <TextField
                    sx={{ marginLeft: "20px", width: "50ch" }}
                    label="Event Category"
                    variant="standard"
                    onChange={handleAddEventCategory}
                  />
                  <Button
                    color="success"
                    sx={{ marginLeft: "20px", color: "white" }}
                    variant="contained"
                    onClick={confirmAddEventCategory}
                    disabled={addEventCategory.length === 0}
                  >
                    Add
                  </Button>
                </div>
              )}
            </Box>
            <FormControl sx={{ margin: "10px", marginBottom: "20px" }}>
              <InputLabel variant="standard">Priority</InputLabel>
              <Select
                variant="standard"
                onChange={(event) => setEventPriority(event.target.value)}
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
                label="Event Date"
                sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
                value={eventDate}
                onChange={(date) => setEventDate(date)}
              />
              <TimePicker
                label="Event Time"
                sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
                value={eventTime}
                onChange={(time) => setEventTime(time)}
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

  // styling for events data grid (i need it here cause i want to delete events)
  const EventsDataGrid = ({ eventsList }) => {
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
          <div style={{ fontSize: "15px", fontWeight: 700 }}>
            {params.value}
          </div>
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
          <div style={{ fontSize: "15px", fontWeight: 700 }}>
            {params.value}
          </div>
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

  // main component
  return (
    <Box sx={{ margin: "20px", marginTop: "20px" }}>
      <Button
        sx={{ marginBottom: "30px" }}
        onClick={handleOpenDialog}
        variant="contained"
      >
        Add New Event
      </Button>
      {AddNewEventDialog()}
      <EventsDataGrid />
    </Box>
  );
};

export default AddNewEvent;
