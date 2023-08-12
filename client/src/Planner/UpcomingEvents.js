import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { priorityColors, priorityList } from "../Constants";
import React, { useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import dayjs from "dayjs";
import { todayFormattedDate, isEventOver } from "../Constants";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";

export const NoEventsPlaceholder = () => {
  return (
    <Box
      data-testid="no-events-placeholder"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <HeartBrokenRoundedIcon
        sx={{ fontSize: "100px", color: "text.secondary" }}
      />
      <Typography
        sx={{ color: "text.secondary", fontSize: "35px", fontWeight: 700 }}
      >
        No Events Yet
      </Typography>
    </Box>
  );
};

// custom timeline
export const CustomTimeline = ({
  currentEvents,
  firstProperty,
  secondProperty,
}) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {currentEvents.length !== 0 ? (
        currentEvents.map((dayEvent, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: priorityColors[dayEvent.priority],
                }}
              />
              {index !== currentEvents.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    opacity: isEventOver(dayEvent, todayFormattedDate())
                      ? 0.5
                      : 1,
                  }}
                >
                  <Typography sx={{ fontSize: "17px", fontWeight: 700 }}>
                    {dayEvent.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", marginTop: "3px" }}
                    color="text.secondary"
                  >
                    {dayEvent[firstProperty]} • {dayEvent[secondProperty]}
                  </Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))
      ) : (
        <NoEventsPlaceholder />
      )}
    </Timeline>
  );
};

export const DaySort = ({ eventsList }) => {
  // navigating forward and backwards between the dates
  const [currentDate, setCurrentDate] = useState(todayFormattedDate());
  const seeYesterday = () => {
    const parsedDate = dayjs(currentDate, "DD MMMM YYYY").subtract(1, "day");
    setCurrentDate(parsedDate.format("DD MMMM YYYY"));
  };

  const seeTomorrow = () => {
    const parsedDate = dayjs(currentDate, "DD MMMM YYYY").add(1, "day");
    setCurrentDate(parsedDate.format("DD MMMM YYYY"));
  };

  const todayEvents = eventsList.filter((event) => event.date === currentDate);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="See Previous" placement="top">
          <IconButton onClick={seeYesterday} size="small">
            <KeyboardArrowLeftRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          {currentDate}
        </Typography>
        <Tooltip title="See Next" placement="top">
          <IconButton onClick={seeTomorrow} size="small">
            <KeyboardArrowRightRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomTimeline
        currentEvents={todayEvents}
        firstProperty="category"
        secondProperty="time"
      />
    </div>
  );
};

export const WeekSort = ({ eventsList }) => {
  const getStartOfWeek = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek());

  const seePreviousWeek = () => {
    const newStartDate = new Date(startOfWeek);
    newStartDate.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(newStartDate);
  };

  const seeNextWeek = () => {
    const newStartDate = new Date(startOfWeek);
    newStartDate.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(newStartDate);
  };

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  console.log(endOfWeek);

  // filtering events within the current week
  const weekEvents = eventsList.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  });
  console.log(weekEvents);

  const startOfWeekFormatted = startOfWeek.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const endOfWeekFormatted = endOfWeek.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="See Previous" placement="top">
          <IconButton onClick={seePreviousWeek} size="small">
            <KeyboardArrowLeftRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
        <Typography
          sx={{ justifyContent: "center", fontSize: "20px", fontWeight: 600 }}
        >
          {startOfWeekFormatted} - {endOfWeekFormatted}
        </Typography>
        <Tooltip title="See Next" placement="top">
          <IconButton onClick={seeNextWeek} size="small">
            <KeyboardArrowRightRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomTimeline
        currentEvents={weekEvents}
        firstProperty="date"
        secondProperty="time"
      />
    </div>
  );
};

