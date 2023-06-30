import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  IconButton,
  NativeSelect,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { facultyList, majorDict, interestsDict } from "./Constants";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

// styling for signup welcome message
export const SignUpWelcomeMessage = () => {
  <Typography sx={{ fontWeight: "700", fontSize: "50px" }}>
    Welcome! Let's get you settled.
  </Typography>;
};

// styling for stepper component
export const SignUpStepper = ({ activeStep }) => {
  const steps = ["Setting Up...", "Almost There...", "One Last Thing..."];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

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

// styling for text fields
export function FormTextField({ name, label, defaultText, setfn, disabled }) {
  const [requiredField, setRequiredField] = useState(defaultText);
  const [error, setError] = useState(false);

  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    const isError = value === "";
    setError(isError);
    setRequiredField(value);
    if (!isError) {
      setfn(event);
    }
  };

  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      variant="outlined"
      disabled={disabled}
      value={requiredField}
      onChange={(e) => {
        handleRequiredFieldChange(e);
      }}
      required
      error={error}
      helperText={error ? "Field cannot be empty" : ""}
    ></TextField>
  );
}

// styling for username field
export function FormUsernameField({ defaultText, setfn, disabled }) {
  const [requiredField, setRequiredField] = useState(defaultText);
  const [error, setError] = useState(false);
  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);

    const usernameRegex = /^(?=.*[A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    const isError = !usernameRegex.test(value);
    setError(isError);
    if (!isError) {
      setfn(event);
    }
  };

  return (
    <TextField
      fullWidth
      name="username"
      label="Username"
      variant="outlined"
      disabled={disabled}
      value={requiredField}
      onChange={(e) => {
        handleRequiredFieldChange(e);
      }}
      required
      error={error}
      helperText={error ? "Username must contain at least 8 characters" : ""}
    ></TextField>
  );
}

// styling for password field
export function FormPasswordField({ defaultText, setfn, disabled }) {
  const [showPassword, setShowPassword] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [requiredField, setRequiredField] = useState(defaultText);
  const [error, setError] = useState(false);
  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);

    const passwordRegex =
      /^(?=.*[A-Za-z\d])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isError = !passwordRegex.test(value);
    setError(isError);
    if (!isError) {
      setfn(event);
    }
  };

  return (
    <TextField
      fullWidth
      name="password"
      label="Password"
      variant="outlined"
      disabled={disabled}
      value={requiredField}
      onChange={(e) => {
        handleRequiredFieldChange(e);
      }}
      required
      type={showPassword ? "text" : "password"}
      error={error}
      helperText={
        error
          ? "Password must contain at least 8 characters and at least one special character"
          : ""
      }
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

// styling for email field
export const FormEmailField = ({ defaultText, setfn, disabled }) => {
  const [requiredField, setRequiredField] = useState(defaultText);
  const [error, setError] = useState(false);

  const handleRequiredFieldChange = (event) => {
    const value = event.target.value;
    setRequiredField(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isError = !emailRegex.test(value);
    setError(isError);
    if (!isError) {
      setfn(event);
    }
  };

  return (
    <TextField
      name="email"
      label="Recovery Email"
      type="email"
      disabled={disabled}
      value={requiredField}
      onChange={(e) => {
        handleRequiredFieldChange(e);
      }}
      error={error}
      required
      helperText={error ? "Invalid email format" : ""}
    />
  );
};

// styling for autocomplete components
export function FormAutocomplete({
  optionsList,
  name,
  label,
  setfn,
  disabled,
  defaultText,
}) {
  return (
    <Autocomplete
      fullWidth
      disablePortal
      name={name}
      defaultValue={defaultText}
      disabled={disabled}
      options={optionsList}
      onChange={(e, v) => {
        setfn({ target: { name: name, value: v } });
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

// styling for faculty and major field
export function FormFacultyMajorField({
  filledFaculty,
  filledMajor,
  setfn,
  disabled,
}) {
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
          label="Faculty"
          disabled={disabled}
          value={selectedFaculty}
          onChange={(e) => {
            handleFacultyChange(e);
            setfn(e);
          }}
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
            disabled={disabled}
            value={selectedMajor}
            onChange={(e) => {
              handleMajorChange(e);
              setfn(e);
            }}
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
export function FormInterestsField({ filledInterests, setfn, disabled }) {
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
        disabled={disabled}
        onChange={(e) => {
          handleInterests(e);
          setfn(e);
        }}
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

// text editor for post
export const MyTextEditor = (props) => {
  const handleFormContent = props.handleFormContent;
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "list",
    "bullet",
  ];

  const handleContentChange = (value) => {
    setContent(value);
    handleFormContent(value);
  };

  return (
    <Box sx={{ marginTop: "30px" }} className="my-text-field">
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={quillModules}
        formats={quillFormats}
      />
    </Box>
  );
};

// native select styling
export const DefaultNativeSelect = (props) => {
  const optionsDict = props.optionsDict;
  const label = props.label;
  return (
    <FormControl>
      <InputLabel variant="standard">{label}</InputLabel>
      <NativeSelect>
        {Object.entries(optionsDict).map(([key, value]) => (
          <option value={value}>{key}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
