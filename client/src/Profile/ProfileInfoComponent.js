//COMPLETE
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { majorList, progsList, sampleProfile } from "../Constants";
import {
  FormTextField,
  FormAutocomplete,
  FormPasswordField,
  FormFacultyMajorField,
  FormInterestsField,
} from "../FormStyledComponents";
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
    setEditableDetails(!editableDetails);
  };

  return (
    <Card
      sx={{
        borderRadius: "5px",
        marginLeft: "30px",
        width: "700px",
        boxShadow: 1,
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
            sx={{ marginLeft: "30px" }}
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
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <ProfileHeader text="General Information" />
              <FormTextField
                disabled={!editableDetails}
                label="Name"
                defaultText={sampleProfile["Name"]}
              />
              <FormTextField
                disabled={!editableDetails}
                label="StudentID"
                defaultText={sampleProfile["StudentID"]}
              />
              <ProfileHeader text="Account Information" />
              <FormTextField
                disabled={!editableDetails}
                label="Username"
                defaultText={sampleProfile["Username"]}
              />
              <FormPasswordField
                disabled={!editableDetails}
                defaultText={sampleProfile["Password"]}
              />
            </Box>
            <Box sx={{ marginLeft: "50px" }}>
              <ProfileHeader text="Academic Information" />
              <FormFacultyMajorField
                disabled={!editableDetails}
                filledFaculty={sampleProfile["Faculty"]}
                filledMajor={sampleProfile["Major"]}
              />
              <FormAutocomplete
                disabled={!editableDetails}
                label="Second Major"
                optionsList={majorList}
                filledOption={sampleProfile["Second Major"]}
              />
              <FormAutocomplete
                disabled={!editableDetails}
                label="Minor"
                optionsList={majorList}
                filledOption={sampleProfile["Minor"]}
              />
              <FormAutocomplete
                disabled={!editableDetails}
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
            <FormInterestsField
              disabled={!editableDetails}
              filledInterests={sampleProfile["Interests"]}
            />
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
