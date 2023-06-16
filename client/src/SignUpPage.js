import {
  Box,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LogoComponent } from "./StyledComponents";
import { majorList, progsList } from "./Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormAutocomplete,
  FormTextField,
  FormFacultyMajorField,
  FormPasswordField,
  FormInterestsField,
} from "./FormStyledComponents";

// styling for form headers
export const FormHeader = (props) => {
  const { text } = props;
  return (
    <Typography
      color="text.primary"
      sx={{
        marginTop: "30px",
        fontWeight: 700,
        marginBottom: "15px",
        textTransform: "uppercase",
      }}
    >
      {text}
    </Typography>
  );
};

// styling for first step
export const StepOne = ({ handleRegisterInfo }) => {
  return (
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
      <FormTextField
        name="Name"
        label="name"
        defaultText=""
        setfn={handleRegisterInfo}
      />
      <FormTextField
        name="StudentID"
        label="studentId"
        defaultText=""
        setfn={handleRegisterInfo}
      />
      <FormHeader text="Account Information" />
      <FormTextField
        name="Username"
        label="username"
        defaultText=""
        setfn={handleRegisterInfo}
      />
      <FormPasswordField defaultText="" setfn={handleRegisterInfo} />
    </Box>
  );
};

// styling for second step
export const StepTwo = ({ handleRegisterInfo }) => {
  return (
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
      <FormFacultyMajorField
        filledMajor=""
        filledFaculty=""
        setfn={handleRegisterInfo}
      />
      <FormAutocomplete
        optionsList={majorList}
        label="Second Major (if any)"
        name="secondaryMajor"
        setfn={handleRegisterInfo}
      />
      <FormAutocomplete
        optionsList={majorList}
        label="Minor (if any)"
        name="minors"
        setfn={handleRegisterInfo}
      />
      <FormAutocomplete
        optionsList={progsList}
        label="Special Programme (if any)"
        name="programme"
        setfn={handleRegisterInfo}
      />
    </Box>
  );
};

// styling for third step
export const StepThree = ({ handleRegisterInfo }) => {
  return (
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
      <FormInterestsField filledInterests={[]} setfn={handleRegisterInfo} />
    </Box>
  );
};

// styling for main component
const SignUpPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Setting Up...", "Almost There...", "One Last Thing..."];
  const [openNextStepDialog, setOpenNextStepDialog] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    studentId: "",
    username: "",
    password: "",
    faculty: "",
    primaryMajor: "",
    secondaryMajor: "",
    minors: "",
    programme: "",
    interests: [],
  });
  //handler function that are to be passed as props into child component
  const handleRegisterInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(registerInfo);
  }, [registerInfo]);

  const registerAPI = `${process.env.REACT_APP_API_LINK}/register`;
  const submitLoginForm = () => {
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

  const handleOpenNextStepDialog = () => {
    setOpenNextStepDialog(true);
  };

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
      setOpenNextStepDialog(false);
    }
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
        height: "110vh",
      }}
    >
      <Box sx={{ marginTop: "-80px" }}>
        <LogoComponent />
      </Box>
      <Card sx={{ marginTop: "20px", minWidth: "150ch" }}>
        <CardContent>
          <Typography sx={{ fontWeight: "700" }} variant="h3">
            Welcome! Let's get you settled.
          </Typography>
          <Stepper sx={{ marginTop: "20px" }} activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <StepOne handleRegisterInfo={handleRegisterInfo} />
          )}
          {activeStep === 1 && (
            <StepTwo handleRegisterInfo={handleRegisterInfo} />
          )}
          {activeStep === 2 && (
            <StepThree handleRegisterInfo={handleRegisterInfo} />
          )}
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            {activeStep === 2 ? (
              <Button
                sx={{ marginTop: "-20px", marginLeft: "120ch" }}
                onClick={submitLoginForm}
              >
                Submit
              </Button>
            ) : (
              <div>
                <Button
                  sx={{ marginLeft: "112ch" }}
                  onClick={handleOpenNextStepDialog}
                  size="large"
                >
                  Next
                </Button>
                <Dialog
                  open={openNextStepDialog}
                  onClose={() => setOpenNextStepDialog(false)}
                >
                  <DialogTitle>
                    <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
                      Before you continue...
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "17px" }}
                    >
                      Please ensure all fields are filled in accurately before
                      proceeding.
                      <br />
                      If you change your mind, you can always edit them upon
                      login.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="error"
                      onClick={() => setOpenNextStepDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleNextStep} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SignUpPage;
