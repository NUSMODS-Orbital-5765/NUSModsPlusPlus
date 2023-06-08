//COMPLETE
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Chip,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LogoComponent from "./LogoComponent";
import {
  facultyList,
  majorDict,
  majorList,
  progsList,
  interestsDict,
} from "./Constants";
import { Link } from "react-router-dom";

// styling for headers
function DefaultHeader(text) {
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
}

// styling for text fields
function DefaultTextField(label, name, setfn) {
  return (
    <TextField
      sx={{ marginBottom: "20px" }}
      name={name}
      label={label}
      onChange={setfn}
      variant="outlined"
      required
    ></TextField>
  );
}

// styling for autocomplete components
function DefaultAutocomplete(optionsList, label, name, setfn) {
  return (
    <Autocomplete
      sx={{ marginTop: "20px" }}
      disablePortal
      name={name}
      options={optionsList}
      onChange={(e,v)=>{setfn(name, v)}}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

// content for first step of setting up
export const StepOne = ({handleRegisterInfo}) => {
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
      <Box sx={{ marginTop: "-10px" }}>
        {DefaultHeader("General Information")}
      </Box>
      {DefaultTextField("Name","name",handleRegisterInfo)}
      {DefaultTextField("StudentID","studentId",handleRegisterInfo)}
      {DefaultHeader("Account Information")}
      {DefaultTextField("Username","username",handleRegisterInfo)}
      <TextField
        sx={{ marginBottom: "-30px" }}
        name="password"
        label="Password"
        variant="outlined"
        required
        onChange={handleRegisterInfo}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword}>
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

// content for second step of setting up
export const StepTwo = ({handleRegisterInfo}) => {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const handleAutocomplete = (n, v) => {handleRegisterInfo({target:{name: n, value: v}})}
  // setSelectedMajor("") to add new Select field
  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    setSelectedMajor("");
  };

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);

  };

  //get available majors for the selected faculty
  const getMajorOptions = () => {
    if (selectedFaculty) {
      return majorDict[selectedFaculty];
    }
    return [];
  };

  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginTop: "-10px" }}>
        {DefaultHeader("Academic Information")}
      </Box>
      <FormControl>
        <InputLabel>Faculty</InputLabel>
        <Select
          required
          name="faculty"
          label="Faculty"
          value={selectedFaculty}
          onChange={(e) => {handleRegisterInfo(e); handleFacultyChange(e)}}
        >
          {facultyList.map((faculty) => (
            <MenuItem key={faculty} value={faculty}>
              {faculty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedFaculty && (
        <FormControl sx={{ marginTop: "20px" }}>
          <InputLabel>Major</InputLabel>
          <Select
            required
            name="primaryMajor"
            label="Major"
            value={selectedMajor}
            onChange={(e) => {handleRegisterInfo(e); handleMajorChange(e);}}
          >
            {getMajorOptions().map((major, index) => (
              <MenuItem key={index} value={major}>
                {major}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {DefaultAutocomplete(majorList, "Second Major (if any)", "secondaryMajor", handleAutocomplete)}
      {DefaultAutocomplete(majorList, "Minor (if any)", "minors", handleAutocomplete)}
      {DefaultAutocomplete(progsList, "Special Programme (if any)","programme",handleAutocomplete)}
    </Box>
  );
};

// content for third step of setting up
export const StepThree = () => {
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
      <Box sx={{ marginTop: "-10px" }}>{DefaultHeader("User Preferences")}</Box>
      <FormControl>
        <InputLabel id="my-interests">My Interests</InputLabel>
        <Select
          multiple
          name="interests"
          value={myInterests}
          onChange={handleInterests}
          label="My Interests"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected &&
                selected.length > 0 &&
                selected.map((interest, index) => (
                  <Chip
                    variant="filled"
                    color="primary"
                    sx={{ margin: "5px" }}
                    key={index}
                    label={interest}
                  />
                ))}
            </Box>
          )}
        >
          {Object.entries(interestsDict).map(([category, interests]) => {
            console.log(interests);
            return [
              <MenuItem disabled key={category}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginTop: category === "module related" ? "5px" : "20px",
                    color: "black",
                  }}
                >
                  {category}
                </Typography>
              </MenuItem>,
              ...interests.map((interest) => (
                <MenuItem
                  sx={{ marginLeft: "2px" }}
                  key={interest}
                  value={interest}
                >
                  {interest}
                </MenuItem>
              )),
            ];
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

// main sign up component
const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  //declare for form submission
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    studentId: "",
    username: "",
    password: "",
    faculty: "",
    primaryMajor: "",
    secondaryMajor: "",
    minors: [],
    programme: "",
    interest: [],
  })
  const handleRegisterInfo = evt => {
    const name = evt.target.name;
    const value =
    evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value
    });
  }
  useEffect(()=>{console.log(registerInfo)},[registerInfo]);
  const submitForm = () => {
    console.log(registerInfo);
  }
  const steps = ["Setting Up...", "Almost There...", "One Last Thing..."];

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
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
        margin: "-8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/signup_background.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
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
          {activeStep === 0 && <StepOne handleRegisterInfo={handleRegisterInfo}/>}
          {activeStep === 1 && <StepTwo handleRegisterInfo={handleRegisterInfo}/>}
          {activeStep === 2 && <StepThree handleRegisterInfo={handleRegisterInfo}/>}
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
            <Button
              sx={{ marginRight: "110ch" }}
              onClick={handlePrevStep}
              size="large"
            >
              Back
            </Button>
            {activeStep === 2 ? (
              //<Button size="large" component={Link} to="/sign-in">}
              <Button onClick={submitForm} size="large" component={Link} to="/sign-in">
                Submit
              </Button>
            ) : (
              <Button onClick={handleNextStep} size="large">
                Next
              </Button>
            )}
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
export default SignUpPage;

//TODO: handleSubmit for submit button onClick
//TODO: save content for previous page on clicking next
