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
import { TimelineBox } from "../Home/HomePageTimetable";
import { priorityColors } from "../Constants";
import React, { useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import dayjs from "dayjs";
import { todayFormattedDate, isEventOver } from "../Constants";
import { NoEventsPlaceholder } from "../Home/HomePageTimetable";

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
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {todayEvents.length !== 0 ? (
          todayEvents.map((dayEvent, index) => (
            <TimelineItem data-testid="timeline-item" key={index}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: priorityColors[dayEvent.priority],
                  }}
                />
                {index !== todayEvents.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <TimelineBox event={dayEvent} />
              </TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <NoEventsPlaceholder />
        )}
      </Timeline>
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
        {sortValue === "Day" && <DaySort eventsList={eventsList} />}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
