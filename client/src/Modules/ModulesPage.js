import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import React, { useState } from "react";
import ModulesDisplay from "./ModulesDisplay";

// styling for speed dial
export const MoreActionsSpeedDial = () => {
  // handling the popup status
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // list of speed dial actions
  const moreActionsList = [
    { name: "Edit", icon: <EditRoundedIcon /> },
    { name: "Validate", icon: <CheckBoxRoundedIcon /> },
    { name: "Delete", icon: <DeleteRoundedIcon /> },
  ];

  return (
    <Tooltip title="More actions" placement="top">
      <SpeedDial
        ariaLabel="more actions speed dial"
        direction="down"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        icon={<SpeedDialIcon />}
      >
        {moreActionsList.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Tooltip>
  );
};

// header for modules page
// TODO: add in the dialog component for creating a new plan.
export const ModulesPageHeader = () => {
  // dialog for creating a new plan
  return (
    <Box
      sx={{
        margin: "55px",
        marginTop: "20px",
        borderRadius: "10px",
        backgroundColor: "#e7f2ff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ margin: "30px" }}>
        <Typography
          sx={{
            marginBottom: "30px",
            fontSize: "40px",
            fontWeight: "700",
            color: "#004d80",
          }}
        >
          Module planning made easy.
        </Typography>
        <Typography
          sx={{
            marginBottom: "30px",
            marginTop: "-10px",
            fontSize: "17px",
            color: "#004d80",
          }}
        >
          Easily draft semester plans, check major requirements, get
          recommendations, and receive administrative validation.
        </Typography>
        <Button sx={{ marginBottom: "20px" }} variant="contained">
          Create New Plan
        </Button>
      </Box>
      <img src="/module-header.png" style={{ width: "30%" }} />
    </Box>
  );
};

// main page component
const ModulesPage = () => {
  return (
    <div className="homepage">
      <DrawerComponent defaultTab={3} />
      <AppBarComponent />
      <Box className="remainingViewport">
        <ModulesPageHeader />
        <Box sx={{ margin: "55px", marginTop: "-10px" }}>
          <ModulesDisplay />
        </Box>
      </Box>
    </div>
  );
};
export default ModulesPage;
