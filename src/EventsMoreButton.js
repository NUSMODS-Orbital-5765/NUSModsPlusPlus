import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { IconButton, Tooltip } from "@mui/material";

const EventsMoreButton = () => {
  return (
    <div>
      <Tooltip sx={{ fontSize: "20px" }} title="Go to Planner" arrow>
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

export default EventsMoreButton;
