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

const ProfileInfoComponent = ({ userProfile }) => {
  const [editableDetails, setEditableDetails] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // just for testing, please replace with actual implementation
  const [profileInfoCopy, setProfileInfoCopy] = useState(userProfile);

  let defaultAcademicPlan = "Single Degree";
  if (profileInfoCopy.secondDegree) {
    defaultAcademicPlan = "Double Degree";
  } else if (profileInfoCopy.secondMajor) {
    defaultAcademicPlan = "Double Major";
  }
  const [academicPlan, setAcademicPlan] = useState(defaultAcademicPlan);

  const handleAcademicPlanChange = (event) => {
    setAcademicPlan(event.target.value);
  };

  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    name: profileInfoCopy.name === "",
    studentId: profileInfoCopy.studentId === "",
    faculty: profileInfoCopy.faculty === "",
    primaryDegree: profileInfoCopy.primaryDegree === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [profileInfoCopy]);

  const handleProfileInfoCopy = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfileInfoCopy({ ...profileInfoCopy, [name]: value });
  };

  const handleMinorInfo = (value) => {
    setProfileInfoCopy({
      ...profileInfoCopy,
      ["minor"]: value,
    });
  };

  const submitProfileUpdateCopy = () => {
    setEditableDetails(false);
    setSubmitSuccess(true);
    console.log(profileInfoCopy);
  };
  // end of test implementation //

  // getting profile information
  const [profileInfo, setProfileInfo] = useState();
  const [isFetch, setIsFetch] = useState(false);
  const handleEditableDetails = () => {
    setEditableDetails(!editableDetails);
  };

  const handleProfileInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const GETprofileURL = process.env.REACT_APP_API_LINK + "/profile/get";
    axios
      .get(GETprofileURL, {
        params: {
          userId: userId,
        },
      })
      .then((user) => {
        setProfileInfo(user.data.user);
        setIsFetch(true);
        console.log(user.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const postUpdateAPI = `${process.env.REACT_APP_API_LINK}/profile/update`;
  const submitProfileUpdate = () => {
    axios
      .post(postUpdateAPI, profileInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        setSubmitSuccess(true);
        console.log(response);
        //useNavigate need to be initalise at top
      })
      .catch((error) => {
        setSubmitError(true);
        console.log(error);
      });
  };

  return (
    // nam, please put back this line isFetch && (
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
            label="StudentID"
            name="studentId"
            defaultText={profileInfoCopy.studentId}
            setfn={handleProfileInfoCopy}
          />
        </Box>
        <FormHeader text="Academic Information" />
        <Box sx={{ marginBottom: "20px" }}>
          <FormFacultyMajorField
            disabled={!editableDetails}
            filledFaculty={profileInfoCopy.faculty}
            filledMajor={profileInfoCopy.primaryDegree}
            setfn={handleProfileInfoCopy}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="academic-plan">Academic Plan</InputLabel>
            <Select
              disabled={!editableDetails}
              label="Academic Plan"
              value={academicPlan}
              onChange={handleAcademicPlanChange}
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
                profileInfoCopy.secondDegree ? profileInfoCopy.secondDegree : ""
              }
              label="Second Degree"
              name="secondDegree"
              setfn={handleProfileInfoCopy}
            />
          </Box>
        )}
        {academicPlan === "Double Major" && (
          <Box sx={{ marginBottom: "20px" }}>
            <FormAutocomplete
              disabled={!editableDetails}
              optionsList={majorList}
              defaultText={
                profileInfoCopy.secondMajor ? profileInfoCopy.secondMajor : ""
              }
              label="Second Major"
              name="secondMajor"
              setfn={handleProfileInfoCopy}
            />
          </Box>
        )}
        <Box sx={{ marginBottom: "20px" }}>
          <FormMinorField
            filledMinor={profileInfoCopy.minor}
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
            defaultText={profileInfoCopy.programme}
            setfn={handleProfileInfoCopy}
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
export default ProfileInfoComponent;
