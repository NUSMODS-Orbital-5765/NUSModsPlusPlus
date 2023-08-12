// COMPLETE
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Autocomplete,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { DataGrid } from "@mui/x-data-grid";
import { priorityList, priorityColors } from "../Constants";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { format } from "date-fns";

// edit event dialog
export const EditEventDialog = ({
  eventId,
  eventsList,
  eventCategoryList,
  handleEditEvent,
  openDialog,
  handleCloseDialog,
}) => {
  // retrieve the initial event object
  const eventObject = eventsList.find((event) => event.id === eventId);
  console.log(eventObject);

  // change the event date and time back to the original
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = eventObject.date.split("/");
  const originalDate = new Date(
    dateParts[2],
    parseInt(dateParts[0]) - 1,
    dateParts[1]
  );

  const timeParts = eventObject.time.split(/:| /);
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const isPM = timeParts[2].toUpperCase() === "PM";

  if (isPM && hours !== 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }

  let originalTime = new Date();
  originalTime.setHours(hours);
  originalTime.setMinutes(minutes);

  const [eventName, setEventName] = useState(eventObject.name);
  const [eventCategory, setEventCategory] = useState(eventObject.category);
  const [eventPriority, setEventPriority] = useState(eventObject.priority);
  const [eventDate, setEventDate] = useState(eventObject.date);
  const [eventTime, setEventTime] = useState(eventObject.time);

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
    setEventDate(dateInput.format("DD MMMM YYYY"));
  };

  const handleEventTime = (timeInput) => {
    setEventTime(timeInput.format("hh:mm A"));
  };

  // handle creation of a new event object
  const handleSubmitChangedEvent = () => {
    const newEventObject = {
      name: eventName,
      category: eventCategory,
      priority: eventPriority,
      date: eventDate,
      time: eventTime,
      id: eventId,
    };
    console.log(newEventObject);
    handleEditEvent(newEventObject);
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
            Edit Event
          </Typography>
          <TextField
            data-testid="name-field"
            sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
            label="Event Name"
            variant="standard"
            defaultValue={eventObject.name}
            onChange={handleEventName}
            placeholder="Enter a name for your event"
          />
          <Autocomplete
            freeSolo
            disablePortal
            defaultValue={eventObject.category}
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
            defaultValue={eventObject.priority}
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
              slotProps={{
                textField: {
                  helperText: eventObject.date,
                },
              }}
              sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
              onChange={handleEventDate}
            />
            <TimePicker
              data-testid="time-field"
              label="Event Time"
              name="time"
              slotProps={{
                textField: {
                  helperText: eventObject.time,
                },
              }}
              sx={{ margin: "10px", marginBottom: "20px", width: "100ch" }}
              onChange={handleEventTime}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSubmitChangedEvent}
            disabled={
              !eventName ||
              !eventCategory ||
              !eventPriority ||
              !eventDate ||
              !eventTime
            }
            color="primary"
          >
            Save Event
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// events data grid
const EventsDataGrid = ({
  eventCategoryList,
  eventsList,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  // id of the event to be changed
  const [updatedEventsList, setUpdatedEventsList] = useState(eventsList);

  // sort function
  const [sortValue, setSortValue] = useState("");
  const handleSortValue = (event, value) => {
    setSortValue(value);
  };

  const [eventId, setEventId] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleOpenEditDialog = (eventId) => {
    setEventId(eventId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            fontSize: "15px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          <strong>{params.value}</strong>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 0.7,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.7,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.9,
      renderCell: (params) => (
        <Chip
          sx={{
            backgroundColor: priorityColors[params.value],
            color: "white",
            fontWeight: 700,
          }}
          label={params.value}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ marginLeft: "-10px" }}>
          <Tooltip title="Delete Event" placement="top">
            <IconButton
              data-testid="delete-button"
              onClick={() => handleDeleteEvent(params.row.id)}
            >
              <ClearRoundedIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Event" placement="top">
            <IconButton onClick={() => handleOpenEditDialog(params.row.id)}>
              <EditRoundedIcon color="warning" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Card
        sx={{
          marginBottom: "50px",
          borderRadius: "10px",
          marginTop: "-10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ margin: "15px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Events
            </Typography>
            <Autocomplete
              disablePortal
              onChange={handleSortValue}
              options={["Priority", "Category", "Date"]}
              sx={{
                width: "30ch",
                margin: "10px",
                marginLeft: "30px",
                marginBottom: "20px",
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  label="Sort By"
                  placeholder="Select a sort to be applied"
                />
              )}
            />
          </Box>
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false, // hides the id column cause it looks weird kinda
                },
              },
            }}
            getRowHeight={() => 130}
            sx={{ marginTop: "20px", fontSize: "15px", height: 800 }}
            rows={updatedEventsList}
            columns={columns}
          />
        </CardContent>
      </Card>
      {openEditDialog && (
        <EditEventDialog
          eventId={eventId}
          eventsList={eventsList}
          eventCategoryList={eventCategoryList}
          handleEditEvent={handleEditEvent}
          openDialog={openEditDialog}
          handleCloseDialog={handleCloseEditDialog}
        />
      )}
    </div>
  );
};

export default EventsDataGrid;
