import {
  Stack,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Chip,
  Link,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  pink,
  red,
  blue,
  yellow,
  orange,
  green,
  purple,
} from "@mui/material/colors";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from "@mui/lab";

const MyModules = () => {
  const [activeTab, setActiveTab] = useState(0); //initially i start from tab 0, first tab
  const handleChange = (event, newTab) => {
    setActiveTab(newTab); //the value of the setActiveTab is the tab number
  };

  const moduleColumns = [
    { field: "day", headerName: "Day", width: 150 },
    { field: "9am", headerName: "9 AM", width: 150 },
    { field: "10am", headerName: "10 AM", width: 150 },
    { field: "11am", headerName: "11 AM", width: 150 },
    { field: "12pm", headerName: "12 PM", width: 150 },
    { field: "1pm", headerName: "1 PM", width: 150 },
    { field: "2pm", headerName: "2 PM", width: 150 },
    { field: "3pm", headerName: "3 PM", width: 150 },
    { field: "4pm", headerName: "4 PM", width: 150 },
    { field: "5pm", headerName: "5 PM", width: 150 },
    { field: "6pm", headerName: "6 PM", width: 150 },
  ];

  const moduleRows = [
    {
      id: 1,
      day: "Monday",
      "9am": "BT1101 Lecture",
      "10am": "",
      "11am": "",
      "12pm": "",
      "1pm": "",
      "2pm": "",
      "3pm": "",
      "4pm": "",
      "5pm": "",
      "6pm": "",
    },
    {
      id: 2,
      day: "Tuesday",
      "9am": "",
      "10am": "CS1010S Lecture",
      "11am": "",
      "12pm": "",
      "1pm": "",
      "2pm": "MA1521 Lecture",
      "3pm": "",
      "4pm": "NTW2007",
      "5pm": "",
      "6pm": "",
    },
    {
      id: 3,
      day: "Wednesday",
      "9am": "BT1101 Lab",
      "10am": "",
      "11am": "",
      "12pm": "",
      "1pm": "IS1108 Tutorial",
      "2pm": "",
      "3pm": "",
      "4pm": "",
      "5pm": "",
      "6pm": "",
    },
    {
      id: 4,
      day: "Thursday",
      "9am": "BT1101 Lecture",
      "10am": "",
      "11am": "",
      "12pm": "",
      "1pm": "",
      "2pm": "",
      "3pm": "",
      "4pm": "NTW2007",
      "5pm": "",
      "6pm": "",
    },
    {
      id: 5,
      day: "Friday",
      "9am": "CS1010S Lab",
      "10am": "CS1010S Lecture",
      "11am": "",
      "12pm": "",
      "1pm": "",
      "2pm": "MA1521 Lecture",
      "3pm": "",
      "4pm": "MA1521 Tutorial",
      "5pm": "",
      "6pm": "",
    },
  ];

  const moduleChips = [
    {
      name: "BT1101",
      color: orange[400],
    },
    {
      name: "CS1010S",
      color: yellow[400],
    },
    {
      name: "MA1521",
      color: purple[300],
    },
    {
      name: "NTW2007",
      color: green[400],
    },
    {
      name: "IS1108",
      color: blue[400],
    },
  ];

  return (
    <div>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Daily View" />
        <Tab label="Weekly View" />
      </Tabs>
      {activeTab === 0 &&
        moduleChips.map((module, index) => (
          <Chip
            key={index}
            sx={{
              margin: "10px",
              backgroundColor: module.color,
              alignItems: "center",
              padding: "20px",
              width: "200px",
            }}
            variant="filled"
            label={
              <Typography sx={{ fontSize: "15px" }}>{module.name}</Typography>
            }
          />
        ))}
      {activeTab === 1 && (
        <DataGrid rows={moduleRows} columns={moduleColumns} />
      )}
    </div>
  );
};

