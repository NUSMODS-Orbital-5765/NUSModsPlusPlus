// COMPLETE
import { Box, Card, CardContent, Button, Typography } from "@mui/material";
import {
  FormTextField,
  FormPasswordField,
  FormUsernameField,
  FormEmailField,
  SignUpWelcomeMessage,
  SignUpStepper,
  FormHeader,
} from "../FormStyledComponents";
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
    primaryMajor: "",
    secondaryMajor: "",
    minors: "",
    programme: "",
    interests: [],
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
    navigate("/sign-up-step-two", { state: { registerInfo } });
  };

  // check for errors among the fields
  const fieldErrors = {
    name: registerInfo.name === "",
    studentId: registerInfo.studentId === "",
    username: registerInfo.username === "",
    password: registerInfo.password === "",
    email: registerInfo.email === "",
  };

  return (
    <Box
      sx={{
        margin: "-8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/signup_background.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ marginTop: "-80px" }}>
        <LogoComponent />
      </Box>
      <Card sx={{ marginTop: "20px", marginBottom: "50px", minWidth: "150ch" }}>
        <CardContent sx={{ margin: "10px" }}>
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "50px" }}
          >
            Welcome! Let's get you settled.
          </Typography>
          <SignUpStepper activeStep={0} />
          <Box
            sx={{
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
