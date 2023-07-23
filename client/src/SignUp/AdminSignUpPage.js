// sign up page for admin
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import {
  FormHeader,
  FormUsernameField,
  FormEmailField,
  FormPasswordField,
  FormTextField,
  FormAutocomplete,
} from "../FormStyledComponents";
import { facultyList, progsList } from "../Constants";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// admin sign up component
const AdminSignUpPage = () => {
  const navigate = useNavigate();
  // show success/error alert
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // storing the inputs for account registration
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    staffId: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    department: "",
    position: "",
    code: "",
  });

  const fieldErrors = [
    registerInfo.username === "",
    registerInfo.staffId === "",
    registerInfo.password === "",
    registerInfo.confirmPassword === "",
    registerInfo.email === "",
    registerInfo.department === "",
    registerInfo.position === "",
    registerInfo.code !== "adminuser123", // to check that the person is indeed an admin? just use this as a constant for all profiles
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
    const registerInfoOnly = { ...registerInfo };
    delete registerInfoOnly.confirmPassword;
    delete registerInfoOnly.code;
    axios
      .post(adminRegisterAPI, registerInfoOnly)
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
    console.log(registerInfo);
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
                  name="staffId"
                  label="Staff ID"
                  defaultText=""
                  setfn={handleRegisterInfo}
                />
              </Box>
              <FormHeader text="Account Information" />
              <Box sx={{ marginBottom: "20px" }}>
                <FormUsernameField setfn={handleRegisterInfo} />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormPasswordField setfn={handleRegisterInfo} />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormEmailField setfn={handleRegisterInfo} />
              </Box>
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
                <FormHeader text="Staff Information" />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <FormAutocomplete
                  optionsList={[...facultyList, ...progsList]}
                  name="department"
                  label="Department"
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
            </Box>
          </Box>
          <Box
            sx={{
              marginRight: "20px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              data-testid="submit-button"
              label="Submit"
              variant="contained"
              onClick={handleSubmit}
              disabled={!isFormComplete}
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

export default AdminSignUpPage;
