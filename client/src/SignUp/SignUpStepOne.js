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
} from "@mui/material";
import {
  FormTextField,
  FormPasswordField,
  FormUsernameField,
  FormEmailField,
  FormAutocomplete,
  FormFacultyMajorField,
  FormHeader,
} from "../FormStyledComponents";
import { majorList, progsList } from "../Constants";
import { LogoComponent } from "../StyledComponents";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// styling for first step
const SignUpStepOne = () => {
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);

  // disable/enable button based on whether criteria for input fields are met
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  // save inputs
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    studentId: "",
    username: "",
    password: "",
    email: "",
    faculty: "",
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

  // on first load of the page
  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [registerInfo]);

  // go to the next page while using the same state
  const handleNextStep = () => {
    navigate("/student/sign-up-step-two", { state: { registerInfo } });
  };

  // check for errors among the fields
  const fieldErrors = {
    name: registerInfo.name === "",
    studentId: registerInfo.studentId === "",
    username: registerInfo.username === "",
    password: registerInfo.password === "",
    email: registerInfo.email === "",
    faculty: registerInfo.faculty === "",
    degree: registerInfo.degree === [],
  };

  return (
    <Box
      sx={{
        margin: "-10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/student-sign-up-background.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ marginTop: "-50px", marginBottom: "20px" }}>
        <LogoComponent width="30%" />
      </Box>
      <Card
        sx={{
          borderRadius: "10px",
          marginTop: "20px",
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
              <FormTextField
                name="studentId"
                label="StudentID"
                defaultText=""
                setfn={handleRegisterInfo}
              />
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
                  filledMajor=""
                  filledFaculty=""
                  setfn={handleRegisterInfo}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel id="academic-plan">Academic Plan</InputLabel>
                  <Select label="Academic Plan" onChange={handleRegisterInfo}>
                    <MenuItem value={"Single Degree"}>Single Degree</MenuItem>
                    <MenuItem value={"Double Degree"}>Double Degree</MenuItem>
                    <MenuItem value={"Double Major"}>Double Major</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormAutocomplete
                  optionsList={majorList}
                  label="Second Major (if any)"
                  name="secondaryMajor"
                  setfn={handleRegisterInfo}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormAutocomplete
                  optionsList={majorList}
                  label="Minor (if any)"
                  name="minors"
                  setfn={handleRegisterInfo}
                />
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
          <Button
            sx={{ marginLeft: "117ch" }}
            variant="contained"
            disabled={!isFormComplete}
            onClick={handleNextStep}
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpStepOne;
