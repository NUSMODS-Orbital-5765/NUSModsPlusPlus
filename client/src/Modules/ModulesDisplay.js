import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React, { useState } from "react";
import { sampleAcademicRequirements } from "../Constants";

// semester module plans
export const SemesterModulePlans = () => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Semester Module Plans
        </Typography>
        <Tabs>
          <Tab></Tab>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// check grad requirements
export function CheckGradRequirements(academicPlan) {
  let basicRequirements = ["commonModules", "primaryDegreeModules"];
  if (academicPlan.secondDegree) {
    basicRequirements.push("secondDegreeModules");
  } else if (academicPlan.secondMajor) {
    basicRequirements.push("secondMajorModules");
  }
  return basicRequirements;
}

// graduation requirements component
export const GradRequirements = () => {
  // expand more button
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // display of the inputs for students' selected academic plan
  const AcademicPlanDetails = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>Double Major </span> in Information
          Systems and Economics •{" "}
          <span style={{ fontWeight: 600 }}>Minor </span> in Geography, History
        </Typography>
        <IconButton sx={{ marginLeft: "10px" }}>
          <EditRoundedIcon color="primary" />
        </IconButton>
      </Box>
    );
  };

  return (
    <div>
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
            <Button variant="contained" color="error">
              Delete
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            <AcademicPlanDetails />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {sampleAcademicRequirements.map((requirement, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography>{requirement.name}</Typography>
                <Box>
                  {requirement.modules.map((module, index) => (
                    <Typography key={index}>{module}</Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

const ModulesDisplay = () => {
  return (
    <div>
      <GradRequirements />
      <SemesterModulePlans />
    </div>
  );
};

export default ModulesDisplay;
