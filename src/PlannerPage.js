import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker, DateCalendar } from "@mui/x-date-pickers";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Box,
  Card,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  Chip,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Accordion,
  AccordionSummary,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Backdrop,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { red, orange, yellow, green } from "@mui/material/colors";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";

export const NoRowsBackdrop = () => {
  return (
    <Box
      sx={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ArchiveRoundedIcon />
      <Typography>No Items</Typography>
    </Box>
  );
};

const ModuleOptions = [
  { name: "BT1101", difficulty: 60, importance: "major", prereq: false },
  { name: "CS1010S", difficulty: 80, importance: "major", prereq: false },
  { name: "DSA1101", difficulty: 50, importance: "NA", prereq: false },
  { name: "BT2101", difficulty: 50, importance: "major", prereq: true },
  { name: "BT2102", difficulty: 60, importance: "major", prereq: true },
  { name: "CS2030", difficulty: 100, importance: "major", prereq: true },
  { name: "NSW2001", difficulty: 50, importance: "prog", prereq: false },
  { name: "NTW2007", difficulty: 80, importance: "prog", prereq: false },
  { name: "NGN2001", difficulty: 70, importance: "prog", prereq: false },
  { name: "CS2040", difficulty: 100, importance: "major", prereq: true },
  { name: "IS1108", difficulty: 40, importance: "major", prereq: false },
  { name: "IS2101", difficulty: 50, importance: "NA", prereq: false },
  { name: "MA1521", difficulty: 70, importance: "major", prereq: false },
  { name: "MA2001", difficulty: 70, importance: "major", prereq: false },
];

function DifficultyColors(difficulty) {
  if (difficulty < 50) {
    return green[500];
  } else if (difficulty === 50) {
    return yellow[500];
  } else if (difficulty > 50 && difficulty < 70) {
    return orange[500];
  } else {
    return red[500];
  }
}

function priorityColor(priority) {
  switch (priority) {
    case "Very High":
      return "#ef5350";
    case "High":
      return "#ffab40";
    case "Average":
      return "#ffff00";
    case "Low":
      return "#00e676";
  }
}

function averageWorkload(selectedModules) {
  if (selectedModules.length === 0) {
    return 0;
  } else {
    const sum = selectedModules.reduce(
      (accumulator, module) => accumulator + module.difficulty,
      0
    );
    const average = sum / selectedModules.length;
    return average;
  }
}

function workloadColor(average) {
  if (average > 60) {
    return red[500];
  } else if (average > 55 && average <= 60) {
    return orange[500];
  } else if (average > 50 && average <= 55) {
    return yellow[500];
  } else {
    return green[500];
  }
}

export const MyEvents = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [eventPriority, setEventPriority] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleAddEvent = () => {
    setOpen(false);
    const newEvent = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      priority: eventPriority,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const CalendarRows = events.map((newEvent, index) => {
    return {
      id: index + 1,
      col1: newEvent.name,
      col2: newEvent.date,
      col3: newEvent.time,
      col4: newEvent.priority,
    };
  });

  const CalendarColumns = [
    { field: "id", headerName: "No.", width: 70, editable: true },
    { field: "col1", headerName: "Event Name", width: 300, editable: true },
    {
      field: "col2",
      headerName: "Event Date",
      width: 200,
    },
    {
      field: "col3",
      headerName: "Event Time",
      width: 200,
    },
    {
      field: "col4",
      headerName: "Event Priority",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: priorityColor(params.value),
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>{params.value}</Typography>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Card sx={{ marginBottom: "20px", padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "horizontal",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              fontWeight: "700",
              marginRight: "30px",
            }}
          >
            My Events
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{ minWidth: "100px", height: "40px" }}
            variant="outlined"
          >
            New Event
          </Button>
        </Box>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ margin: "10px", width: "40ch" }}
                label="Event Name"
                variant="outlined"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
              />
              <DatePicker
                format="DD-MM-YYYY"
                label="Event Date"
                sx={{ margin: "10px", width: "40ch" }}
                value={eventDate}
                onChange={(date) => setEventDate(date.format("DD-MM-YYYY"))}
              />
              <TimePicker
                label="Event Time"
                sx={{ margin: "10px", width: "40ch" }}
                value={eventTime}
                onChange={(time) => setEventTime(time.format("HH:mm"))}
              />
              <FormControl sx={{ margin: "10px", width: "40ch" }}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  onChange={(event) => setEventPriority(event.target.value)}
                  label="priority"
                >
                  <MenuItem value={"Very High"}>Very High</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Average"}>Average</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddEvent} color="primary">
              OK
            </Button>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Calendar View" />
          <Tab label="Table View" />
        </Tabs>
        {activeTab === 0 && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        )}
        {activeTab === 1 && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DataGrid
              sx={{
                marginLeft: "20px",
                padding: "20px",
                width: "110ch",
              }}
              rows={CalendarRows}
              columns={CalendarColumns}
            />
          </LocalizationProvider>
        )}
      </Card>
    </div>
  );
};

