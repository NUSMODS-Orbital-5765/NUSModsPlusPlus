// COMPLETE
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FormTextField,
  FormPasswordField,
  FormUsernameField,
  FormEmailField,
  FormAutocomplete,
  FormFacultyMajorField,
  FormHeader,
  FormMinorField,
} from "../FormStyledComponents";
import { majorList, progsList } from "../Constants";
import { LogoComponent } from "../StyledComponents";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styling for first step
const StudentSignUpPage = () => {
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  // submit alert
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // disable/enable button based on whether criteria for input fields are met
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  // check academic plan
  const [academicPlan, setAcademicPlan] = useState("");
  const handleAcademicPlanChange = (event) => {
    setAcademicPlan(event.target.value);
  };

  // save inputs
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    NUSId: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    faculty: "",
    academicPlan: "",
    primaryDegree: "",
    secondDegree: "",
    secondMajor: "",
    minor: [],
    programme: "",
  });

  const handleRegisterInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleMinorInfo = (value) => {
    setRegisterInfo({
      ...registerInfo,
      ["minor"]: value,
    });
  };

  // on first load of the page
  useEffect(() => {
    handleFormCompletion(fieldErrors);
    console.log(registerInfo);
  }, [registerInfo]);

  // submitting register info
  const userRegisterAPI = `${process.env.REACT_APP_API_LINK}/register/user`;
  const handleSubmit = () => {
    const registerInfoWithoutConfirmPassword = { ...registerInfo };
    delete registerInfoWithoutConfirmPassword.confirmPassword;

    axios
      .post(userRegisterAPI, registerInfoWithoutConfirmPassword)
      .then((response) => {
        setSubmitSuccess(true);
        console.log(response);
        //useNavigate need to be initalise at top
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      })
      .catch((error) => {
        setSubmitError(true);
        console.log(error);
      });
    console.log(registerInfoWithoutConfirmPassword);
  };

  // check for errors among the fields
  const fieldErrors = {
    name: registerInfo.name === "",
    NUSId: registerInfo.NUSId === "",
    username: registerInfo.username === "",
    password: registerInfo.password === "",
    confirmPassword: registerInfo.confirmPassword === "",
    email: registerInfo.email === "",
    faculty: registerInfo.faculty === "",
    primaryDegree: registerInfo.primaryDegree === "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ marginTop: "-50px", marginBottom: "20px" }}>
        <LogoComponent width="30%" />
      </Box>
      <Card
        sx={{
          borderRadius: "10px",
          marginTop: "-30px",
          marginBottom: "50px",
          minWidth: "150ch",
          boxShadow: 0,
        }}
      >
        <CardContent sx={{ margin: "20px" }}>
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "50px" }}
          >
            Welcome! Let's get you settled.
          </Typography>
          <Box
            sx={{
              marginTop: "-20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: "50%",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ marginTop: "-10px" }}>
                <FormHeader text="General Information" />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormTextField
                  name="name"
                  label="Name"
                  defaultText=""
                  setfn={handleRegisterInfo}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormTextField
                  name="NUSId"
                  label="StudentID"
                  defaultText=""
                  setfn={handleRegisterInfo}
                />
              </Box>
              <FormHeader text="Account Information" />
              <Box sx={{ marginBottom: "20px" }}>
                <FormUsernameField defaultText="" setfn={handleRegisterInfo} />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormPasswordField defaultText="" setfn={handleRegisterInfo} />
              </Box>
              <FormEmailField defaultText="" setfn={handleRegisterInfo} />
            </Box>
            <Box
              sx={{
                width: "50%",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ marginTop: "-10px" }}>
                <FormHeader text="Academic Information" />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormFacultyMajorField
                  data-testid="faculty-major-field"
                  filledMajor=""
                  filledFaculty=""
                  setfn={handleRegisterInfo}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel id="academic-plan">Academic Plan</InputLabel>
                  <Select
                    data-testid="academic-plan-field"
                    label="Academic Plan"
                    name="academicPlan"
                    onChange={(e) => {
                      handleAcademicPlanChange(e);
                      handleRegisterInfo(e);
                    }}
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
                    optionsList={majorList}
                    label="Second Degree"
                    name="secondDegree"
                    setfn={handleRegisterInfo}
                  />
                </Box>
              )}
              {academicPlan === "Double Major" && (
                <Box sx={{ marginBottom: "20px" }}>
                  <FormAutocomplete
                    optionsList={majorList}
                    label="Second Major"
                    name="secondMajor"
                    setfn={handleRegisterInfo}
                  />
                </Box>
              )}
              <Box sx={{ marginBottom: "20px" }}>
                <FormMinorField filledMinor={[]} setfn={handleMinorInfo} />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormAutocomplete
                  optionsList={progsList}
                  label="Special Programme (if any)"
                  name="programme"
                  setfn={handleRegisterInfo}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: "20px",
            }}
          >
            <Button
              data-testid="submit-button"
              variant="contained"
              disabled={!isFormComplete}
              onClick={handleSubmit}
            >
              Sign Up
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
                Registered successfully!
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
                Registration failed.
              </Alert>
            </Snackbar>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentSignUpPage;