export const TrendingPosts = () => {
  const postList = [
    {
      username: "Aaron Lee",
      initials: "AL",
      date: "26 January 2023, 12:13pm",
      content: "A short guide for module selection for incoming freshmen",
      views: "1.6k",
      likes: "854",
      color: purple[400],
    },
    {
      username: "Samantha Koh",
      initials: "SK",
      date: "20 January 2023, 8:35am",
      content: "What companies look for when starting internships",
      views: "1.2k",
      likes: "306",
      color: red[400],
    },
    {
      username: "Brian Chen",
      initials: "BC",
      date: "13 January 2023, 5:16pm",
      content: "Sharing my CS2030 notes and learning experience",
      views: "1k",
      likes: "132",
      color: orange[400],
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {postList.map((post, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Avatar
            key={index}
            sx={{
              fontSize: "15px",
              margin: "20px",
              bgcolor: post.color,
            }}
          >
            {post.initials}
          </Avatar>
          <Link>
            <Typography>{post.content}</Typography>
          </Link>
          <Box
            sx={{
              alignItems: "center",
              justifyItems: "center",
              margin: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Chip
              sx={{ alignItems: "center", padding: "20px", width: "200px" }}
              variant="outlined"
              label={
                <Typography sx={{ fontWeight: 700, fontSize: "12px" }}>
                  {post.date}
                  <br />
                  {post.views} views, {post.likes} likes
                </Typography>
              }
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const UpcomingEvents = () => {
  const events = [
    {
      name: "Consultation with prof",
      date: "3 February",
      time: "4:00pm",
      priority: 2,
    },
    {
      name: "Lunch with Nic",
      date: "5 February",
      time: "1:00pm",
      priority: 1,
    },
    {
      name: "Committee Club Meeting",
      date: "7 February",
      time: "7:00pm",
      priority: 3,
    },
    {
      name: "Submit CS1010S Project",
      date: "8 February",
      time: "11:59pm",
      priority: 4,
    },
  ];

  function priorityColors(priority) {
    switch (priority) {
      case 1:
        return green[500];
      case 2:
        return yellow[500];
      case 3:
        return orange[500];
      case 4:
        return red[500];
    }
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Timeline>
        {events.map((nextEvent, index) => (
          <div>
            <TimelineItem key={index}>
              <TimelineOppositeContent align="right" color="text.secondary">
                {nextEvent.date} {nextEvent.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color="primary"
                  sx={{ backgroundColor: priorityColors(nextEvent.priority) }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{nextEvent.name}</TimelineContent>
            </TimelineItem>
          </div>
        ))}
      </Timeline>
    </Box>
  );
};

/*
        <TimelineItem sx={{ opacity: 0.2 }}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
*/

const UpcomingTasks = () => {
  const checkboxes = [
    "Finish CS1010S tutorial",
    "Watch BT1101 lecture week 8",
    "Send clarification email on MA1521 lecture 9",
    "Submit NGN draft essay",
  ];

  const [checkedItems, setCheckedItems] = useState(
    new Array(checkboxes.length).fill(false)
  );

  const handleChange = (index) => (event) => {
    let newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <FormGroup>
      {checkboxes.map((checkbox, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox />}
          checked={checkedItems[index]}
          onChange={handleChange(index)}
          label={checkbox}
          style={{
            textDecoration: checkedItems[index] ? "line-through" : "none",
            opacity: checkedItems[index] ? 0.2 : 1,
          }}
        />
      ))}
    </FormGroup>
  );
};

const goToForum = () => {
  return (
    <div>
      <Tooltip sx={{ fontSize: "20px" }} title="Go to Forum" arrow>
        <IconButton
          sx={{
            color: "black",
            backgroundColor: "white",
            borderColor: "white",
            boxShadow: "none",
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 0.3,
              color: "black",
              backgroundColor: "white",
              borderColor: "white",
            },
          }}
        >
          <KeyboardArrowRightRoundedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

function GridComponent() {
  return (
    <Box
      sx={{
        marginLeft: "240px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Card sx={{ opacity: 0.85, margin: "10px", borderRadius: 3 }}>
          <CardContent>
            <div>
              <Box
                sx={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h5" component="div">
                  My Modules
                </Typography>
              </Box>
              <MyModules />
            </div>
          </CardContent>
        </Card>
        <Card sx={{ margin: "10px", borderRadius: 3 }}>
          <CardContent>
            <div>
              <Box
                sx={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h5" component="div">
                  Upcoming Events
                </Typography>
              </Box>
              <UpcomingEvents />
            </div>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Card sx={{ margin: "10px", borderRadius: 3 }}>
          <CardContent>
            <div>
              <Box
                sx={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h5" component="div">
                  Trending Posts
                </Typography>
                {goToForum()}
              </Box>
              <TrendingPosts />
            </div>
          </CardContent>
        </Card>
        <Card sx={{ margin: "10px", borderRadius: 3 }}>
          <CardContent>
            <div>
              <Box
                sx={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h5" component="div">
                  Upcoming Tasks
                </Typography>
              </Box>
              <UpcomingTasks />
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default GridComponent;
//TODO: use of transitions for each page to look more professional
//TODO: edit feature for the calendar
//TODO: add legend for calendar, red for highest and blue for lowest priority (RYGB)
//TODO: add Today's Events and Today's Tasks at the top of the page (half half)
//TODO: make the header translucent
//TODO: make the background of the entire website light grey-ish, so that the cards will stand out better
