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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import {useNavigate } from "react-router-dom";
import axios from "axios";

// styling for headers
export function DefaultHeader(props) {
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
}

// NEW styling for text fields NAM HALP
export function DefaultTextField({name, label, defaultText, setfn}) {
  const [requiredField, setRequiredField] = useState(defaultText);
  const [error, setError] = useState(false);
  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);
    setError(value === "");
  };

  return (
    <TextField
      sx={{ marginBottom: "20px" }}
      name={name}
      label={label}
      variant="outlined"
      value={requiredField}
      onChange={(e)=>{handleRequiredFieldChange(e);setfn(e)}}
      required
      error={error}
      helperText={error ? "Field cannot be empty" : ""}
    ></TextField>
  );
}


// NEW STYLING FOR AUTOCOMPLETE COMPONENTS NAM HALP
export function DefaultAutocomplete({optionsList, name, label, setfn}) {
  return (
    <Autocomplete
      sx={{ marginTop: "20px" }}
      disablePortal
      name={name}
      options={optionsList}
      onChange={(e, v) => {
        setfn({target:{name:name,value:v}});
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}


// NEW STYLING FOR PASSWORD FIELD NAM HALP
export function PasswordField({defaultText, setfn}) {
  const [showPassword, setShowPassword] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [requiredField, setRequiredField] = useState(defaultText);
  const [error, setError] = useState(false);
  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);
    setError(value === "");
  };

  return (
    <TextField
      sx={{ marginBottom: "-30px" }}
      name="password"
      label="Password"
      variant="outlined"
      value={requiredField}
      onChange={(e) => {handleRequiredFieldChange(e);setfn(e)}}
      required
      type={showPassword ? "text" : "password"}
      error={error}
      helperText={error ? "Field cannot be empty" : ""}
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
  );
}

// NEW styling for faculty & major field NAM HALP
export function FacultyMajorField({ filledFaculty, filledMajor, setfn}) {
  const [selectedFaculty, setSelectedFaculty] = useState(filledFaculty);
  const [selectedMajor, setSelectedMajor] = useState(filledMajor);

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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormControl>
        <InputLabel>Faculty</InputLabel>
        <Select
          required
          name="faculty"
          label="faculty"
          value={selectedFaculty}
          onChange={(e)=>{handleFacultyChange(e);setfn(e)}}
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
            onChange={(e)=>{handleMajorChange(e);setfn(e)}}
          >
            {getMajorOptions().map((major, index) => (
              <MenuItem key={index} value={major}>
                {major}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}

// NEW STYLING FOR INTERESTS FIELD NAM HALP
export function InterestsField({filledInterests, setfn}) {
  const [myInterests, setMyInterests] = useState(filledInterests);
  const handleInterests = (event) => {
    setMyInterests(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="my-interests">My Interests</InputLabel>
      <Select
        multiple
        name="interests"
        value={myInterests}
        onChange={(e)=>{handleInterests(e);setfn(e)}}
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
            <MenuItem key={category}>
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
  );
}

// NEW CONTENT FOR FIRST STEP NAM HALP
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
        <DefaultHeader text="General Information" />
      </Box>
      <DefaultTextField name = "Name" label="name" defaultText="" setfn={handleRegisterInfo}/>
      <DefaultTextField name = "StudentID" label="studentId" defaultText="" setfn={handleRegisterInfo}/>
      <DefaultHeader text="Account Information" />
      <DefaultTextField name = "Username" label="username" defaultText="" setfn={handleRegisterInfo}/>
      <PasswordField defaultText="" setfn={handleRegisterInfo}/>
    </Box>
  );
};

// NEW CONTENT FOR SECOND STEP NAM HALP
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
        <DefaultHeader text="Academic Information" />
      </Box>
      <FacultyMajorField filledMajor="" filledFaculty="" setfn={handleRegisterInfo}/>
      <DefaultAutocomplete
        optionsList={majorList}
        label="Second Major (if any)"
        name = "secondaryMajor"
        setfn={handleRegisterInfo}
      />
      <DefaultAutocomplete
        optionsList={majorList}
        label="Minor (if any)"
        name = "minors"
        setfn={handleRegisterInfo}
      />
      <DefaultAutocomplete
        optionsList={progsList}
        label="Special Programme (if any)"
        name = "programme"
        setfn={handleRegisterInfo}
      />
    </Box>
  );
};


// NEW CONTENT FOR THIRD STEP NAM HALP
export const StepThree = ({handleRegisterInfo}) => {
  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginTop: "-10px" }}>
        <DefaultHeader text="User Preferences" />
      </Box>
      <InterestsField filledInterests={[]} setfn={handleRegisterInfo}/>
    </Box>
  );
};


// NEW MAIN SIGN UP COMPONENT NAM HALP
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

  const registerAPI = "https://nusmods.onrender.com/register";
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
            {activeStep === 2 ? (
              <Button
                sx={{ marginLeft: "112ch" }}
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