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
  Link,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import React, { useState, useContext } from "react";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import axios from "axios";

export const StepOne = ({setUsername, setPassword}) => {
  const [showPassword, setShowPassword] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>Personal Information</Typography>
      <TextField label="Name" variant="outlined" required></TextField>
      <TextField
        sx={{ marginTop: "20px" }}
        label="StudentID"
        variant="outlined"
        required
      ></TextField>
      <Typography sx={{ fontWeight: 700, marginTop: "40px" }}>
        Account Information
      </Typography>
      <TextField onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" required></TextField>
      <TextField
        sx={{ marginTop: "20px" }}
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        required
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Box>
  );
};

export const StepTwo = () => {
  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>Academic Information</Typography>
      <FormControl>
        <InputLabel id="Faculty">Faculty</InputLabel>
        <Select label="Faculty>" required>
          <MenuItem value={"School of Computing"}>School of Computing</MenuItem>
          <MenuItem value={"Science"}>Science</MenuItem>
          <MenuItem value={"Engineering"}>Engineering</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel id="Major">Major</InputLabel>
        <Select label="Major>" required>
          <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
          <MenuItem value={"Business Analytics"}>Business Analytics</MenuItem>
          <MenuItem value={"Data Science and Economics"}>
            Data Science and Economics
          </MenuItem>
          <MenuItem value={"Computer Engineering"}>
            Computer Engineering
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel id="Second Major(s) if any">
          Second Major(s) if any
        </InputLabel>
        <Select label="Second Major(s) if any" required>
          <MenuItem value={"Economics"}>Economics</MenuItem>
          <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
          <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel id="Minor(s) if any">Minor(s) if any</InputLabel>
        <Select label="Minor(s) if any>">
          <MenuItem value={"Economics"}>Economics</MenuItem>
          <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
          <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export const StepThree = () => {
  const interests = [
    "internship",
    "research",
    "machine-learning",
    "oop",
    "social sciences",
    "easy to score",
  ];
  const [myInterests, setMyInterests] = useState([]);
  const handleInterests = (event) => {
    setMyInterests(event.target.value);
  };

  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>
        Customise your user experience.
      </Typography>
      <FormControl>
        <InputLabel id="my interests">My Interests</InputLabel>
        <Select
          multiple
          value={myInterests}
          onChange={handleInterests}
          label="My Interests"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((interest) => (
                <Chip sx={{ margin: "5px" }} key={interest} label={interest} />
              ))}
            </Box>
          )}
        >
          {interests.map((interest) => (
            <MenuItem key={interest} value={interest}>
              {interest}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export const StepComplete = () => {
  return (
    <Typography sx={{ fontSize: "30px", margin: "20px" }}>
      You're all set! <Link>Click Here to Login.</Link>
    </Typography>
  );
};

const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Setting Up...", "Almost There...", "One Last Thing..."];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const configuration = {
    method: "post",
    url: "http://localhost:3001/register",
    data: {
      username,
      password,
    },
  };
  const sendRequest = () => {axios(configuration)
   .then((result) => {console.log(result);})
   .catch((error) => {console.log(error);});
  }
  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
    if (activeStep === 2) {
      sendRequest();
    }
    
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/signin-background.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "110vh",
      }}
    >
      <img src="nusmods.png" style={{ width: "30%" }} />
      <Typography sx={{ marginTop: "-15px", fontSize: "20px" }}>
        A new way to plan
      </Typography>
      <Card sx={{ marginTop: "20px", minWidth: "150ch" }}>
        <CardContent>
          <Typography sx={{ fontWeight: "700" }} variant="h3">
            Welcome! Let's get you settled.
          </Typography>
          <Stepper sx={{ marginTop: "20px" }} activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && <StepOne setUsername={setUsername} setPassword={setPassword}/>}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
          {activeStep === steps.length && <StepComplete sendRequest={sendRequest}/>}
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
            <Button onClick={handlePrevStep} size="large">
              Back
            </Button>
            <Button
              sx={{ marginLeft: "100ch" }}
              onClick={handleNextStep}
              size="large"
            >
              Next
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
export default SignUpPage;
