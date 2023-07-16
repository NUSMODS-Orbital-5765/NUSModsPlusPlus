import React, { useState, useEffect } from "react";
import {
  FormHeader,
  FormAutocomplete,
  FormTextField,
} from "../FormStyledComponents";
import { Box, Typography, Snackbar, Alert, Button } from "@mui/material";
import { facultyList, progsList } from "../Constants";

const AdminProfileInfoComponent = ({ userProfile }) => {
  const [editableDetails, setEditableDetails] = useState(false);
  const handleEditableDetails = () => {
    setEditableDetails(!editableDetails);
  };

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // just for testing, please replace with actual implementation
  const [profileInfoCopy, setProfileInfoCopy] = useState(userProfile);

  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    name: profileInfoCopy.name === "",
    studentId: profileInfoCopy.staffId === "",
    faculty: profileInfoCopy.department === "",
    primaryDegree: profileInfoCopy.position === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [profileInfoCopy]);

  const handleProfileInfoCopy = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfileInfoCopy({ ...profileInfoCopy, [name]: value });
  };

  const submitProfileUpdateCopy = () => {
    setEditableDetails(false);
    setSubmitSuccess(true);
    console.log(profileInfoCopy);
  };

  return (
    <Box sx={{ margin: "55px", marginTop: "-20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Personal Details
        </Typography>
        <Button
          sx={{ marginLeft: "30px" }}
          onClick={handleEditableDetails}
          color="error"
          variant="contained"
        >
          Edit
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormHeader text="General Information" />
        <Box sx={{ marginBottom: "20px" }}>
          <FormTextField
            disabled={!editableDetails}
            label="Name"
            name="name"
            defaultText={profileInfoCopy.name}
            setfn={handleProfileInfoCopy}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormTextField
            disabled={!editableDetails}
            label="StaffID"
            name="staffId"
            defaultText={profileInfoCopy.staffId}
            setfn={handleProfileInfoCopy}
          />
        </Box>
        <FormHeader text="Staff Information" />
        <Box sx={{ marginBottom: "20px" }}>
          <FormAutocomplete
            optionsList={[...facultyList, ...progsList]}
            name="department"
            label="Department"
            defaultText={profileInfoCopy.department}
            setfn={handleProfileInfoCopy}
            disabled={!editableDetails}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormTextField
            name="position"
            label="Position"
            defaultText={profileInfoCopy.position}
            setfn={handleProfileInfoCopy}
            disabled={!editableDetails}
          />
        </Box>
      </Box>
      <Button
        onClick={submitProfileUpdateCopy}
        disabled={!isFormComplete}
        sx={{ marginTop: "10px" }}
        variant="contained"
      >
        Save
      </Button>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert
          onClose={() => setSubmitSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Personal details updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={submitError}
        autoHideDuration={3000}
        onClose={() => setSubmitError(false)}
      >
        <Alert
          onClose={() => setSubmitError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Failed to update personal details.
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default AdminProfileInfoComponent;
