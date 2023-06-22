// COMPLETE
import {
  Box,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormControlLabel,
  IconButton,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import {
  currentSemesterModules,
  priorityColors,
  priorityList,
  priorityValues,
} from "../Constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// main component
const AddNewTask = () => {
  // adding of task categories as a dictionary containing tasks
  const [categoryTasks, setCategoryTasks] = useState({
    ...currentSemesterModules.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {}),
    Personal: [],
  });

  // toggle show/hide textfield input for new category
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const handleToggleAddCategory = () => {
    setOpenAddCategory(!openAddCategory);
  };

  // logging the textfield input for new category name
  const [newCategory, setNewCategory] = useState("");
  const handleNewCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const confirmAddCategory = () => {
    console.log(newCategory);
    setCategoryTasks((prevCategoryTasks) => ({
      ...prevCategoryTasks,
      [newCategory]: [],
    }));
    setOpenAddCategory(false);
  };

  // styling for the add new category buttons and textfields
  const AddNewTaskCategory = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleToggleAddCategory}>
          Add New Category
        </Button>
        {openAddCategory && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <TextField
              sx={{ marginLeft: "20px" }}
              onChange={handleNewCategory}
              variant="standard"
              label="Category Name"
            />
            <Button
              onClick={confirmAddCategory}
              color="success"
              variant="contained"
              disabled={newCategory.length === 0}
              sx={{ marginLeft: "20px", color: "white" }}
            >
              Add
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  // styling for add new task
  const AddNewTaskButton = ({ categoryName }) => {
    // toggle the show/hide state of the input fields
    const [openAddTask, setOpenAddTask] = useState(false);
    const handleToggleAddTask = () => {
      setOpenAddTask(!openAddTask);
    };

    // keep the task name and priority
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState("");

    const handleSetTaskName = (event) => {
      setTaskName(event.target.value);
    };

    const handleSetTaskPriority = (event) => {
      setTaskPriority(event.target.value);
    };

    // add a new task to the category in the dictionary
    const confirmAddTask = () => {
      const newTask = {
        name: taskName,
        priority: priorityValues[taskPriority],
      };
      setCategoryTasks((prevCategoryTasks) => ({
        ...prevCategoryTasks,
        [categoryName]: [...(prevCategoryTasks[categoryName] || []), newTask],
      }));
      console.log(categoryTasks);
    };

    return (
      <Box
        sx={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleToggleAddTask}>
          Add New Task
        </Button>
        {openAddTask && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <TextField
              sx={{ marginLeft: "20px", width: "30ch" }}
              onChange={handleSetTaskName}
              variant="standard"
              label="Task Name"
            />
            <FormControl sx={{ marginLeft: "20px", width: "30ch" }}>
              <InputLabel variant="standard">Task Priority</InputLabel>
              <Select
                variant="standard"
                label="Task Priority"
                onChange={handleSetTaskPriority}
              >
                {priorityList.map((priority, index) => (
                  <MenuItem key={index} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={confirmAddTask}
              color="success"
              variant="contained"
              sx={{ marginLeft: "20px", color: "white" }}
              disabled={taskName.length === 0 || taskPriority.length === 0}
            >
              Add
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  // handle task deletion
  const handleDeleteTask = (category, taskIndex) => {
    setCategoryTasks((prevCategoryTasks) => {
      const updatedTasks = [...prevCategoryTasks[category]];
      updatedTasks.splice(taskIndex, 1);
      return {
        ...prevCategoryTasks,
        [category]: updatedTasks,
      };
    });
  };

  // styling for task with checkbox and name
  const TaskCheckBox = ({ categoryName }) => {
    const tasks = categoryTasks[categoryName];

    const [checkedItems, setCheckedItems] = useState(
      new Array(tasks.length).fill(false)
    );

    const handleCheck = (index) => (event) => {
      let newCheckedItems = [...checkedItems];
      newCheckedItems[index] = event.target.checked;
      setCheckedItems(newCheckedItems);
    };

    return (
      <FormGroup>
        {tasks.map((task, index) => (
          <div>
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  icon={
                    <CheckBoxOutlineBlankOutlinedIcon
                      style={{ color: priorityColors[task.priority] }}
                    />
                  }
                  checkedIcon={
                    <CheckBoxIcon
                      style={{ color: priorityColors[task.priority] }}
                    />
                  }
                />
              }
              checked={checkedItems[index]}
              onChange={handleCheck(index)}
              label={task.name}
              style={{
                textDecoration: checkedItems[index] ? "line-through" : "none",
                opacity: checkedItems[index] ? 0.2 : 1,
              }}
            />
            <IconButton
              onClick={() => handleDeleteTask(categoryName, index)}
              sx={{ marginLeft: "auto" }}
            >
              <ClearRoundedIcon />
            </IconButton>
          </div>
        ))}
      </FormGroup>
    );
  };

  // styling for category accordions
  const CategoryAccordions = ({ categories }) => {
    return (
      <Box sx={{ marginTop: "10px" }}>
        {categories.map((category, index) => {
          return (
            <Accordion key={index} sx={{ boxShadow: 0 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>
                  {category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "-20px" }}>
                <AddNewTaskButton categoryName={category} />
                <TaskCheckBox categoryName={category} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    );
  };

  // styling for main component
  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {AddNewTaskCategory()}
      </Box>
      <CategoryAccordions categories={Object.keys(categoryTasks)} />
    </Box>
  );
};

export default AddNewTask;

/*
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
            {/*map (key, value) */
/*
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
                      control={<Checkbox />}
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
      */
