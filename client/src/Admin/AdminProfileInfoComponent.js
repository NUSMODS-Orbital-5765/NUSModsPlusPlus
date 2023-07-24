import React, { useState, useEffect } from "react";
import {
  FormHeader,
  FormAutocomplete,
  FormTextField,
} from "../FormStyledComponents";
import { Box, Typography, Snackbar, Alert, Button } from "@mui/material";
import { facultyList, progsList } from "../Constants";
import axios from "axios";
const AdminProfileInfoComponentFrame = ({ userProfile }) => {
  const [editableDetails, setEditableDetails] = useState(false);
  const handleEditableDetails = () => {
    setEditableDetails(!editableDetails);
  };

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // just for testing, please replace with actual implementation
  const [profileInfo, setProfileInfo] = useState(userProfile);

  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    name: profileInfo.name === "",
    studentId: profileInfo.staffId === "",
    faculty: profileInfo.department === "",
    primaryDegree: profileInfo.position === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [profileInfo]);

  const handleProfileInfo = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const submitProfileUpdate = () => {
    const profileUpdateAPI = `${process.env.REACT_APP_API_LINK}/profile/update`;
    axios
      .post(profileUpdateAPI, profileInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        setEditableDetails(false);
        setSubmitSuccess(true);
        localStorage.setItem("name", profileInfo.name);
      })
      .catch((error) => {
        setSubmitError(false);
        console.log(error);
      });
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
            defaultText={profileInfo.name}
            setfn={handleProfileInfo}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormTextField
            disabled={!editableDetails}
            label="StaffID"
            name="NUSId"
            defaultText={profileInfo.NUSId}
            setfn={handleProfileInfo}
          />
        </Box>
        <FormHeader text="Staff Information" />
        <Box sx={{ marginBottom: "20px" }}>
          <FormAutocomplete
            optionsList={[...facultyList, ...progsList]}
            name="department"
            label="Department"
            defaultText={profileInfo.department}
            setfn={handleProfileInfo}
            disabled={!editableDetails}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormTextField
            name="position"
            label="Position"
            defaultText={profileInfo.position}
            setfn={handleProfileInfo}
            disabled={!editableDetails}
          />
        </Box>
      </Box>
      <Button
        onClick={submitProfileUpdate}
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

const AdminProfileInfoComponent = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    const username = localStorage.getItem("username");
    const GETprofileURL = process.env.REACT_APP_API_LINK + "/profile/get";
    axios
      .get(GETprofileURL, {
        params: {
          username: username,
        },
      })
      .then((res) => {
        setUserProfile(res.data.user);
        setIsFetch(true);
        console.log(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    isFetch && <AdminProfileInfoComponentFrame userProfile={userProfile} />
  );
};
export default AdminProfileInfoComponent;
