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
import { priorityColors, priorityList, priorityValues } from "../Constants";
import { sampleModuleGrades } from "../GPACalculator/GPACalculatorConstants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";

const sampleArray = ["a", "b"];

// main component
const AddNewTask = () => {
  // adding of task categories as a dictionary containing tasks
  const [categoryTasks, setCategoryTasks] = useState({
    ...sampleArray.reduce((acc, category) => {
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
    const [taskReminder, setTaskReminder] = useState(null);

    const handleSetTaskName = (event) => {
      setTaskName(event.target.value);
    };

    const handleSetTaskPriority = (event) => {
      setTaskPriority(event.target.value);
    };

    const handleSetTaskReminder = (date) => {
      setTaskReminder(date);
    };

    // add a new task to the category in the dictionary
    const confirmAddTask = () => {
      const newTask = {
        name: taskName,
        priority: priorityValues[taskPriority],
        reminder: taskReminder.format("DD MMMM YYYY"),
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Remind Me"
                sx={{ marginLeft: "20px", width: "30ch" }}
                onChange={handleSetTaskReminder}
              />
            </LocalizationProvider>
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

    // to set the checkboxes as "complete" once they are checked
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
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
              label={
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "17px",
                    textDecoration: checkedItems[index]
                      ? "line-through"
                      : "none",
                    opacity: checkedItems[index] ? 0.2 : 1,
                  }}
                >
                  {task.name}
                  <span style={{ marginLeft: "30px" }}>Due:&nbsp;</span>
                  <span style={{ color: "#7E7E7E" }}>{task.reminder}</span>
                </Typography>
              }
            />
            <IconButton
              onClick={() => handleDeleteTask(categoryName, index)}
              sx={{ marginLeft: "auto" }}
            >
              <ClearRoundedIcon color="error" />
            </IconButton>
          </Box>
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "30px",
                      fontWeight: 700,
                    }}
                  >
                    {category}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "50px",
                      color: "#536DFE",
                      fontWeight: 600,
                    }}
                  >
                    {categoryTasks[category].length} items
                  </Typography>
                </Box>
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
