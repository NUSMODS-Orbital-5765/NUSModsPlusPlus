// NEED TO RETRIEVE ITEMS FROM DATABASE AND SORT.
// COMPLETE
import { Box, Tooltip, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

// styling for arrow button to go to related page
export const SeeMoreArrowButton = ({ pageName }) => {
  const pageLinks = { Planner: "/planner-events", Community: "/community" };

  return (
    <Tooltip title={<span>Go to {pageName}</span>} placement="top">
      <IconButton
        data-testid="see-more-button"
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
            transform: "translateX(5px)",
            transition: "transform 0.1s",
          },
        }}
        component={Link}
        to={pageLinks[pageName]}
      >
        <ArrowForwardRoundedIcon
          color="primary"
          sx={{
            fontSize: "30px",
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
