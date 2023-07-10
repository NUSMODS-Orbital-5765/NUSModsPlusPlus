// sign up page for admin
import { Typography, Box, Button } from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import { WelcomeCarousel } from "../StyledComponents";
import {
  FormUsernameField,
  FormEmailField,
  FormPasswordField,
  FormTextField,
} from "../FormStyledComponents";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// admin sign up component
const AdminSignUpPage = () => {
  const navigate = useNavigate();

  // storing the inputs for account registration
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    staffId: "",
    username: "",
    password: "",
    email: "",
    faculty: "",
    position: "",
    code: "",
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
  const adminRegisterAPI = `${process.env.REACT_APP_API_LINK}/register/admin`;
  // submitting sign-up admin information
  const handleSubmit = () => {
    axios
      .post(adminRegisterAPI, registerInfo)
      .then((response) => {
        alert("Register Admin Successfully");
        console.log(response);
        //useNavigate need to be initalise at top
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(registerInfo);
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
        <LogoComponent width="50%" />
        <Box sx={{ margin: "50px" }}>
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "40px" }}
          >
            Welcome! Let's get you started.
          </Typography>
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
                name="staffId"
                label="Staff ID"
                defaultText=""
                setfn={handleRegisterInfo}
              />
            </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormUsernameField setfn={handleRegisterInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormPasswordField setfn={handleRegisterInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormEmailField setfn={handleRegisterInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormTextField
                  name="faculty"
                  label="Faculty"
                  defaultText=""
                  setfn={handleRegisterInfo}
              />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormTextField
                  name="position"
                  label="Position"
                  defaultText=""
                  setfn={handleRegisterInfo}
              />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormTextField
                  name="code"
                  label="Secret Code"
                  defaultText=""
                  setfn={handleRegisterInfo}
              />
          </Box>
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isFormComplete}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignUpPage;
