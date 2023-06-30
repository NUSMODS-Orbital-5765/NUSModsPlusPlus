import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import {
  FormInterestsField,
  FormHeader,
  SignUpWelcomeMessage,
  SignUpStepper,
} from "../FormStyledComponents";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// styling for third step
const SignUpStepThree = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registerInfo: prevRegisterInfo } = location.state;
  const [registerInfo, setRegisterInfo] = useState(prevRegisterInfo);

  const registerAPI = `${process.env.REACT_APP_API_LINK}/register`;
  const submitRegisterForm = () => {
    axios
      .post(registerAPI, registerInfo)
      .then((response) => {
        alert("Register Successfully");
        console.log(response);
        //useNavigate need to be initalise at top
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };
  
  return (
    <Box
      sx={{
        margin: "-8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/signup_background.png)`,
        backgroundSize: "100% 100%", // addresses issue of having to put margins to extend background artificially
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ marginTop: "-80px" }}>
        <LogoComponent />
      </Box>
      <Card
        sx={{ marginTop: "20px", marginBottom: "250px", minWidth: "150ch" }}
      >
        <CardContent sx={{ margin: "10px" }}>
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "50px" }}
          >
            Welcome! Let's get you settled.
          </Typography>
          <SignUpStepper activeStep={2} />
          <Box
            sx={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ marginTop: "-10px" }}>
              <FormHeader text="User Preferences" />
            </Box>
            <FormInterestsField
              filledInterests={[]}
              setfn={handleRegisterInfo}
            />
          </Box>
          <Button
            sx={{ marginLeft: "115ch" }}
            variant="contained"
            onClick={submitRegisterForm}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpStepThree;
