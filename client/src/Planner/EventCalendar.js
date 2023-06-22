// to delete: i was gonna highlight the days which have events, but unfortunately i don't know how to do that
import Badge from "@mui/material/Badge";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const EventCalendar = ({ eventDays }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slotProps={{
          day: {
            highlightedDays: eventDays.map((date) => dayjs(date).date()),
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default EventCalendar;
