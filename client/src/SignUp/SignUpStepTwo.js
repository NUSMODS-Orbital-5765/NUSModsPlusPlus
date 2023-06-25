import { Box, Card, CardContent, Button, Typography } from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import { majorList, progsList } from "../Constants";
import {
  FormAutocomplete,
  FormFacultyMajorField,
  SignUpStepper,
  SignUpWelcomeMessage,
  FormHeader,
} from "../FormStyledComponents";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

// styling for second step
const SignUpStepTwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registerInfo: prevRegisterInfo } = location.state;
  const [registerInfo, setRegisterInfo] = useState(prevRegisterInfo);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // disable/enable button based on whether criteria for input fields are met
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

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
    navigate("/sign-up-step-three", { state: { registerInfo } });
  };

  // check for errors among the fields
  const fieldErrors = {
    faculty: registerInfo.faculty === "",
    primaryMajor: registerInfo.primaryMajor === "",
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
          <SignUpStepper activeStep={1} />
          <Box
            sx={{
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

export default SignUpStepTwo;
