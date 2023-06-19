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
} from "@mui/material";
import { facultyList, majorDict, interestsDict } from "./Constants";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

// styling for text fields
export function FormTextField({ name, label, defaultText, setfn, disabled }) {
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
      disabled={disabled}
      value={requiredField}
      onChange={(e) => {
        handleRequiredFieldChange(e);
        setfn(e);
      }}
      required
      error={error}
      helperText={error ? "Field cannot be empty" : ""}
    ></TextField>
  );
}

// styling for autocomplete components
export function FormAutocomplete({
  optionsList,
  name,
  label,
  setfn,
  disabled,
}) {
  return (
    <Autocomplete
      sx={{ marginTop: "20px" }}
      disablePortal
      name={name}
      disabled={disabled}
      options={optionsList}
      onChange={(e, v) => {
        setfn({ target: { name: name, value: v } });
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
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
    setError(value === "");
  };

  return (
    <TextField
      sx={{ marginBottom: "-30px" }}
      name="password"
      label="Password"
      variant="outlined"
      disabled={disabled}
      value={requiredField}
      onChange={(e) => {
        handleRequiredFieldChange(e);
        setfn(e);
      }}
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
          label="faculty"
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
