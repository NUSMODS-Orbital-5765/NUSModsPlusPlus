//COMPLETE
// handleUpload feature for "save" button not done.
// i dunno how to set the editable feature (click on edit to edit, otherwise disabled. clicking on save will disable all fields)
// this is to prevent any unnecessary changes.
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { majorList, progsList, sampleProfile } from "./Constants";
import {
  DefaultTextField,
  DefaultAutocomplete,
  PasswordField,
  FacultyMajorField,
  InterestsField,
} from "./SignUpPage";
import React, { useState } from "react";

// styling for headers
export const ProfileHeader = (props) => {
  const { text } = props;
  return (
    <Typography
      sx={{
        marginTop: "30px",
        marginBottom: "20px",
        color: "text.secondary",
        fontWeight: 700,
        textTransform: "uppercase",
      }}
    >
      {text}
    </Typography>
  );
};

const ProfileInfoComponent = () => {
  const [editableDetails, setEditableDetails] = useState(false);
  const handleEditableDetails = () => {
    setEditableDetails(true);
  };

  return (
    <Card
      sx={{
        borderRadius: "5px",
        marginLeft: "30px",
        width: "700px",
        boxShadow: 0,
      }}
    >
      <CardContent>
        <Box
          sx={{
            margin: "10px",
            marginBottom: "-10px",
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>My</Typography>
          <Typography
            sx={{
              marginLeft: "8px",
              fontSize: "30px",
              fontWeight: 700,
              color: "#536DFE",
            }}
          >
            Personal Details
          </Typography>
          <Button
            sx={{ marginLeft: "280px" }}
            onClick={handleEditableDetails}
            variant="outlined"
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              margin: "10px",
              marginRight: "20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <ProfileHeader text="General Information" />
              <DefaultTextField
                label="Name"
                filledText={sampleProfile["Name"]}
              />
              <DefaultTextField
                label="StudentID"
                filledText={sampleProfile["StudentID"]}
              />
              <ProfileHeader text="Account Information" />
              <DefaultTextField
                label="Username"
                filledText={sampleProfile["Username"]}
              />
              <PasswordField filledText={sampleProfile["Password"]} />
            </Box>
            <Box sx={{ marginLeft: "50px" }}>
              <ProfileHeader text="Academic Information" />
              <FacultyMajorField
                filledFaculty={sampleProfile["Faculty"]}
                filledMajor={sampleProfile["Major"]}
              />
              <DefaultAutocomplete
                label="Second Major"
                optionsList={majorList}
                filledOption={sampleProfile["Second Major"]}
              />
              <DefaultAutocomplete
                label="Minor"
                optionsList={majorList}
                filledOption={sampleProfile["Minor"]}
              />
              <DefaultAutocomplete
                label="Special Programme (if any)"
                optionsList={progsList}
                filledOption={sampleProfile["Special Programme"]}
              />
            </Box>
          </Box>
          <Box
            sx={{ margin: "10px", display: "flex", flexDirection: "column" }}
          >
            <ProfileHeader text="User Preferences" />
            <InterestsField filledInterests={sampleProfile["Interests"]} />
          </Box>
        </Box>
        <Button
          onClick={() => setEditableDetails(false)}
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
export default ProfileInfoComponent;
