import {
  Stack,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from "@mui/lab";
import {
  getShortDay,
  priorityColors,
  priorityList,
  sampleDayEvents,
  sampleDayTasks,
  sampleWeekEvents,
} from "../Constants";
import { SeeMoreArrowButton } from "./HomePageShortcuts";

// styling for daily timeline
export const TodayTimeline = ({ eventsList, tasksList }) => {
  const sortedTasksList = tasksList.sort((a, b) => b.priority - a.priority);
  const groupedTasks = sortedTasksList.reduce((result, task) => {
    const { priority } = task;
    if (!result[priority]) {
      result[priority] = [];
    }
    result[priority].push(task);
    return result;
  }, {});

  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Timeline position="alternate">
        {eventsList.map((dayEvent, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ fontSize: "17px" }}
              color="text.secondary"
            >
              {dayEvent.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: priorityColors[dayEvent.priority],
                }}
              />
              {index !== eventsList.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ fontSize: "17px", fontWeight: 700 }}>
              {dayEvent.name}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box
        sx={{
          width: "50%",
          marginLeft: "30px",
        }}
      >
        <List>
          {Object.entries(groupedTasks).map(([priority, tasks]) => (
            <React.Fragment key={priority}>
              {tasks.map((task) => (
                <ListItem key={task.name}>
                  <ListItemText>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: priorityColors[priority],
                            "&.Mui-checked": {
                              color: priorityColors[priority],
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "17px" }}>
                          {task.name}
                        </Typography>
                      }
                    />
                  </ListItemText>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

// styling for weekly datagrid with chips
// todo: enable editing and updating of event details
export const ThisWeekTimetable = ({ eventsList }) => {
  // view event details directly rather than going to planner
  const ViewEventDetails = ({ event }) => {
    // handle the opening and closing of the view event dialog
    const [openEventDetails, setOpenEventDetails] = useState(false);
    const handleOpenEventDetails = () => {
      setOpenEventDetails(true);
    };

    const handleCloseEventDetails = () => {
      setOpenEventDetails(false);
    };

    // easily view event details
    // todo: will input edit feature
    const eventDetailsDict = {
      "Event Category": event.category,
      "Event Date": event.date,
      "Event Time": event.time,
      "Event Priority": priorityList[4 - event.priority],
    };

    return (
      <div>
        <Chip
          onClick={handleOpenEventDetails}
          variant="filled"
          sx={{
            marginRight: "10px",
            border: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: priorityColors[event.priority],
          }}
          label={event.time}
        />
        <Dialog
          maxWidth="md"
          open={openEventDetails}
          onClose={handleCloseEventDetails}
        >
          <DialogTitle sx={{ margin: "20px" }}>
            <Typography sx={{ fontWeight: 700, fontSize: "40px" }}>
              {event.name}
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{ marginTop: "-10px", marginLeft: "20px", marginRight: "20px" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {Object.entries(eventDetailsDict).map(
                ([fieldName, fieldValue]) => (
                  <TextField
                    sx={{ width: "100ch", marginBottom: "20px" }}
                    variant="standard"
                    label={fieldName}
                    readOnly
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={fieldValue}
                  />
                )
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  // main component
  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={5}
        >
          {eventsList.map((event, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
              }}
              key={index}
            >
              <Typography sx={{ fontWeight: 700, fontSize: "30px" }}>
                {getShortDay(event.day)}
              </Typography>
              <Stack sx={{ marginTop: "30px" }} spacing={3}>
                {event.events
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((eventItem, subIndex) => (
                    <Box
                      key={subIndex}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ViewEventDetails event={eventItem} />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "70%",
                        }}
                      >
                        {eventItem.name}
                      </Typography>
                    </Box>
                  ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </div>
    </Box>
  );
};

// events to sort the upcoming events for today and for current week.
const HomePageTimetable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <Card
      sx={{
        minHeight: "40ch",
        marginBottom: "50px",
        borderRadius: "5px",
        width: "90%",
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ margin: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{ marginRight: "20px", fontSize: "40px", fontWeight: 700 }}
          >
            Timetable
          </Typography>
          <SeeMoreArrowButton pageName="Planner" />
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tab sx={{ fontWeight: 600 }} label="Today" />
            <Tab sx={{ fontWeight: 600 }} label="This Week" />
          </Tabs>
        </Box>
        {activeTab === 0 && (
          <TodayTimeline
            eventsList={sampleDayEvents}
            tasksList={sampleDayTasks}
          />
        )}
        {activeTab === 1 && <ThisWeekTimetable eventsList={sampleWeekEvents} />}
      </CardContent>
    </Card>
  );
};

export default HomePageTimetable;
