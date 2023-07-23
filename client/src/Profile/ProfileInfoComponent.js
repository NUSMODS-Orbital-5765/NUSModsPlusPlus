//COMPLETE
import {
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { majorList, progsList, sampleProfile } from "../Constants";
import {
  FormHeader,
  FormMinorField,
  FormTextField,
  FormAutocomplete,
  FormFacultyMajorField,
} from "../FormStyledComponents";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileInfoFrame = ({ userProfile }) => {
  const [editableDetails, setEditableDetails] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // just for testing, please replace with actual implementation
  const [profileInfo, setProfileInfo] = useState(userProfile);
  const [academicPlan, setAcademicPlan] = useState(userProfile.academicPlan);

  const handleEditableDetails = () => setEditableDetails(!editableDetails)
  const handleAcademicPlanChange = (event) => {
    setAcademicPlan(event.target.value);
  };

  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    name: profileInfo.name === "",
    studentId: profileInfo.studentId === "",
    faculty: profileInfo.faculty === "",
    primaryDegree: profileInfo.primaryDegree === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [profileInfo]);

  const handleProfileInfo = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleMinorInfo = (value) => {
    setProfileInfo({
      ...profileInfo,
      ["minor"]: value,
    });
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
        console.log(response);
      })
      .catch((error) => {
        setSubmitError(false);
        console.log(error);
      });
  };
  // end of test implementation //





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
            label="StudentID"
            name="NUSId"
            defaultText={profileInfo.NUSId}
            setfn={handleProfileInfo}
          />
        </Box>
        <FormHeader text="Academic Information" />
        <Box sx={{ marginBottom: "20px" }}>
          <FormFacultyMajorField
            disabled={!editableDetails}
            filledFaculty={profileInfo.faculty}
            filledMajor={profileInfo.primaryDegree}
            setfn={handleProfileInfo}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="academic-plan">Academic Plan</InputLabel>
            <Select
              disabled={!editableDetails}
              label="Academic Plan"
              value={academicPlan}
              name="academicPlan"
              onChange={e=>{handleAcademicPlanChange(e);handleProfileInfo(e)}}
            >
              <MenuItem value={"Single Degree"}>Single Degree</MenuItem>
              <MenuItem value={"Double Degree"}>Double Degree</MenuItem>
              <MenuItem value={"Double Major"}>Double Major</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {academicPlan === "Double Degree" && (
          <Box sx={{ marginBottom: "20px" }}>
            <FormAutocomplete
              disabled={!editableDetails}
              optionsList={majorList}
              defaultText={
                profileInfo.secondDegree ? profileInfo.secondDegree : ""
              }
              label="Second Degree"
              name="secondDegree"
              setfn={handleProfileInfo}
            />
          </Box>
        )}
        {academicPlan === "Double Major" && (
          <Box sx={{ marginBottom: "20px" }}>
            <FormAutocomplete
              disabled={!editableDetails}
              optionsList={majorList}
              defaultText={
                profileInfo.secondMajor ? profileInfo.secondMajor : ""
              }
              label="Second Major"
              name="secondMajor"
              setfn={handleProfileInfo}
            />
          </Box>
        )}
        <Box sx={{ marginBottom: "20px" }}>
          <FormMinorField
            filledMinor={profileInfo.minor}
            setfn={handleMinorInfo}
            disabled={!editableDetails}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormAutocomplete
            disabled={!editableDetails}
            name="programme"
            label="Special Programme (if any)"
            optionsList={progsList}
            defaultText={profileInfo.programme}
            setfn={handleProfileInfo}
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

const ProfileInfoComponent = () => {
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
  return(
    isFetch &&
  <ProfileInfoFrame userProfile={userProfile} />
  );
}
export default ProfileInfoComponent;