export const MyTasks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [taskPriority, setTaskPriority] = useState(0);
  const [taskCategory, setTaskCategory] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleAddTask = () => {
    setOpen(false);
    const newTask = {
      name: taskName,
      dueDate: taskDueDate,
      priority: taskPriority,
      category: taskCategory,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  //impt make a dictionary!!
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (acc.hasOwnProperty(task.category)) {
      acc[task.category].push(task);
    } else {
      acc[task.category] = [task];
    }
    return acc;
  }, {});

  const TaskRows = tasks.map((newTask, index) => {
    return {
      id: index + 1,
      col1: newTask.name,
      col2: newTask.dueDate,
      col3: newTask.priority,
      col4: newTask.category,
    };
  });

  const TaskColumns = [
    { field: "id", headerName: "No.", width: 70, editable: true },
    { field: "col1", headerName: "Task Name", width: 300, editable: true },
    {
      field: "col2",
      headerName: "Task Date",
      width: 200,
    },
    {
      field: "col3",
      headerName: "Task Priority",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: priorityColor(params.value),
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>{params.value}</Typography>
        </Box>
      ),
    },
    { field: "col4", headerName: "Task Category", width: 150 },
  ];

  console.log(tasksByCategory);
  return (
    <div>
      <Card sx={{ marginBottom: "20px", padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "horizontal",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              fontWeight: "700",
              marginRight: "30px",
            }}
          >
            My Tasks
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{ minWidth: "100px", height: "40px" }}
            variant="outlined"
          >
            New Task
          </Button>
        </Box>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ margin: "10px", width: "40ch" }}
                label="Task Name"
                variant="outlined"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                required
              />
              <DatePicker
                format="DD-MM-YYYY"
                label="Due Date"
                sx={{ margin: "10px", width: "40ch" }}
                value={taskDueDate}
                onChange={(date) => setTaskDueDate(date.format("DD-MM-YYYY"))}
                required
              />
              <FormControl sx={{ margin: "10px", width: "40ch" }}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  onChange={(event) => setTaskPriority(event.target.value)}
                  label="priority"
                  required
                >
                  <MenuItem value={"Very High"}>Very High</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Average"}>Average</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ margin: "10px", width: "40ch" }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  onChange={(event) => setTaskCategory(event.target.value)}
                  label="category"
                  required
                >
                  <MenuItem value={"BT1101"}>BT1101</MenuItem>
                  <MenuItem value={"CS1010S"}>CS1010S</MenuItem>
                  <MenuItem value={"MA1521"}>MA1521</MenuItem>
                  <MenuItem value={"NGN2001"}>NGN2001</MenuItem>
                  <MenuItem value={"IS1108"}>IS1108</MenuItem>
                </Select>
                <Button sx={{ marginTop: "10px" }} variant="contained">
                  Or Add New Category
                </Button>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddTask} color="primary">
              OK
            </Button>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Module View" />
          <Tab label="Table View" />
        </Tabs>
        {activeTab === 0 && (
          <div>
            {/*map (key, value) */}
            {Object.entries(tasksByCategory).map(([category, tasks]) => (
              <Accordion sx={{ margin: "20px", width: "135ch" }} key={category}>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                  <Typography sx={{ fontWeight: "700" }}>{category}</Typography>
                </AccordionSummary>
                {tasks.map((task, index) => (
                  <Box
                    sx={{
                      margin: "20px",
                      display: "flex",
                      flexDirection: "row",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          style={{ color: priorityColor(task.priority) }}
                        />
                      }
                      label={task.name}
                    />
                    <Typography
                      key={index}
                      sx={{
                        marginLeft: "50px",
                        fontWeight: "700",
                        color: "black",
                      }}
                    >
                      Do By: {task.dueDate}
                    </Typography>
                  </Box>
                ))}
              </Accordion>
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DataGrid
              sx={{
                marginLeft: "20px",
                padding: "20px",
                width: "110ch",
              }}
              rows={TaskRows}
              columns={TaskColumns}
            />
          </LocalizationProvider>
        )}
      </Card>
    </div>
  );
};

const PlannerPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const [selectModuleY1S1, setSelectModuleY1S1] = useState([]);
  const [selectModuleY1S2, setSelectModuleY1S2] = useState([]);
  const [selectModuleY2S1, setSelectModuleY2S1] = useState([]);

  const handleSelectModuleY1S1 = (event) => {
    setSelectModuleY1S1(event.target.value);
  };

  const handleSelectModuleY1S2 = (event) => {
    setSelectModuleY1S2(event.target.value);
  };

  const handleSelectModuleY2S1 = (event) => {
    setSelectModuleY2S1(event.target.value);
  };

  return (
    <div>
      <AppBarComponent />
      <DrawerComponent />
      <Box
        sx={{
          marginLeft: "250px",
          marginRight: "20px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card sx={{ marginBottom: "20px", padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "horizontal",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "50px",
                fontWeight: "700",
              }}
            >
              My Academic Plan
            </Typography>
            <Chip
              sx={{ fontSize: "15px", marginLeft: "30px", marginRight: "10px" }}
              size="large"
              label="Business Analytics"
              variant="outlined"
            />
            <Chip
              sx={{ fontSize: "15px" }}
              size="large"
              label="NUS College"
              variant="outlined"
            />
          </Box>
          <div>
            <Tabs value={activeTab} onChange={handleChange}>
              <Tab label="Y1S1" />
              <Tab label="Y1S2" />
              <Tab label="Y2S1" />
            </Tabs>
            {(() => {
              switch (activeTab) {
                case 0:
                  function checkRemarks(module) {
                    if (module.prereq) {
                      return "This module has pre-requisites.";
                    } else if (module.importance === "NA") {
                      return "This module is not part of your chosen major(s).";
                    }
                  }

                  const Y1S1Rows = selectModuleY1S1.map((module, index) => {
                    return {
                      id: index + 1,
                      col1: module.name,
                      col2: module.difficulty,
                      col3: checkRemarks(module),
                    };
                  });

                  const Y1S1Columns = [
                    { field: "id", headerName: "No.", width: 70 },
                    { field: "col1", headerName: "Module Name", width: 150 },
                    {
                      field: "col2",
                      headerName: "Module Difficulty",
                      width: 150,
                      renderCell: (params) => (
                        <div>
                          <CircleRoundedIcon
                            sx={{ color: DifficultyColors(params.value) }}
                          />
                        </div>
                      ),
                    },
                    {
                      field: "col3",
                      headerName: "Remarks",
                      width: 500,
                      renderCell: (params) => (
                        <div>
                          {params.value ===
                            "This module has pre-requisites." && (
                            <Alert severity="warning">{params.value}</Alert>
                          )}
                          {params.value ===
                            "This module is not part of your chosen major(s)." && (
                            <Alert severity="error">{params.value}</Alert>
                          )}
                        </div>
                      ),
                    },
                  ];

                  return (
                    <div>
                      <FormControl sx={{ margin: "20px", width: "40ch" }}>
                        <InputLabel id="y1s1-label">Select Module</InputLabel>
                        <Select
                          multiple
                          value={selectModuleY1S1}
                          onChange={handleSelectModuleY1S1}
                          label="Select Module"
                          sx={{ width: "100ch" }}
                          renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {selected.map((module) => (
                                <Chip
                                  sx={{ margin: "5px" }}
                                  key={module.name}
                                  label={module.name}
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {ModuleOptions.map((module, index) => (
                            <MenuItem key={index} value={module}>
                              {module.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontWeight: "700", padding: "20px" }}>
                          Current Plan
                        </Typography>
                        <Button
                          sx={{ marginRight: "60px" }}
                          variant="contained"
                        >
                          Save Plan
                        </Button>
                      </Box>
                      <DataGrid
                        sx={{
                          marginLeft: "20px",
                          padding: "20px",
                          width: "110ch",
                        }}
                        rows={Y1S1Rows}
                        columns={Y1S1Columns}
                      />
                      <Typography sx={{ fontWeight: "700", padding: "20px" }}>
                        Summary
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "300",
                            padding: "20px",
                          }}
                        >
                          My Workload:
                        </Typography>
                        <CircularProgress
                          style={{
                            color: workloadColor(
                              averageWorkload(selectModuleY1S1)
                            ),
                          }}
                          size={80}
                          variant="determinate"
                          value={averageWorkload(selectModuleY1S1)}
                        />
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginLeft: "-60px",
                            marginTop: "25px",
                          }}
                        >
                          {Math.round(averageWorkload(selectModuleY1S1))}
                          {"%"}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: "700", padding: "20px" }}>
                        Other Notes
                      </Typography>
                      {selectModuleY1S1.length < 5 && (
                        <Alert severity="error">
                          Please select more than 4 modules.
                        </Alert>
                      )}
                      {selectModuleY1S1.length > 5 && (
                        <Alert severity="warning">You are overloading!</Alert>
                      )}
                      {selectModuleY1S1.filter(
                        (module) => module.importance === "prog"
                      ).length < 1 && (
                        <Alert severity="warning">
                          Please select more modules to fulfil your programme
                          requirements.
                        </Alert>
                      )}
                      {selectModuleY1S1.filter(
                        (module) => module.importance === "major"
                      ).length < 3 && (
                        <Alert severity="warning">
                          Please select more modules to fulfil your major
                          requirements.
                        </Alert>
                      )}
                    </div>
                  );
                case 1:
                  return (
                    <FormControl sx={{ margin: "20px", width: "40ch" }}>
                      <InputLabel id="y1s2-label">Select Module</InputLabel>
                      <Select
                        value={selectModuleY1S2}
                        onChange={handleSelectModuleY1S2}
                        label="Select Module"
                        sx={{ width: "100ch" }}
                      >
                        {ModuleOptions.map((module, index) => (
                          <MenuItem key={index} value={module}>
                            {module.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                case 2:
                  return (
                    <FormControl sx={{ margin: "20px", width: "40ch" }}>
                      <InputLabel id="y2s1-label">Select Module</InputLabel>
                      <Select
                        multiple
                        value={selectModuleY2S1}
                        onChange={handleSelectModuleY2S1}
                        label="Select Module"
                        sx={{ width: "100ch" }}
                      >
                        {ModuleOptions.map((module, index) => (
                          <MenuItem key={index} value={module}>
                            {module.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
              }
            })()}
          </div>
        </Card>
        <MyEvents />
        <MyTasks />
      </Box>
    </div>
  );
};

export default PlannerPage;

// TODO: have a success alert when there are no errors and all requirements are fulfilled.
// TODO: remove all modules with alerts and grey out the cells so can be differentiated.
// TODO: make events editable and deletable
// TODO: add new category for tasks
// TODO: calendar representation for BOTH events and tasks, sorted by modules or date.
