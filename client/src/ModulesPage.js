import AppBarComponent from "./AppBar/AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Tooltip,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import React, { useState } from "react";
import { grey } from "@mui/material/colors";
import { sampleProfile } from "./Constants";

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

// graduation requirements component
export const OverallModulePlan = ({ sampleProfile }) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        backgroundColor: "#f2f2f2",
        boxShadow: 0,
      }}
    >
      <CardContent
        sx={{
          margin: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Graduation Requirements
            </Typography>
            <Chip
              sx={{
                marginLeft: "30px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "white",
              }}
              label="Default"
              color="success"
              variant="filled"
            />
          </Box>
          <Box sx={{ position: "absolute", top: 0, right: 0 }}>
            <MoreActionsSpeedDial />
          </Box>
        </Box>
        <Typography sx={{ marginTop: "10px" }}>
          <span style={{ fontWeight: 700 }}>Double Major </span> in Information
          Systems <span style={{ fontWeight: 700 }}>and </span> Economics
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          <span style={{ fontWeight: 700 }}>Minor </span> in Statistics
        </Typography>
      </CardContent>
    </Card>
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
          <OverallModulePlan sampleProfile={sampleProfile} />
        </Box>
        <Box
          sx={{
            marginLeft: "55px",
            marginTop: "-25px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "35px",
              fontWeight: 700,
            }}
          >
            Plans By Semester
          </Typography>
        </Box>
        <Card
          sx={{
            margin: "55px",
            marginTop: "-30px",
            boxShadow: 0,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Hello
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
export default ModulesPage;
