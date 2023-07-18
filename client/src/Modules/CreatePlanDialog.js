import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlideUpTransition } from "../StyledComponents";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import {
  FormAutocomplete,
  FormFacultyMajorField,
  FormMinorField,
} from "../FormStyledComponents";
import { majorList, progsList } from "../Constants";
import React, { useState, useEffect } from "react";
import { emptyAcademicInfo } from "./ModuleConstants";

// dialog for creating a new plan
const CreatePlanDialog = ({
  openDialog,
  handleCloseDialog,
  currentAcademicInfo,
  onSubmit,
}) => {
  const [academicPlanInfo, setAcademicPlanInfo] = useState(currentAcademicInfo);

  const handleAcademicPlanInfo = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAcademicPlanInfo({ ...academicPlanInfo, [name]: value });
  };

  const [academicPlan, setAcademicPlan] = useState("");
  const handleAcademicPlanChange = (event) => {
    setAcademicPlan(event.target.value);
  };

  const handleMinorInfo = (value) => {
    setAcademicPlanInfo({
      ...academicPlanInfo,
      ["minor"]: value,
    });
  };

  const submitAcademicPlanInfo = () => {
    handleCloseDialog();
    onSubmit(academicPlanInfo);
    console.log(academicPlanInfo);
    setAcademicPlanInfo(emptyAcademicInfo);
  };

  // check form completion status
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    faculty: academicPlanInfo.faculty === "",
    primaryDegree: academicPlanInfo.primaryDegree === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [academicPlanInfo]);

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={SlideUpTransition}
      fullWidth
      maxWidth="md"
      borderRadius="10px"
    >
      <DialogContent sx={{ margin: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
            Create New Plan
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseRoundedIcon sx={{ fontSize: "30px" }} color="error" />
          </IconButton>
        </Box>
        <Box
          sx={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <FormFacultyMajorField
              filledMajor=""
              filledFaculty=""
              setfn={handleAcademicPlanInfo}
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
              <InputLabel id="academic-plan">Academic Plan</InputLabel>
              <Select label="Academic Plan" onChange={handleAcademicPlanChange}>
                <MenuItem value={"Single Degree"}>Single Degree</MenuItem>
                <MenuItem value={"Double Degree"}>Double Degree</MenuItem>
                <MenuItem value={"Double Major"}>Double Major</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {academicPlan === "Double Degree" && (
            <Box sx={{ marginBottom: "20px" }}>
              <FormAutocomplete
                optionsList={majorList}
                label="Second Degree"
                name="secondDegree"
                setfn={handleAcademicPlanInfo}
              />
            </Box>
          )}
          {academicPlan === "Double Major" && (
            <Box sx={{ marginBottom: "20px" }}>
              <FormAutocomplete
                optionsList={majorList}
                label="Second Major"
                name="secondMajor"
                setfn={handleAcademicPlanInfo}
              />
            </Box>
          )}
          <Box sx={{ marginBottom: "20px" }}>
            <FormMinorField setfn={handleMinorInfo} />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormAutocomplete
              optionsList={progsList}
              label="Special Programme (if any)"
              name="programme"
              setfn={handleAcademicPlanInfo}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormComplete}
            onClick={submitAcademicPlanInfo}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlanDialog;
