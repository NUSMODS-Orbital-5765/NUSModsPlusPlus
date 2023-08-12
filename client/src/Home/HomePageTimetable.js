import { Box, Card, CardContent, Typography, Popover } from "@mui/material";
import React, { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { getShortDay, priorityColors, sampleWeekEvents } from "../Constants";
import { SeeMoreArrowButton } from "./HomePageShortcuts";
import { getDay } from "date-fns";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";
import dayjs from "dayjs";
import { todayFormattedDate, isEventOver } from "../Constants";

// placeholder function for getting today's events from the database
export const getTodayEvents = () => {
  return getThisWeekEvents(sampleWeekEvents)[getTodayDayOfWeek()];
};

// placeholder function for getting current week's events from the database
export const getThisWeekEvents = (thisWeekEvents) => {
  // supposed to extract from database.
  // sample week events is just an array of events whose dates fall within the current week.
  const eventsDict = {};

  // group by day of the week
  thisWeekEvents.forEach((event) => {
    const dateParts = event.date.split("-");
    const day = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    ).toLocaleDateString("en-US", { weekday: "long" });

    if (!eventsDict[day]) {
      eventsDict[day] = [];
    }

    eventsDict[day].push(event);
  });

  return eventsDict;
};

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getTodayDayOfWeek = () => {
  const today = new Date().getDay();
  if (today === 0) {
    return daysOfWeek[daysOfWeek.length - 1]; // specifically for sunday because getDay is 0
  } else {
    return daysOfWeek[today - 1];
  }
};

export function parseTime(timeString) {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":");
  let parsedHours = parseInt(hours);
  if (period === "PM" && parsedHours < 12) {
    parsedHours += 12;
  }
  return new Date(0, 0, 0, parsedHours, minutes);
}

// show event details
export const EventDetailsPopover = (
  openPopover,
  handleClosePopover,
  event,
  anchorEl
) => {
  return (
    <Popover
      open={openPopover}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ padding: "10px" }}>{event}</Typography>
    </Popover>
  );
};

// timeline box feature
export const TimelineBox = ({ event }) => {
  return (
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
          opacity: isEventOver(event, todayFormattedDate()) ? 0.5 : 1,
        }}
      >
        <Typography sx={{ fontSize: "17px", fontWeight: 700 }}>
          {event.name}
        </Typography>
        <Typography
          sx={{ fontSize: "15px", marginTop: "3px" }}
          color="text.secondary"
        >
          {event.category} • {event.time}
        </Typography>
      </Box>
    </Box>
  );
};

// styling for event cards
export const EventCard = ({ event }) => {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const handleShowEventDetails = () => {
    setShowEventDetails(true);
  };

  return (
    <Box
      data-testid="event-card"
      sx={{
        margin: "10px",
        minWidth: "200px",
        borderRadius: "10px",
        backgroundColor: priorityColors[event.priority],
        opacity: isEventOver(event) ? 0.7 : 1,
      }}
      component={Card}
    >
      <CardContent>
        <Typography sx={{ fontSize: "17px", fontWeight: 600, color: "white" }}>
          {event.name}
        </Typography>
        <Typography sx={{ fontSize: "15px", color: "white", marginTop: "5px" }}>
          {event.category} • {event.time}
        </Typography>
      </CardContent>
    </Box>
  );
};

// styling for daily timeline
export const TodayTimeline = ({ eventsList }) => {
  // sort the events by time for currentday
  const sortedEventsList = eventsList
    ? eventsList.sort((a, b) => {
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
        return 0;
      })
    : [];

  return (
    <Card
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            sx={{ fontSize: " 35px", marginRight: "20px", fontWeight: 700 }}
          >
            Today
          </Typography>
          <SeeMoreArrowButton pageName="Planner" />
        </Box>
        {/* to ensure that the timeline is left aligned rather than centre aligned */}
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {sortedEventsList.length !== 0 ? (
            sortedEventsList.map((dayEvent, index) => (
              <TimelineItem data-testid="timeline-item" key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: priorityColors[dayEvent.priority],
                    }}
                  />
                  {index !== sortedEventsList.length - 1 && (
                    <TimelineConnector />
                  )}
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
      </CardContent>
    </Card>
  );
};

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

// styling for weekly timetable
export const ThisWeekTimetable = ({ eventsDict }) => {
  return (
    <Card
      sx={{ borderRadius: "10px", backgroundColor: "#f2f2f2", boxShadow: 0 }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{ fontSize: "35px", fontWeight: 700, marginRight: "20px" }}
          >
            Coming Up Next
          </Typography>
          <SeeMoreArrowButton pageName="Planner" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflowX: "auto",
          }}
        >
          {/* can only use object.entries on dictionary, cannot map directly. */}
          {daysOfWeek.map((day, index) => {
            // sort the events by time
            const sortedEvents = eventsDict[day]?.sort((a, b) => {
              const timeA = parseTime(a.time);
              const timeB = parseTime(b.time);
              if (timeA < timeB) return -1;
              if (timeA > timeB) return 1;
              return 0;
            });

            return (
              <Box
                key={index}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                  marginTop: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                  minHeight: "120px",
                  width: "200%",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    marginLeft: "20px",
                    minWidth: "60px",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "25px",
                      color:
                        getTodayDayOfWeek() === day ? "#1a90ff" : "inherit",
                    }}
                  >
                    {getShortDay(day)}
                  </Typography>
                </Box>
                {/* render the events for the current day */}
                {sortedEvents?.length &&
                  sortedEvents.map((event, eventIndex) => (
                    <EventCard key={eventIndex} event={event} />
                  ))}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

// events to sort the upcoming events for today and for current week.
const HomePageTimetable = () => {
  return (
    <Box
      sx={{
        marginTop: "-10px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box sx={{ marginLeft: "55px", width: "30%" }}>
        <TodayTimeline eventsList={getTodayEvents()} />
      </Box>
      <Box
        sx={{
          marginLeft: "30px",
          width: "60%",
          marginRight: "55px",
        }}
      >
        <ThisWeekTimetable eventsDict={getThisWeekEvents(sampleWeekEvents)} />
      </Box>
    </Box>
  );
};

export default HomePageTimetable;
