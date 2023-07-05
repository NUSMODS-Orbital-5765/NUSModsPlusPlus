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
import React, { useState } from "react";

// admin sign up component
const AdminSignUpPage = () => {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleRegisterInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
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
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignUpPage;