export const CategorySort = ({ eventsList, eventCategoryList }) => {
  // navigating forward and backwards between the categories
  const [currentCategory, setcurrentCategory] = useState(0);
  const seePrevious = () => {
    if (currentCategory === 0) {
      setcurrentCategory(eventCategoryList.length - 1);
    } else {
      setcurrentCategory(currentCategory - 1);
    }
  };

  const seeNext = () => {
    if (currentCategory === eventCategoryList.length - 1) {
      setcurrentCategory(0);
    } else {
      setcurrentCategory(currentCategory + 1);
    }
  };

  const currentEvents = eventsList.filter(
    (eventObject) => eventObject.category === eventCategoryList[currentCategory]
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="See Previous" placement="top">
          <IconButton onClick={seePrevious} size="small">
            <KeyboardArrowLeftRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          {eventCategoryList[currentCategory]}
        </Typography>
        <Tooltip title="See Next" placement="top">
          <IconButton onClick={seeNext} size="small">
            <KeyboardArrowRightRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomTimeline
        currentEvents={currentEvents}
        firstProperty="date"
        secondProperty="time"
      />
    </div>
  );
};

export const PrioritySort = ({ eventsList }) => {
  // navigating forward and backwards between the categories
  const [currentPriority, setCurrentPriority] = useState(0);
  const seePrevious = () => {
    if (currentPriority === 0) {
      setCurrentPriority(priorityList.length - 1);
    } else {
      setCurrentPriority(currentPriority - 1);
    }
  };

  const seeNext = () => {
    if (currentPriority === priorityList.length - 1) {
      setCurrentPriority(0);
    } else {
      setCurrentPriority(currentPriority + 1);
    }
  };

  const currentEvents = eventsList.filter(
    (eventObject) => eventObject.priority === priorityList[currentPriority]
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="See Previous" placement="top">
          <IconButton onClick={seePrevious} size="small">
            <KeyboardArrowLeftRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          {priorityList[currentPriority]}
        </Typography>
        <Tooltip title="See Next" placement="top">
          <IconButton onClick={seeNext} size="small">
            <KeyboardArrowRightRoundedIcon
              color="primary"
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomTimeline
        currentEvents={currentEvents}
        firstProperty="date"
        secondProperty="time"
      />
    </div>
  );
};

const UpcomingEvents = ({ eventsList, eventCategoryList }) => {
  // sorting feature
  const [sortValue, setSortValue] = useState("");
  const handleSortValue = (event) => {
    const currentSort = event.target.value;
    setSortValue(event.target.value);
  };

  // sort the events list
  const sortedEvents = [...eventsList];
  sortedEvents.sort((a, b) => {
    const dateA = new Date(a.date + " " + a.time);
    const dateB = new Date(b.date + " " + b.time);
    return dateA - dateB;
  });

  return (
    <Card
      sx={{
        backgroundColor: "#f2f2f2",
        marginTop: "-10px",
        borderRadius: "10px",
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Typography
          sx={{ marginBottom: "10px", fontSize: "35px", fontWeight: 700 }}
        >
          Overview
        </Typography>
        <FormControl sx={{ marginBottom: "20px" }} fullWidth>
          <InputLabel variant="standard">Select a view category</InputLabel>
          <Select
            variant="standard"
            value={sortValue}
            label="Select a view category"
            onChange={handleSortValue}
          >
            <MenuItem value="Day">Day</MenuItem>
            <MenuItem value="Week">Week</MenuItem>
            <MenuItem value="Category">Category</MenuItem>
            <MenuItem value="Priority">Priority</MenuItem>
          </Select>
        </FormControl>
        {!sortValue && (
          <Alert sx={{ marginTop: "10px" }} severity="info" color="primary">
            Select a category to summarise your events by!
          </Alert>
        )}
        {sortValue === "Day" && <DaySort eventsList={sortedEvents} />}
        {sortValue === "Week" && <WeekSort eventsList={sortedEvents} />}
        {sortValue === "Category" && (
          <CategorySort
            eventsList={sortedEvents}
            eventCategoryList={eventCategoryList}
          />
        )}
        {sortValue === "Priority" && <PrioritySort eventsList={sortedEvents} />}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
