// sign up page for admin
import { Typography, Box, Button } from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import { WelcomeCarousel } from "../StyledComponents";
import {
  FormUsernameField,
  FormEmailField,
  FormPasswordField,
} from "../FormStyledComponents";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// admin sign up component
const AdminSignUpPage = () => {
  const navigate = useNavigate();

  // storing the inputs for account registration
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const fieldErrors = [
    registerInfo.username === "",
    registerInfo.password === "",
    registerInfo.email === "",
  ];

  const handleRegisterInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [registerInfo]);

  // disable/enable button based on whether criteria for input fields are met
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  // submitting login information
  const handleSubmit = () => {
    console.log(registerInfo);
    console.log(isFormComplete);
    navigate("/sign-in");
  };

  return (
    <Box
      sx={{
        margin: "-10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "100vh",
        }}
      >
        <WelcomeCarousel />
      </Box>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <LogoComponent />
        <Box sx={{ margin: "50px" }}>
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "40px" }}
          >
            Welcome! Let's get you started.
          </Typography>
          <Box sx={{ marginBottom: "20px" }}>
            <FormUsernameField setfn={handleRegisterInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormPasswordField setfn={handleRegisterInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormEmailField setfn={handleRegisterInfo} />
          </Box>
          <Button
            sx={{ justifyItems: "flex-end" }}
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormComplete}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignUpPage;
