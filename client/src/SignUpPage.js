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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
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

// styling for text fields
export function DefaultTextField(props) {
  const { label, filledText } = props;
  const [requiredField, setRequiredField] = useState(filledText);
  const [error, setError] = useState(false);
  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);
    setError(value === "");
  };

  return (
    <TextField
      sx={{ marginBottom: "20px" }}
      name={label}
      label={label}
      variant="outlined"
      value={requiredField}
      onChange={handleRequiredFieldChange}
      required
      error={error}
      helperText={error ? "Field cannot be empty" : ""}
    ></TextField>
  );
}

// styling for autocomplete components
export function DefaultAutocomplete(props) {
  const { optionsList, label, filledOption } = props;
  return (
    <Autocomplete
      sx={{ marginTop: "20px" }}
      disablePortal
      name={label}
      options={optionsList}
      value={filledOption}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

// styling for password field
export function PasswordField(props) {
  const { filledText } = props;
  const [showPassword, setShowPassword] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [requiredField, setRequiredField] = useState(filledText);
  const [error, setError] = useState(false);
  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);
    setError(value === "");
  };

  return (
    <TextField
      sx={{ marginBottom: "-30px" }}
      name="Password"
      label="Password"
      variant="outlined"
      value={requiredField}
      onChange={handleRequiredFieldChange}
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

// styling for faculty & major field
export function FacultyMajorField(props) {
  const { filledFaculty, filledMajor } = props;
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
          name="Faculty"
          label="Faculty"
          value={selectedFaculty}
          onChange={handleFacultyChange}
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
            name="Major"
            label="Major"
            value={selectedMajor}
            onChange={handleMajorChange}
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

// styling for interests field
export function InterestsField(props) {
  const { filledInterests } = props;
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

// content for first step of setting up
export const StepOne = () => {
  const [invalidForm, setInvalidForm] = useState(false);
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
      <DefaultTextField label="Name" filledText="" />
      <DefaultTextField label="StudentID" filledText="" />
      <DefaultHeader text="Account Information" />
      <DefaultTextField label="Username" filledText="" />
      <PasswordField filledText="" />
    </Box>
  );
};

// content for second step of setting up
export const StepTwo = () => {
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
      <FacultyMajorField filledMajor="" filledFaculty="" />
      <DefaultAutocomplete
        optionsList={majorList}
        label="Second Major (if any)"
        filledOption=""
      />
      <DefaultAutocomplete
        optionsList={majorList}
        label="Minor (if any)"
        filledOption=""
      />
      <DefaultAutocomplete
        optionsList={progsList}
        label="Special Programme (if any)"
        filledOption=""
      />
    </Box>
  );
};

// content for third step of setting up
export const StepThree = () => {
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
      <InterestsField filledInterests={[]} />
    </Box>
  );
};

// main sign up component
const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Setting Up...", "Almost There...", "One Last Thing..."];
  const [openNextStepDialog, setOpenNextStepDialog] = useState(false);

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
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
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
                size="large"
                component={Link}
                to="/sign-in"
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
